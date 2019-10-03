import React, {useContext, useState} from 'react';
import './ConversationLocalSearch.css';
import {AppContext} from "../../../context/AppContext";
import {ChannelsResponse} from "globalid-messaging-web-sdk/dist";
import {client} from "../../../helpers/initMessengerSdk";

const ConversationLocalSearch = () => {
    const { updateFilteredChannels } = useContext(AppContext);
    const { channels } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        // const channels: ChannelsResponse = await client.channel().searchChannels([query]);
        // console.log(channels);
        // let filteredList = channels.filter(
        //     (channel) => {
        //         return channel.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
        //     }
        // );
        // let filteredList = channels.data.channels;
        //
        // updateFilteredChannels(filteredList);
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
