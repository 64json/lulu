import React from 'react';
import {Window} from '../index';
import './stylesheet.scss';

export function AlbumWindow({message, memories, ...props}) {
  return (
    <Window className="AlbumWindow" noToolbar
            defaultWidth={50 * 16} defaultHeight={50 * 16}
            contentStyle={{
              pointerEvents: 'auto',
              overflowY: 'auto',
              WebkitMaskImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 1) 4rem)',
            }}
            {...props}>
      <div className="message">
        {message}
      </div>
      <div className="memory-container">
        {
          memories.map(memory => (
            <div key={memory.image} className="memory">
              <img className="image" src={memory.image} alt={memory.note}/>
              <div className="note">{memory.note}</div>
            </div>
          ))
        }
      </div>
    </Window>
  );
}
