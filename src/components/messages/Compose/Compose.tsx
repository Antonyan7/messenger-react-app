import React, {useContext, useState} from 'react';
import './Compose.css';
import {IAppContextMessage, ICompose, IUsersListResponse} from "../../../interfaces/interfaces";
import {AppContext} from "../../../context/AppContext";
import axios from "axios";
import uuid from "uuid";

const Compose = (props: ICompose) => {
    const {rightItems} = props;
    const [message, setMessage] = useState<string>("");

    const {addMessage} = useContext(AppContext);

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const publishMessage = (e: React.KeyboardEvent) => {
        const props = {
            message: {
                uuid: uuid(),
                type: "TEXT",
                content: JSON.stringify({text: message})
            },
            channels: [ "3767" ]
        };

        if(e.key === 'Enter'){
            const config = {
                headers: {'Authorization': "bearer " + process.env.REACT_APP_AUTH_TOKEN}
            };


            axios.post('https://dev-api.gidstaging.net/v1/messages', props, config).then(response => {
                // const message = response.map((result: any) => {
                //     console.log(result);
                //     return {
                //         id: result.id,
                //         photo: result.image_url,
                //         name: result.title,
                //         text: result.description
                //     };
                // });
                // addMessage(response)
            });
        }
    };

    return (
        <div className="compose">
            <input
                type="text"
                className="compose-input"
                placeholder="Type a message, @name"
                value={message}
                onChange={handleMessageChange}
                onKeyPress={publishMessage}
            />

            {
                rightItems
            }
        </div>
    );
};

export default Compose
