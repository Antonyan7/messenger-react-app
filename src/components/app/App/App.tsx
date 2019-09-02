import React from 'react';
import Messenger from '../Messenger';
import AppContextProvider from '../../../context/AppContext'

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Messenger />
      </AppContextProvider>
    </div>
  );
};

export default App;

