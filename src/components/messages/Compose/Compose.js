import React from 'react';
import './Compose.css';

const Compose = (props) => {
  const { rightItems } = props;
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
}

export default Compose
