import React, {useEffect, useContext} from 'react';
import ConversationLocalSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../../layouts/Toolbar';
import ToolbarButton from '../../layouts/ToolbarButton';

import './ConversationList.css';
import {AppContext} from "../../../context/AppContext";
import {IConversations} from "../../../interfaces/IConversations";
import {AuthContext} from "../../../context/AuthContext";
import ConversationListContextProvider from "../../../context/ConversationListContext";
import UsersListDialog from "../Dialog/UsersListDialog";
import {ChannelsResponse, Config, GlobalidMessagingClient, init} from "globalid-messaging-web-sdk/dist";

function ConversationList() {
    const {updateFilteredChannels} = useContext(AppContext);
    const {filteredChannels} = useContext(AppContext);
    const {addChannels} = useContext(AppContext);
    const {authToken} = useContext(AuthContext);
    let client: GlobalidMessagingClient;

    const initSdk = async () => {
        const config: Config = {
            accessToken: authToken,
        };
        client = await init(config);
    };

    useEffect(() =>{
        initSdk().then((data) => {
            getChannels();
        }).catch((error) => {
            console.log(error);
        });
    },[]);

    const getChannels  = async () => {
        const channels: ChannelsResponse = await client.channel().getChannels(1, 1);
        const channelsList = channels.data.channels.map((result: any) => {
            return {
                id: result.id,
                photo: result.image_url,
                name: result.title,
                text: result.description
            };
        });
        addChannels(channelsList);
        updateFilteredChannels(channelsList);
    };


    return (
        <div className="conversation-list">
            <ConversationListContextProvider>
                <Toolbar
                    title="Messenger"
                    leftItems={[
                        <ToolbarButton key="cog" icon="ion-ios-cog"/>
                    ]}
                    rightItems={[
                        <ToolbarButton key="add" icon="ion-ios-add-circle-outline"/>
                    ]}
                />
                <ConversationLocalSearch/>
                {
                    filteredChannels.map((channel: IConversations) =>
                        <ConversationListItem
                            key={channel.name}
                            data={channel}
                        />
                    )
                }
                <UsersListDialog/>
            </ConversationListContextProvider>
        </div>
    );
}

export default ConversationList;
