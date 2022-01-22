import React from 'react';
import {AlbumWindow} from "../../components";
import {moolah} from '../../data';

export function MoolahWindow(props) {
  return (
    <AlbumWindow
      message="My most favorite hackathon experience :)"
      memories={moolah}
      toolbarStyle={{
        backgroundImage: 'linear-gradient(45deg, #FF7474, #AB83ED, #3ED1FF)',
      }}
      {...props}/>
  );
}
