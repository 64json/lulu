import {File} from '.';

export class AppFile extends File {
  static count = 0;

  constructor(WindowComponent, {pinned = true, defaultUrl} = {}, name, parent) {
    super(name, parent);
    AppFile.count++;
    Object.assign(this, {
      WindowComponent,
      pinned,
      defaultUrl,
      defaultLeft: AppFile.count * 20,
      defaultTop: AppFile.count * 20,
      lastUrl: null,
      opened: false,
      focused: false,
      zIndex: 1,
    });
  }

  get key() {
    if (this.name === '❤️') {
      return 'proposal';
    }
    return super.key;
  }

  get url() {
    return this.opened ? this.lastUrl : (this.defaultUrl || `/${this.key}`);
  }

  get iconProps() {
    return {iconKey: this.key};
  }
}
