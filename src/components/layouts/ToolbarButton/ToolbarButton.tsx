import React, {useContext, useState} from 'react';
import './ToolbarButton.css';
import {IConversations, IToolbarButton} from "../../../interfaces/interfaces";
import {AppContext} from "../../../context/AppContext";

const ToolbarButton = (props: IToolbarButton) => {
  const {icon} = props;

  const channel: IConversations = {
    id: 3561,
    photo: "https://st2.depositphotos.com/9223672/12056/v/950/depositphotos_120568248-stock-illustration-male-face-avatar-logo-template.jpg",
    name: "test",
    text: "tsadfsadf"

  };
  const { addChannel } = useContext(AppContext);

  const addChannelEventHandler = () => {
    addChannel(channel);
  };

  return (
    <i className={`toolbar-button ${icon}`} onClick={addChannelEventHandler}/>
  );
};

export default ToolbarButton
