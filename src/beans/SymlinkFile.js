import {File} from '.';

export class SymlinkFile extends File {
  constructor(target, name, parent) {
    super(name, parent);
    this.target = target;
  }

  get url() {
    return this.target.url;
  }

  get iconProps() {
    return this.target.iconProps;
  }

  get searchables() {
    return [];
  }
}
