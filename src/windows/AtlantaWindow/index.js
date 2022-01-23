import React from 'react';
import {AlbumWindow} from "../../components";
import {atlanta} from '../../data';
import atlanta_bg from '../../images/atlanta-bg.jpeg';

export function AtlantaWindow(props) {
  return (
    <AlbumWindow
      message="I thought ATL was boring until hanging out with Lulu!"
      memories={atlanta}
      toolbarStyle={{
        backgroundImage: `url(${atlanta_bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      {...props}/>
  );
}
