import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv'
import {initClient} from './helpers/initMessengerSdk';
import {initCurrentUser} from "./helpers/initCurrentUser";

(async () => {
    try {
        await initClient();
        await initCurrentUser();
    } catch (e) {
        console.log(e)
    }

    dotenv.config();
    ReactDOM.render(<App/>, document.getElementById('root'));
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
