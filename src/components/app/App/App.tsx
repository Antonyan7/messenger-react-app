import React from 'react';
import AuthContextProvider from "../../../context/AuthContext";
import Home from "../Home";
import AppContextProvider from "../../../context/AppContext";
import {BrowserRouter} from "react-router-dom";
import ChannelListener from "../../channelListener";
import MessageContextProvider from "../../../context/MessageContext";

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <AppContextProvider>
                    <MessageContextProvider>
                        <div className="App">
                            <ChannelListener/>
                            <Home/>
                        </div>
                    </MessageContextProvider>
                </AppContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
};

export default App;

