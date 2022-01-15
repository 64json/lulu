import {SystemDir} from '.';

export class DesktopDir extends SystemDir {
  constructor(children, wallpaperKey, key, parent) {
    super(children, key, parent);
    this.wallpaperKey = wallpaperKey;
  }
}
