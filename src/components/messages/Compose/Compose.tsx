import React from 'react';
import './Compose.css';
import {ICompose} from "../../../interfaces/interfaces";

const Compose = (props: ICompose) => {
    const {rightItems} = props;

    const publishMessage = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter'){
            console.log('entered')
        }
    };

    return (
        <div className="compose">
            <input
                type="text"
                className="compose-input"
                placeholder="Type a message, @name"
                onKeyPress={publishMessage}
            />

            {
                rightItems
            }
        </div>
    );
};

export default Compose
