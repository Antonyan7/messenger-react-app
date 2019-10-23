import React, {useContext} from 'react';
import PlusCircleIcon from "../../../../assets/icons/PlusCircleIcon";
import './AddChannelButton.css'
import {ConversationListContext} from "../../../../context/ConversationListContext";

function AddChannelButton() {
    const {updateIsUsersListOpened} = useContext(ConversationListContext);

    const handleClick = () => {
        updateIsUsersListOpened(true);
    };

    return (
        <div className="AddChannelButton" onClick={handleClick}>
            <PlusCircleIcon key="plusCircleIcon"/>
        </div>
    );
}

export default AddChannelButton;
