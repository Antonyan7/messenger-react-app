import React, {useEffect, useContext} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../../layouts/Toolbar';
import ToolbarButton from '../../layouts/ToolbarButton';
import axios from 'axios';

import './ConversationList.css';
import {AppContext} from "../../../context/AppContext";
import {IConversations} from "../../../interfaces/IConversations";
import {IUsersListResponse} from "../../../interfaces/IUsersListResponse";

function ConversationList() {
    const {channels} = useContext(AppContext);
    const {addChannels} = useContext(AppContext);

    const getChannels = () => {
        const config = {
            headers: {'Authorization': "bearer " + process.env.REACT_APP_AUTH_TOKEN}
        };

        axios.get('https://dev-api.gidstaging.net/v1/channels', config).then(response => {
            const channelsList = response.data.data.channels.map((result: IUsersListResponse) => {
                return {
                    id: result.id,
                    photo: result.image_url,
                    name: result.title,
                    text: result.description
                };
            });
            addChannels(channelsList)
        });
    };

    useEffect(() => {
        getChannels();
    }, []);

    return (
        <div className="conversation-list">
            <Toolbar
                title="Messenger"
                leftItems={[
                    <ToolbarButton key="cog" icon="ion-ios-cog"/>
                ]}
                rightItems={[
                    <ToolbarButton key="add" icon="ion-ios-add-circle-outline"/>
                ]}
            />
            <ConversationSearch/>
            {
                channels.map((channel: IConversations) =>
                    <ConversationListItem
                        key={channel.name}
                        data={channel}
                    />
                )
            }
        </div>
    );
}

export default ConversationList;
