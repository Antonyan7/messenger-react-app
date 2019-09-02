import React from 'react';
import './ToolbarButton.css';
import {IToolbarButton} from "../../../interfaces/interfaces";

const ToolbarButton = (props: IToolbarButton) => {
  const {icon} = props;
  return (
    <i className={`toolbar-button ${icon}`}/>
  );
};

export default ToolbarButton
