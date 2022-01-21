import React from 'react';
import {AlbumWindow} from "../../components";
import {atlanta} from '../../data';
import atlanta_bg from '../../images/atlanta-bg.jpeg';

export function AtlantaWindow(props) {
  return (
    <AlbumWindow
      message="Where it all began..!"
      memories={atlanta}
      toolbarStyle={{
        backgroundImage: `url(${atlanta_bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      {...props}/>
  );
}
