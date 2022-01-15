import {AppFile, DesktopDir, SymlinkFile, SystemDir} from 'beans';
import * as wallpaperMap from 'images/wallpapers';
import {FinderWindow, PaypalWindow,} from 'windows';

class RootDir extends SystemDir {
  constructor(children) {
    super(children, 'root', null);
  }

  getUserDir(user = 'jason') {
    return this.getChild('users', user);
  }

  getDesktopDir() {
    const userDir = this.getUserDir();
    return userDir && userDir.getChild('desktop');
  }

  getAppsDir() {
    const userDir = this.getUserDir();
    return userDir && userDir.getChild('apps');
  }

  getApps() {
    const appsDir = this.getAppsDir();
    return appsDir && appsDir.children;
  }

  remove() {
    this.children = [];
  }

  get pathKeys() {
    return [];
  }

  static get instance() {
    if (this.rootDir) {
      return this.rootDir;
    }

    const finder = new AppFile(FinderWindow, {defaultUrl: '/finder/users/jason/desktop'});
    const paypal = new AppFile(PaypalWindow);

    const wallpaperKeys = Object.keys(wallpaperMap);

    this.rootDir = new RootDir({
      users: new SystemDir({
        jason: new SystemDir({
          apps: new SystemDir({
            finder,
            paypal,
          }),
          desktop: new DesktopDir({
            paypal: new SymlinkFile(paypal),
          }, wallpaperKeys[Math.random() * wallpaperKeys.length | 0]),
        }),
      }),
    });

    return this.rootDir;
  }
}

export default RootDir;
