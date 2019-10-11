import React, {useEffect, useContext} from 'react';
import ConversationLocalSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import UsersListDialog from "../Dialog/UsersListDialog";
import {AppContext} from "../../../context/AppContext";
import {Channel, ChannelsResponse} from "globalid-messaging-web-sdk";
import {client} from "../../../helpers/initMessengerSdk"
import './ConversationList.css';

function ConversationList() {
    const {updateFilteredChannels} = useContext(AppContext);
    const {filteredChannels} = useContext(AppContext);
    const {addChannels} = useContext(AppContext);

    useEffect(() => {
        if (client) {
            getChannels()
        }
    }, []);

    const getChannels = async () => {
        const channels: ChannelsResponse = await client.channel().getChannels(1, 20);

        const channelsList = channels.data.channels.map((result: Channel) => {
            return {
                alias: result.alias,
                created_at: result.created_at,
                created_by: result.created_by,
                deleted: result.deleted,
                description: result.description,
                exposed: result.exposed,
                id: result.id,
                image_url: result.image_url,
                message: result.message,
                participants: result.participants,
                title: result.title,
                type: result.type,
                unread_count: result.unread_count,
                updated_at: result.updated_at,
                updated_by: result.updated_by,
                uuid: result.uuid
            };
        });
        addChannels(channelsList);
        updateFilteredChannels(channelsList);
    };

    return (
        <div className="conversation-list">
            <ConversationLocalSearch/>
            {
                filteredChannels.map((channel: Channel) =>
                    <ConversationListItem
                        key={channel.uuid}
                        data={channel}
                    />
                )
            }
            <UsersListDialog/>
        </div>
    );
}

export default ConversationList;
