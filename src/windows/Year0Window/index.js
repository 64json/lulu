import React, {useContext, useEffect} from 'react';
import {AlbumWindow} from "../../components";
import {year0} from '../../data';
import year0_bg from '../../images/year0-bg.jpeg';
import {FileSystemContext} from "../../contexts";

export function Year0Window(props) {
  const [rootDir, refreshRootDir] = useContext(FileSystemContext);
  useEffect(() => {
    rootDir.getDesktopDir().saidYes = true;
    refreshRootDir();
  }, [rootDir, refreshRootDir]);

  return (
    <AlbumWindow
      message="Happy 23rd birthday, Lulu 😘"
      memories={year0}
      toolbarStyle={{
        backgroundImage: `url(${year0_bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      {...props} />
  );
}
