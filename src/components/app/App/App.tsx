import React from 'react';
import AuthContextProvider from "../../../context/AuthContext";
import Home from "../Home";
import AppContextProvider from "../../../context/AppContext";
import {BrowserRouter} from "react-router-dom";
import ChannelListener from "../../channelListener";

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <AppContextProvider>
                    <div className="App">
                        <ChannelListener/>
                        <Home/>
                    </div>
                </AppContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
};

export default App;

