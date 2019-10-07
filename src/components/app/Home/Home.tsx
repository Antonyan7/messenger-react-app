import React, {useContext, useEffect} from "react";
import Messenger from "../Messenger";
import {Route, Switch} from "react-router";
import Login from "../../auth/Login";
import Auth from "../../auth/Auth";

import PrivateHomeRoute from "../../../privateRoutes/PrivateHomeRoute";
import PrivateLoginRoute from "../../../privateRoutes/PrivateLoginRoute";
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";
import Preview from "../Preview";
import Header from "../Header";
import {client} from "../../../helpers/initMessengerSdk";
import {Channel, ServiceNotification} from "globalid-messaging-web-sdk/dist";
import {AppContext} from "../../../context/AppContext";

function Home() {
    const {authToken,updateCurrentUser} = useContext(AuthContext);
    const {addChannel} = useContext(AppContext);

    useEffect(() =>{
        getCurrentUser();
    }, []);

    const getCurrentUser = () => {
        const config = {
            headers: {'Authorization': "bearer " + authToken}
        };

        axios.get(process.env.REACT_APP_BASE_URL + 'v1/identities/me', config).then(response => {
            const user =  {
                id: response.data.gid_uuid,
                photo: response.data.display_image_url,
                name: response.data.display_name,
                text: response.data.description
            };
            console.log(user);
            updateCurrentUser(user);
        }).catch(e => {
            localStorage.clear();
        });
    };

    return (
        <div className="Home">
            <Switch>
                <PrivateHomeRoute path="/" exact component={Messenger}/>
                <PrivateLoginRoute path="/login" exact component={Login}/>
                <PrivateLoginRoute path="/preview" exact component={Preview}/>
                <Route path="/auth" exact component={Auth}/>
            </Switch>
        </div>
    );
};

export default Home;
