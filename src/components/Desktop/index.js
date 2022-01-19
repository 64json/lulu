import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getAppKey} from '../../common/utils';
import {FileSystemContext, ResponsiveContext} from '../../contexts';
import {Icon, Link} from '..';
import {wallpapers} from '../../images/wallpapers';
import './stylesheet.scss';

export function Desktop() {
  const mobile = useContext(ResponsiveContext);
  const [rootDir, refreshRootDir] = useContext(FileSystemContext);
  const desktopDir = rootDir.getDesktopDir();
  const apps = rootDir.getApps();

  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;

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
    <div className="Desktop"
         onMouseDown={() => {
           if (currentUrl !== '/') navigate('/');
         }}>
      <div className="wallpaper" key={previousWallpaper}
           style={{backgroundImage: `url(${previousWallpaper})`}}/>
      <div className="wallpaper fade-in" key={wallpaper}
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
