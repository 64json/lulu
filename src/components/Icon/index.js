import React from 'react';
import {classes} from '../../common/utils';
import * as iconMap from '../../images/icons';
import './stylesheet.scss';

export function Icon({className, iconKey, iconUrl}) {
  return (
    <div className={classes('Icon', className)}
         style={{backgroundImage: `url(${iconUrl || iconMap[iconKey]})`}}/>
  );
}
