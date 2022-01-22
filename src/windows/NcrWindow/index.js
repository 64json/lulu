import React from 'react';
import {AlbumWindow} from "../../components";
import {ncr} from '../../data';

export function NcrWindow(props) {
  return (
    <AlbumWindow
      message="Imposter ඞ"
      memories={ncr}
      toolbarStyle={{
        backgroundColor: 'rgb(84, 185, 72)',
      }}
      {...props}/>
  );
}
