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

function Home() {
  const {authToken, updateCurrentUser} = useContext(AuthContext);


  const getCurrentUser = () => {
    const config = {
      headers: {'Authorization': "bearer " + authToken}
    };

    axios.get(process.env.REACT_APP_BASE_URL + 'v1/identities/me', config).then(response => {
      const user = {
        id: response.data.gid_uuid,
        photo: response.data.display_image_url,
        name: response.data.display_name,
        text: response.data.description,
        gidName: response.data.gid_name
      };
      updateCurrentUser(user);
    }).catch(() => {
      localStorage.clear();
    });
  };

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
}

export default Home;
