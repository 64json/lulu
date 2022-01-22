import {SystemDir} from '.';

export class DesktopDir extends SystemDir {
  constructor(wallpapers, children, name, parent) {
    super(children, name, parent);
    this.wallpapers = wallpapers;
  }
}
