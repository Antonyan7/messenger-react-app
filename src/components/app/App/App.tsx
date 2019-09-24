import React from 'react';
import AuthContextProvider from "../../../context/AuthContext";
import Home from "../Home";
import AppContextProvider from "../../../context/AppContext";
import {BrowserRouter} from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <AppContextProvider>
                    <div className="App">
                        <Home/>
                    </div>
                </AppContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
};

export default App;

