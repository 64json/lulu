import {Child, PreviewFile} from '.';

export class Dir extends Child {
  constructor(children, name, parent) {
    super(name, parent);
    if (Array.isArray(children)) {
      this.children = children.map(({key, ...content}) => {
        return new PreviewFile(content, key, this);
      });
    } else {
      this.children = Object.keys(children).map(name => {
        const child = children[name];
        child.name = name;
        child.parent = this;
        return child;
      });
    }
  }

  getChild(...pathKeys) {
    let dir = this;
    for (const dirKey of pathKeys) {
      if (!(dir instanceof Dir)) return undefined;
      dir = dir.children.find(c => c.key === dirKey);
    }
    return dir;
  };

  get iconProps() {
    return {iconKey: 'finder'};
  }

  search(keyword) {
    const results = super.search(keyword);
    for (const child of this.children) {
      results.push(...child.search(keyword));
    }
    return results;
  }
}
