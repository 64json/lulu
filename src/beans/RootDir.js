import {AppFile, DesktopDir, SymlinkFile, SystemDir} from '.';
import {FinderWindow, GatherlyWindow,} from '../windows';
import {MoolahWindow} from "../windows/MoolahWindow";
import {NcrWindow} from "../windows/NcrWindow";

export class RootDir extends SystemDir {
  constructor(children) {
    super(children, 'root', null);
  }

  getUserDir(user = 'lulu-and-jinseo') {
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

    const finder = new AppFile(FinderWindow, {defaultUrl: '/finder/users/lulu-and-jinseo/desktop'});
    const gatherly = new AppFile(GatherlyWindow);
    const moolah = new AppFile(MoolahWindow);
    const ncr = new AppFile(NcrWindow);

    this.rootDir = new RootDir({
      users: new SystemDir({
        'Lulu and Jinseo': new SystemDir({
          apps: new SystemDir({
            Finder: finder,
            Gatherly: gatherly,
            Moolah: moolah,
            NCR: ncr,
          }),
          desktop: new DesktopDir({
            Gatherly: new SymlinkFile(gatherly),
            Moolah: new SymlinkFile(moolah),
            NCR: new SymlinkFile(ncr),
          }),
        }),
      }),
    });

    return this.rootDir;
  }
}
