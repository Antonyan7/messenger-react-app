import axios from "axios";
import {Config} from "globalid-messaging-web-sdk/dist";

const token = localStorage.getItem('token');


const config = {
    headers: {'Authorization': "bearer " + token}
};

export async function initCurrentUser() {

    axios.get(process.env.REACT_APP_BASE_URL + 'v1/identities/me', config).then(response => {
        localStorage.setItem('gid_uuid', response.data.gid_uuid);
    });
}

