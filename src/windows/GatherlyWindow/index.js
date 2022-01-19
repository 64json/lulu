import React from 'react';
import {AlbumWindow} from "../../components";
import {gatherly} from '../../data';

export function GatherlyWindow(props) {
  return (
    <AlbumWindow
      message="Where it all began..!"
      memories={gatherly}
      toolbarStyle={{
        backgroundImage: 'linear-gradient(90deg, #00a9f2, #03caa5)',
      }}
      {...props}/>
  );
}
