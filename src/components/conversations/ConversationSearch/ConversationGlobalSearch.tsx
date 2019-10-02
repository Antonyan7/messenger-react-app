import React, {useContext, useState} from 'react';
import './ConversationLocalSearch.css';
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {ConversationListContext} from "../../../context/ConversationListContext";
import {client} from "../../../helpers/initMessengerSdk";
import {ChannelsResponse} from "globalid-messaging-web-sdk";

const ConversationGlobalSearch = () => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const {authToken} = useContext(AuthContext);
    const {updateSearchedChannels, updateIsSearching} = useContext(ConversationListContext);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateIsSearching(true);
        setSearchQuery(e.target.value);
        searchChannels(e.target.value);
    };

    const searchChannels = async (query: any) => {
        const channels: ChannelsResponse = await client.channel().searchChannels([query]);
        // updateSearchedChannels(channels.data);
        // updateIsSearching(false);
    };

    return (
        <div className="conversation-search">
            <input
                type="search"
                className="conversation-search-input"
                placeholder="Search Messages"
                value={searchQuery}
                onChange={handleSearch}
            />
        </div>
    );
};

export default ConversationGlobalSearch
