# Editable Diff

## :memo: Summary

Inline editing within a diff view (i.e. `MultiFilePatchView`).

## :checkered_flag: Motivation

This can save user the trouble of needing to toggle to an editor and back again when they notice typos, `console.log()` statements, or `.only()` in tests when reviewing changes right before committing.

This also serves as a building block of the bigger [PR review workflow](https://github.com/atom/github/blob/master/docs/feature-requests/003-pull-request-review.md) we want to eventually implement.

## 🤯 Explanation

#### 1. Entry point of editable state

- By default, a diff view is editable (with some [exceptions](https://github.com/atom/github/blob/vy/proposal-editable-diff/docs/feature-requests/005-editable-diff.md#what-is-editable)). By clicking into any diff, a blinking caret will appear to signify users they can start editing.
- If a diff is readonly, there will be a visual indicator of such:
<img width="450" alt="editable vs readonly diff" src="https://user-images.githubusercontent.com/378023/47252025-44c93080-d478-11e8-8bb4-2ae532e38ad5.gif">


#### 2. Within an editable state
- The editable state behaves almost like a normal editor, except that the green background of added lines and red background of deleted lines will be kept.
- Behaviours such as stage/unstage hunk and selected line will remain the same, since the line being actively edited will still be considered as "selected", hence show up as highlighted.
- A deleted line will still be visible within the editable state, but it _is not editable_. That will be communicated to user in a very clear visual manner:
  - The cursor for hovering over deleted lines will show up as arrow as opposed to text cursor.
  - Deleted lines can still be selected (via mouse or keyboard) but no caret will be visible; basically same as current behaviour.
- As a user make edits in a diff view, the file name will have some visual cue indicating there's unsaved modification, akin to when a regular atom editor has unsaved changes.
- For multiple file diff views, the unsaved modification indicator will be on a per-file basis. In the following example, `src/fish.txt` has unsaved modification but `something` does not:
<img width="400" alt="unsaved modification indicator" src="https://user-images.githubusercontent.com/6842965/50688975-2363f380-1028-11e9-838d-82a1b6310c84.png">
- When attempting to close a diff with unsaved modification, user will be prompted with "are you sure", etc -- same behaviour as an unsaved Atom editor


#### 3. Save (i.e. write modification to disk)

- No edits within the diff view will be written to disk until user explicitly saves (`cmd-s`) the modified diff.
  - For multple file diff view, one "save" action will save _all modifications across the different files within that diff view_.

- Upon saving, the diff view will re-render with the new file patch, and scroll position will remain unchanged.
- Some visual jumps might result as the new file patch is shown (see [examples](https://github.com/atom/github/blob/vy/proposal-editable-diff/docs/feature-requests/005-editable-diff.md#some-specific-examples)), but that won't be too jarring since the save action is so explicit.


#### What is editable?

Currently we use diff view in several places; which ones of them are editable?
  - Unstaged Changes: *editable*
  - Staged Changes: *editable* but with [unresolved questions](https://github.com/atom/github/blob/vy/proposal-editable-diff/docs/feature-requests/005-editable-diff.md#question-unresolved-questions)
  - All staged changes (aka Commit Preview): *editable* but with [unresolved questions](https://github.com/atom/github/blob/vy/proposal-editable-diff/docs/feature-requests/005-editable-diff.md#question-unresolved-questions)
  - Commit Detail Item: *NOT editable*
  - Changed File Tab in PR: *editable **only** if it's a checked out PR*, also with [unresolved questions](https://github.com/atom/github/blob/vy/proposal-editable-diff/docs/feature-requests/005-editable-diff.md#question-unresolved-questions)


## :anchor: Drawbacks

The diff tool in Atom is a fundamental component of the GitHub package, so changing the behaviour and UI of such carries a relatively higher risk.

In my research, I have found no prior art of editable diffs in *unified diff view*; in contrast, there are abundant examples of editable diffs in *split diff view* (see section below). And I think there's a reason this hasn't been done before -- making unified diff view editable could make the UI jarring and unapproachable, since there are considerable visual differences between old (before editing) file patch and new (after editing) file patch, and the editable state sits somewhere between the two. **The challenge here is to elegantly transition from old file patch -> editable state -> new file patch.**

##### Some specific examples:

- editing a previously unchanged line will result in the new file patch being longer, since we now have an newly "deleted" line.

| old file patch | new file patch |
| --- | --- |
|<img width="400" alt="screen shot 2019-01-03 at 19 04 58" src="https://user-images.githubusercontent.com/6842965/50657128-cddf0680-0f95-11e9-86a2-7e765f332fe0.png">|<img width="400" alt="screen shot 2019-01-03 at 19 05 41" src="https://user-images.githubusercontent.com/6842965/50657127-cddf0680-0f95-11e9-8915-13692915ca89.png">|

- editing end of a hunk might result in two hunks being joint into one (and vice versa where a hunk might get split into two).

| old file patch | new file patch |
| --- | --- |
|<img width="700" alt="screen shot 2019-01-03 at 19 19 32" src="https://user-images.githubusercontent.com/6842965/50657126-cd467000-0f95-11e9-9378-de70aa6753f5.png">|<img width="700" alt="screen shot 2019-01-03 at 19 20 23" src="https://user-images.githubusercontent.com/6842965/50657125-cd467000-0f95-11e9-8cd4-146fea7cd2ed.png">|


## :thinking: Rationale and alternatives

### Default to read-only state

A first iteration was considered where by default, a diff view is read-only, and users would have to explicitly toggle in and out of an editable state.

<details>

<summary>More details of the workflow considered in iteration 1</summary>

The flow of using editable diff is as followed:

#### 1. Entry point of editable state
On any given diff view, a user can get a diff hunk into an __editable state__ by:
  - double-clicking on any line within a hunk
  - clicking on a new "edit hunk" button on hunk header
  - if the hunk is selected, pressing specific keys (exact key binding TBD)
  - "edit" from context menu
  - if already in editable state in a previous hunk, navigating with keyboard can exit previous hunk's editable state and enter editable state of the next hunk.


#### 2. Within an editable state
  - Only one hunk is editable at a time
  - Visually, it will be very clear when a hunk is in editable state. In addition to a blinking caret, maybe we can put the whole block in a box or fade out the rest of the diff? :thinking:
  - The editable state behaves almost like it's a normal editor, except that the green background of added lines and red background of deleted lines will be kept.
  - A deleted line will still be visible within the editable state, but it _is not editable_. That will be communicated to user in a very clear visual manner:
    - The cursor for hovering over deleted lines will show up as arrow as opposed to text cursor.
    - When navigating with keyboard, deleted lines will be skipped as if they don't exist.
    - When dragging cursor to highlight a block of text, deleted lines will not get highlighted.

#### 3. Exiting editable state:
Upon exiting editable state, the changes will be immediately saved to the corresponding file on disk. And the diff view would re-render with the new file patch, and scroll position will remain unchanged.

A user can exit the editable state by:
  - clicking outside of the editable area
  - pressing `esc` or `cmd-s`
  - performing actions such as stage/unstage, jump to file, etc.

</details>

##### Rationale for not going this route:
- Having to explicitly toggle into an editable state is similar to behaviour seen in dotcom, but this goes against our editor-first approach. It's called an _editor_ for a reason afterall -- things are expected to be editable.
- Since [the majority of the existing diff view usage will be editable](https://github.com/atom/github/blob/vy/proposal-editable-diff/docs/feature-requests/005-editable-diff.md#what-is-editable), it makes sense to default to the editable state, and only communicate to users when it's an exception (i.e. read-only).


### Editable Split Diff

All of the prior arts I could find on editable diffs implement this feature with the use of "split screen diff".

![kapture 2019-01-03 at 20 35 29](https://user-images.githubusercontent.com/6842965/50657589-37134980-0f97-11e9-96cc-41cb1eda6546.gif)

This is a gif of how it works in VS code, but other diff and/or merge tools have similar implementations:
 - split screen with one side editable (the file on disk) and the other side readonly
 - both sides show unmodified lines
 - readonly side shows deleted lines
 - editable side shows added/modified lines
 - use grey/void blocks to reconcile the line differences between the two sides so they line up properly

##### Pros:
 - it's easy to understand that one side is editable, and the other is not.
 - adding and deleting lines are not jarring
 - able to avoid the hunk separating/joining issue (mentioned above in Drawbacks section)

##### Cons:
 - soft-wrap mostly doesn't work well with this view
 - split view takes up a lot of screen real estate

##### Rationale for not going this route:
Despite the editable split diff view being the more conventional and relatively easier approach, it diverges way too much from our existing unified diff view,  and hence would not be a good direction for us.


## :question: Unresolved questions

- Currently, if a user make changed to a staged file, the new changes show up in Unstaged Changes, but are not applied to the already staged file. If we allow staged file to be edited, should the new changes apply to both file on disk as well as the staged entry?

- The PR comments we are implementing in [#1856](https://github.com/atom/github/pull/1856) already add consierable complexity to the diff view. Should the comments be visible when the diff is in editable state?

- When modifying a diff, should actions such as stage/unstage, jump to file, etc. trigger a "save"?

## :warning: Out of Scope

#### TBD

- What related issues do you consider out of scope for this Feature Request that could be addressed in the future independently of the solution that comes out of this Feature Request?

## :construction: Implementation phases

#### TBD

- Can this functionality be introduced in multiple, distinct, self-contained pull requests?
- A specification for when the feature is considered "done."

## :white_check_mark: Feature description for Atom release blog post

#### TBD

- When this feature is shipped, what would we like to say or show in our Atom release blog post (example: http://blog.atom.io/2018/07/31/atom-1-29.html)
- Feel free to drop ideas and gifs here during development
- Once development is complete, write a blurb for the release coordinator to copy/paste into the Atom release blog
