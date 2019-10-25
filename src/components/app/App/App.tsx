import React from 'react';
import AuthContextProvider from "../../../context/AuthContext";
import Home from "../Home";
import AppContextProvider from "../../../context/AppContext";
import {BrowserRouter} from "react-router-dom";
import ChannelListener from "../../channelListener";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppContextProvider>
          <div className="app-wrapper">
            <ChannelListener/>
            <Home/>
          </div>
        </AppContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

