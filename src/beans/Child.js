import {isExternal, match} from '../common/utils';
import {Dir, PreviewFile, RootDir} from '.';

export class Child {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
  }

  get key() {
    return this.name.toLowerCase().replace(/\W/g, '-');
  }

  get pathKeys() {
    return [...this.parent.pathKeys, this.key];
  }

  get path() {
    return `/${this.pathKeys.join('/')}`;
  }

  get finderUrl() {
    const {pathKeys} = this;
    if (['users', 'lulu-and-jinseo', 'desktop'].every((v, i) => v === pathKeys[i]) && pathKeys.length > 3) {
      const child = RootDir.instance.getChild(...pathKeys);
      if (child instanceof Dir || child instanceof PreviewFile) {
        return `/${pathKeys.slice(3).join('/')}`;
      }
    }
    return `/finder/${pathKeys.join('/')}`;
  }

  get url() {
    return this.finderUrl;
  }

  get iconProps() {
    return null;
  }

  open(navigate) {
    if (isExternal(this.url)) {
      window.open(this.url);
    } else {
      navigate(this.url);
    }
  }

  remove() {
    const index = this.parent.children.indexOf(this);
    this.parent.children.splice(index, 1);
  }

  get searchables() {
    return [this.name];
  }

  search(keyword) {
    const {searchables} = this;
    const matched = searchables.some(text => match(keyword, text));
    return matched ? [this] : [];
  }
}
