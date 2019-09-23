import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

const CurrentUserHelper = (token: string) => {

    const {updateCurrentUser} = useContext(AuthContext);

    const config = {
        headers: {'Authorization': "bearer " + token}
    };

    axios.get(process.env.REACT_APP_BASE_URL + 'v1/identities/me', config).then(response => {
        const user  = {
            id: response.data.gid_uuid,
            photo: response.data.display_image_url,
            name: response.data.display_name,
            text: response.data.description
        };

        updateCurrentUser(user);
    });

};

export default CurrentUserHelper;
