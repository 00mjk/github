import React from 'react';
import {Emitter} from 'event-kit';

export default class MockItem extends React.Component {

  static uriPattern = 'atom-github://mock';

  static buildURI() {
    return 'atom-github://mock';
  }

  constructor(props) {
    super(props);
    this.emitter = new Emitter();
    this.title = 'Reviews #1715';
    this.hasTerminatedPendingState = false;
  }

  didClickLink = (evt) => {
    this.props.workspace.open(evt.target.dataset.filePath);
  }

  render() {
    return (
      <div className="github-Reviews">
        <header className="github-Reviews-header">
          <h1 className="github-Reviews-title">Reviews</h1>
          <span className="github-Reviews-progress">
            <span className="github-Reviews-count">Resolved <span className="github-Reviews-countNr">3</span> of <span className="github-Reviews-countNr">5</span></span>
            <progress class='github-Reviews-progessBar' value='3' max='5'></progress>
          </span>
        </header>
        <main className="github-Reviews-container">

          <div className="github-Review">
            <header className="github-Review-header">
              <span className="github-Review-icon icon icon-comment"></span>
              <img className="github-Review-avatar" src="https://avatars.githubusercontent.com/u/e?email=annthurium%40github.com&s=32"/>
              <a className="github-Review-username" href="https://github.com/annthurium">annthurium</a>
              <span className="github-Review-type">left review comments</span>
              <span className="github-Review-timeAgo">1 hour ago</span>
            </header>

            <details className="github-Review-thread" open>
              <summary className="github-Review-threadHeader">
                <span className="github-Review-resolvedIcon icon icon-check"></span>
                <span onClick={this.didClickLink} data-file-path="lib/models/patch/builder.js">
                  <span className="github-Review-path">lib/models/patch/</span>
                  <span className="github-Review-file">builder.js</span>
                </span>
                <span className="github-Review-lineNr">12</span>
              </summary>
              <pre className="github-Review-diff">
                <div className="github-Review-diffLine is-added">{ 'export const DEFAULT_OPTIONS = {' }</div>
                <div className="github-Review-diffLine is-added">{ '  // Number of lines after which we consider the diff "large"' }</div>
                <div className="github-Review-diffLine is-added">{ '  // TODO: Set this based on performance measurements' }</div>
                <div className="github-Review-diffLine is-added">{ '  largeDiffThreshold: 100,' }</div>
              </pre>
              <main className="github-Review-comments">
                <div className="github-Review-comment">
                  <header className="github-Review-commentHeader">
                    <img className="github-Review-avatar" src="https://avatars.githubusercontent.com/u/e?email=annthurium%40github.com&s=32"/>
                    <a className="github-Review-username" href="https://github.com/annthurium">annthurium</a>
                    <span className="github-Review-commentTimeAgo">4 hours ago</span>
                  </header>
                  <div className="github-Review-commentText"><a href="https://github.com/simurai">@simurai</a>: how many lines do you think constitutes a large diff? Not just from a performance perspective, but from a user experience perspective. Like how many lines is disruptive to a user when they're trying to read, because often large diffs are the result of auto generated code.</div>
                </div>
                <div className="github-Review-comment">
                  <header className="github-Review-commentHeader">
                    <img className="github-Review-avatar" src="https://avatars.githubusercontent.com/u/e?email=simurai%40github.com&s=32"/>
                    <a className="github-Review-username" href="https://github.com/simurai">simurai</a>
                    <span className="github-Review-commentTimeAgo">4 hours ago</span>
                  </header>
                  <div className="github-Review-commentText">Hmmm.. will large diffs be collapsed by default or there is a "load" button? Maybe if the diff is so large that it fills the whole scroll height. Then I can uncollapse only if I'm really interested in that file. 100 seems fine. 👍</div>
                </div>
                <div className="github-Review-comment">
                  <header className="github-Review-commentHeader">
                    <img className="github-Review-avatar" src="https://avatars.githubusercontent.com/u/e?email=annthurium%40github.com&s=32"/>
                    <a className="github-Review-username" href="https://github.com/annthurium">annthurium</a>
                    <span className="github-Review-commentTimeAgo">4 hours ago</span>
                  </header>
                  <div className="github-Review-commentText"><a href="https://github.com/kuychaco">@kuychaco</a> <a href="https://github.com/vanessayuenn">@vanessayuenn</a> <a href="https://github.com/smashwilson">@smashwilson</a> care to weigh in?</div>
                </div>

                <div className="github-Review-reply">
                  <img className="github-Review-avatar" src="https://avatars.githubusercontent.com/u/e?email=annthurium%40github.com&s=32"/>
                  <textarea className='github-Review-replyInput input-textarea native-key-bindings' placeholder='Reply...'></textarea>
                  <button className="github-Review-replyButton btn" title="Add your comment">Comment</button>
                </div>
              </main>
              <footer className="github-Review-footer">
                <button className="github-Review-resolveButton btn btn-primary icon icon-check" title="Mark this comment as resolved">Mark as resolved</button>
              </footer>
            </details>

            <details className="github-Review-thread is-resolved">
              <summary className="github-Review-threadHeader">
                <span className="github-Review-resolvedIcon icon icon-check"></span>
                <span onClick={this.didClickLink} data-file-path="lib/models/patch/builder.js">
                  <span className="github-Review-path">lib/models/patch/</span>
                  <span className="github-Review-file">builder.js</span>
                </span>
                <span className="github-Review-lineNr">280</span>
              </summary>
              <pre className="github-Review-diff">
                <div className="github-Review-diffLine is-added">{ '  /*' }</div>
                <div className="github-Review-diffLine is-added">{ '   * Construct a String containing diagnostic information about the internal state of this FilePatch.' }</div>
                <div className="github-Review-diffLine is-added">{ '   */' }</div>
                <div className="github-Review-diffLine is-added">{ '  inspect(opts = {}) {' }</div>
              </pre>
              <main className="github-Review-comments">
                <div className="github-Review-comment">
                  <header className="github-Review-commentHeader">
                    <img className="github-Review-avatar" src="https://avatars.githubusercontent.com/u/e?email=annthurium%40github.com&s=32"/>
                    <a className="github-Review-username" href="https://github.com/annthurium">annthurium</a>
                    <span className="github-Review-commentTimeAgo">4 hours ago</span>
                  </header>
                  <div className="github-Review-commentText">nice! This is going to be so useful when we are trying to debug the marker layer on a text buffer.</div>
                </div>

                <div className="github-Review-reply">
                  <img className="github-Review-avatar" src="https://avatars.githubusercontent.com/u/e?email=annthurium%40github.com&s=32"/>
                  <textarea className='github-Review-replyInput input-textarea native-key-bindings' placeholder='Reply...'></textarea>
                  <button className="github-Review-replyButton btn" title="Add your comment">Comment</button>
                </div>
              </main>
              <footer className="github-Review-footer">
                <span className="github-Review-resolveText"><a href="https://github.com/annthurium">annthurium</a> marked this as resolved</span>
                <button className="github-Review-resolveButton btn" title="Mark this comment as unresolved">Mark as unresolved</button>
              </footer>
            </details>

          </div>

        </main>
      </div>


    );
  }

  destroy = () => {
    /* istanbul ignore else */
    if (!this.isDestroyed) {
      this.emitter.emit('did-destroy');
      this.isDestroyed = true;
    }
  }

  onDidDestroy(callback) {
    return this.emitter.on('did-destroy', callback);
  }

  serialize() {
    return {
      uri: this.getURI(),
      deserializer: 'MockItem',
    };
  }

  getTitle() {
    return this.title;
  }

  onDidChangeTitle(cb) {
    return this.emitter.on('did-change-title', cb);
  }

}
