import React from 'react';
import './Compose.css';
import {ICompose} from "../../../interfaces/interfaces";

const Compose = (props: ICompose) => {
  const {rightItems} = props;
  return (
    <div className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
      />

      {
        rightItems
      }
    </div>
  );
};

export default Compose
