import React from 'react';
import {AlbumWindow} from "../../components";
import {tokyo} from '../../data';
import tokyo_bg from '../../images/tokyo-bg.png';

export function TokyoWindow(props) {
  return (
    <AlbumWindow
      message="Tokyo (Valentino) 💦"
      memories={tokyo}
      toolbarStyle={{
        backgroundImage: `url(${tokyo_bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      {...props}/>
  );
}
