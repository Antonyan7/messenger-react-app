import React from 'react';
import './MobileBackToConversationList.css'
import ChevronLeft from "../../../../assets/icons/ChevronLeftIcon";

function MobileBackToConversationList() {
    const handleClick = () => {
    };

    return (
        <div className="back-btn" onClick={handleClick}>
            <ChevronLeft key="chevronLeft"/>
        </div>
    );
}

export default MobileBackToConversationList;
