import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {classes, getAppKey} from '../../common/utils';
import {FileSystemContext} from '../../contexts';
import {Icon, Link} from '..';
import './stylesheet.scss';

export function Desktop() {
  const [rootDir, refreshRootDir] = useContext(FileSystemContext);
  const desktopDir = rootDir.getDesktopDir();
  const apps = rootDir.getApps();

  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;

  const {wallpapers, saidYes} = desktopDir;
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const wallpaper = wallpapers[wallpaperIndex];
  const previousWallpaper = wallpapers[(wallpaperIndex + wallpapers.length - 1) % wallpapers.length];

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setWallpaperIndex((wallpaperIndex + 1) % wallpapers.length);
    }, 10000);

    return () => {
      window.clearTimeout(handle);
    };
  }, [wallpaperIndex]);

  useEffect(() => {
    apps && apps.forEach(app => {
      const focused = getAppKey(currentUrl) === app.key;
      if (focused) {
        app.lastUrl = currentUrl;
        if (!app.opened) {
          app.opened = true;
          app.instance++;
        }
        if (!app.focused) {
          app.zIndex = Math.max(...apps.map(app => app.zIndex)) + 1;
        }
      }
      app.focused = focused;
    });
    refreshRootDir();
  }, [currentUrl]);

  useEffect(() => {
    apps && apps.forEach(app => {
      if (app.closing) {
        setTimeout(() => {
          app.closing = false;
          app.opened = false;
          refreshRootDir();
        }, 200);
      }
    });
  });

  return (
    <div className={classes('Desktop', saidYes && 'hearts')}
         onMouseDown={() => {
           if (currentUrl !== '/') navigate('/');
         }}>
      <div className={classes('wallpaper', saidYes && 'color')} key={previousWallpaper}
           style={{backgroundImage: `url(${previousWallpaper})`}}/>
      <div className={classes('wallpaper', 'fade-in', saidYes && 'color')} key={wallpaper}
           style={{backgroundImage: `url(${wallpaper})`}}/>
      <div className="app-container">
        {
          desktopDir && desktopDir.children.map(child => (
            <Link className="shortcut" url={child.url} key={child.key}>
              <Icon className="icon" {...child.iconProps}/>
              <div className="name">
                {child.name}
              </div>
            </Link>
          ))
        }
      </div>
      <div className="window-container">
        {
          apps && apps.filter(app => app.opened).map(app => (
            <app.WindowComponent key={app.key}
                                 app={app}
                                 onUpdate={patch => {
                                   Object.assign(app, patch);
                                   refreshRootDir();
                                 }}/>
          ))
        }
      </div>
    </div>
  );
}
