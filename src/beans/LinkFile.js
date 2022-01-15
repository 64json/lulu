import {File} from '.';

export class LinkFile extends File {
  constructor(href, key, parent) {
    super(key, parent);
    this.href = href;
  }

  get url() {
    return this.href;
  }

  get iconProps() {
    return {iconKey: this.key};
  }
}
