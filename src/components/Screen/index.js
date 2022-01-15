import React, {useEffect, useState} from 'react';
import {HashRouter as Router} from 'react-router-dom';
import {Desktop, Menu, Taskbar} from '..';
import {FileSystemContext, ResponsiveContext} from '../../contexts';
import {RootDir} from '../../beans';
import './stylesheet.scss';

const isMobile = () => {
  const {clientWidth} = document.body;
  return clientWidth <= 512;
};

export function Screen() {
  const [mobile, setMobile] = useState(isMobile());
  const [rootDirRefresh, setRootDirRefresh] = useState(0);

  useEffect(() => {
    const onResize = () => {
      setMobile(isMobile());
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('mobile', mobile);
  }, [mobile]);

  const refreshRootDir = () => setRootDirRefresh(rootDirRefresh + 1);

  return (
    <Router>
      <ResponsiveContext.Provider value={mobile}>
        <FileSystemContext.Provider value={[RootDir.instance, refreshRootDir]}>
          <div className="Screen">
            <Desktop/>
            <Menu/>
            <Taskbar/>
          </div>
        </FileSystemContext.Provider>
      </ResponsiveContext.Provider>
    </Router>
  );
}
