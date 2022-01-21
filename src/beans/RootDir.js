import {AppFile, DesktopDir, LinkFile, SymlinkFile, SystemDir} from '.';
import {AtlantaWindow, FinderWindow, GatherlyWindow, MoolahWindow, NcrWindow, NycWindow} from '../windows';

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
    const atlanta = new AppFile(AtlantaWindow);
    const nyc = new AppFile(NycWindow);

    this.rootDir = new RootDir({
      users: new SystemDir({
        'Lulu and Jinseo': new SystemDir({
          apps: new SystemDir({
            Finder: finder,
            Gatherly: gatherly,
            Moolah: moolah,
            NCR: ncr,
            Atlanta: atlanta,
            NYC: nyc,
          }),
          desktop: new DesktopDir({
            Spotify: new LinkFile('https://open.spotify.com/playlist/37i9dQZF1EJDpt91mXLGX6'),
            Gatherly: new SymlinkFile(gatherly),
            Moolah: new SymlinkFile(moolah),
            NCR: new SymlinkFile(ncr),
            Atlanta: new SymlinkFile(atlanta),
            NYC: new SymlinkFile(nyc),
          }),
        }),
      }),
    });

    return this.rootDir;
  }
}
