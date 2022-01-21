import React from 'react';
import {AlbumWindow} from "../../components";
import {nyc} from '../../data';
import nyc_bg from '../../images/nyc-bg.jpeg';

export function NycWindow(props) {
  return (
    <AlbumWindow
      message="Where it all began..!"
      memories={nyc}
      toolbarStyle={{
        backgroundImage: `url(${nyc_bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      {...props}/>
  );
}
