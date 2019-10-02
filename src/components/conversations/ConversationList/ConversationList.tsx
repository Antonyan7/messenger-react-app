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
import {ChannelsResponse, Config, GlobalidMessagingClient, init} from "globalid-messaging-web-sdk";

import {client} from "../../../helpers/initMessengerSdk"
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import PlusCircleIcon from "../../../assets/icons/PlusCircleIcon";

function ConversationList() {
    const {updateFilteredChannels} = useContext(AppContext);
    const {filteredChannels} = useContext(AppContext);
    const {addChannels} = useContext(AppContext);
    const {authToken} = useContext(AuthContext);


    useEffect(() => {
        if (client) {
            getChannels()
        }
        console.log(client);
    }, []);

    const getChannels = async () => {

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

    // useEffect(() => {
    //     (async () => {
    //         client = await initSdk(authToken);
    //         getChannels()
    //     })();
    // });
    // (async () => {
    //     client = await initSdk(authToken);
    // })();

    return (
        <div className="conversation-list">
            <ConversationListContextProvider>
                <Toolbar
                    title="Messenger"
                    leftItems={[
                        <SettingsIcon key="settingsIcon"/>
                    ]}
                    rightItems={[
                        <PlusCircleIcon key="plusCircleIcon"/>
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
