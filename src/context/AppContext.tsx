import React, {useState} from 'react'
import {IAppContext, IAppContextProvider, IAppContextMessage} from '../interfaces/interfaces';

export const AppContext = React.createContext<IAppContext>({} as IAppContext);

const AppContextProvider = (props: IAppContextProvider) => {
  const [messages, setMessages] = useState<Array<IAppContextMessage>>([
    {
      id: 1,
      author: 'apple',
      message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      author: 'orange',
      message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
      timestamp: new Date().toISOString()
    },
    {
      id: 3,
      author: 'orange',
      message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
      timestamp: new Date().toISOString()
    },
    {
      id: 4,
      author: 'apple',
      message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
      timestamp: new Date().toISOString()
    },
    {
      id: 5,
      author: 'apple',
      message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
      timestamp: new Date().toISOString()
    },
    {
      id: 6,
      author: 'apple',
      message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
      timestamp: new Date().toISOString()
    },
    {
      id: 7,
      author: 'orange',
      message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
      timestamp: new Date().toISOString()
    },
    {
      id: 8,
      author: 'orange',
      message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
      timestamp: new Date().toISOString()
    },
    {
      id: 9,
      author: 'apple',
      message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
      timestamp: new Date().toISOString()
    },
    {
      id: 10,
      author: 'orange',
      message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
      timestamp: new Date().toISOString()
    },
  ]);

  const updateMessages = (messagesList: Array<IAppContextMessage>) => {
    setMessages(messagesList)
  };

  const removeMessageById = (id: number) => {
    setMessages(messages.filter((message: IAppContextMessage) => message.id !== id))
  };

  return (
    <AppContext.Provider value={{messages, updateMessages, removeMessageById}}>
      {props.children}
    </AppContext.Provider>
  )
};

export default AppContextProvider
