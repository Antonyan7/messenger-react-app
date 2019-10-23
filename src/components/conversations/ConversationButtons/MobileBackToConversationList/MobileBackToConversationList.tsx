import React from 'react';
import './MobileBackToConversationList.css'
import ChevronLeft from "../../../../assets/icons/ChevronLeftIcon";
import mobileToggleChatActive from '../../../../helpers/mobileToggleChatActive';

function MobileBackToConversationList() {
    const handleClick = () => {
        mobileToggleChatActive(false);
    };

    return (
        <div className="back-btn" onClick={handleClick}>
            <ChevronLeft key="chevronLeft"/>
        </div>
    );
}

export default MobileBackToConversationList;
