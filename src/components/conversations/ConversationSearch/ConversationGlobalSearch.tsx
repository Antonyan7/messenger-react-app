import React, {useContext, useState} from 'react';
import './ConversationLocalSearch.css';
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {ConversationListContext} from "../../../context/ConversationListContext";
import {client} from "../../../helpers/initMessengerSdk";

const ConversationGlobalSearch = () => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const {authToken} = useContext(AuthContext);
    const {isUsersListOpened, updateSearchedChannels, updateIsSearching} = useContext(ConversationListContext);

    const config = {
        headers: {'Authorization': "bearer " + authToken}
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateIsSearching(true);
        setSearchQuery(e.target.value);
        searchChannels(e.target.value);
    };

    const searchChannels = (query: any) => {
        axios.get(process.env.REACT_APP_BASE_URL + 'v1/identities?gid_name=' + query, config).then(response => {
            const channelsList = response.data.map((result: any) => {
                return {
                    id: result.gid_uuid,
                    photo: result.display_image_url,
                    name: result.display_name,
                    text: result.description
                };
            });
            updateSearchedChannels(channelsList);
            updateIsSearching(false);
        });
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
