import Hunk from './hunk';
  getBuffer() {
    return this.getPatch().getBuffer();
        patch: this.getOldSymlink() ? this.getPatch().clone({status: 'deleted'}) : this.getPatch(),
        patch: this.getNewSymlink() ? this.getPatch().clone({status: 'added'}) : this.getPatch(),