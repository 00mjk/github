import React from 'react';
import {TextBuffer} from 'atom';

import Octicon from '../atom/octicon';
import AtomTextEditor from '../atom/atom-text-editor';

export default function CloneDialogGitHub() {
  const searchBuffer = new TextBuffer({text: 'atom/github'});
  const sourceRemoteBuffer = new TextBuffer({text: 'origin'});
  const destPathBuffer = new TextBuffer({text: '/home/smashwilson/src/github'});

  return (
    <form className="github-Dialog github-Clone modal padded">
      <h1 className="github-Clone-header">
        <Octicon icon="repo-clone" />
        Clone repository
      </h1>
      <AtomTextEditor mini={true} buffer={searchBuffer} />
      <hr />
      <div className="github-Clone-dotcom">
        <div className="github-Clone-fork block">
          <input type="checkbox" id="github-Clone-forkBox" />
          <label htmlFor="github-Clone-forkBox">
            <Octicon icon="repo-forked" />
            Fork this repository
          </label>
        </div>
        <div className="github-Clone-sourceRemote block">
          <label htmlFor="github-Clone-sourceRemoteName">Source remote name:</label>
          <AtomTextEditor
            className="github-Clone-sourceRemoteName"
            id="github-Clone-sourceRemoteName"
            mini={true}
            autoWidth={false}
            buffer={sourceRemoteBuffer}
          />
        </div>
        <div className="github-Clone-destination block">
          <label htmlFor="github-Clone-destinationPath">Destination path:</label>
          <AtomTextEditor
            className="github-Clone-destinationPath"
            id="github-Clone-destinationPath"
            mini={true}
            buffer={destPathBuffer}
          />
        </div>
      </div>
      <hr />
      <p className="github-Clone-actions">
        <button className="btn inline-block-tight">Cancel</button>
        <button className="btn btn-primary inline-block-tight">Clone</button>
      </p>
    </form>
  );
}
