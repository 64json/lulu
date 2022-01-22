import React from 'react';
import {TerminalWindow} from "../TerminalWindow";

export function ProposalWindow(props) {
  return (
    <TerminalWindow
      initialCommand="❤️"
      {...props}/>
  );
}
