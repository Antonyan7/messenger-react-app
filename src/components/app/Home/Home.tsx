import React from "react";
import Messenger from "../Messenger";
import {Route, Switch} from "react-router";
import Login from "../../auth/Login";
import Auth from "../../auth/Auth";

import PrivateHomeRoute from "../../../privateRoutes/PrivateHomeRoute";
import PrivateLoginRoute from "../../../privateRoutes/PrivateLoginRoute";

function Home() {
    return (
        <div className="Home">
            <Switch>
                <PrivateHomeRoute path="/" exact component={Messenger}/>
                <PrivateLoginRoute path="/login" exact component={Login}/>
                <Route path="/auth" exact component={Auth}/>
            </Switch>
        </div>
    );
};

export default Home;

