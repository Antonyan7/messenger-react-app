import React, { useEffect, useContext } from 'react'
import shave from 'shave'

import './ConversationListItem.css'
import { AppContext } from '../../../context/AppContext'

function ConversationListItem (props) {
  const {updateMessages} = useContext(AppContext)
  useEffect(() => {
    shave('.conversation-snippet', 20)
  }, [])

  const {photo, name, text} = props.data

  const getUserMessages = (e) => {
    e.preventDefault()
    const messages = [
      {
        id: 1,
        message: name + text,
        author: name,
      },
    ]
    updateMessages(messages)
  }

  return (
    <div className="conversation-list-item" onClick={getUserMessages}>
      <img className="conversation-photo" src={photo} alt="conversation"/>
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
    </div>
  )
}

export default ConversationListItem
