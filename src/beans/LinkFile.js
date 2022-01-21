import {File} from '.';

export class LinkFile extends File {
  constructor(href, name, parent) {
    super(name, parent);
    this.href = href;
  }

  get url() {
    return this.href;
  }

  get iconProps() {
    return {iconKey: this.key};
  }
}
