import React, {useContext, useState} from 'react';
import './ConversationLocalSearch.css';
import {AppContext} from "../../../context/AppContext";

const ConversationLocalSearch = () => {
    const { updateFilteredChannels } = useContext(AppContext);
    const { channels } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);

        let filteredList = channels.filter(
            (channel) => {
                return channel.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
            }
        );

        updateFilteredChannels(filteredList);
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

export default ConversationLocalSearch
