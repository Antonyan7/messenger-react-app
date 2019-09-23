import React, {useEffect, useContext} from 'react';
import ConversationLocalSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../../layouts/Toolbar';
import ToolbarButton from '../../layouts/ToolbarButton';
import axios from 'axios';

import './ConversationList.css';
import {AppContext} from "../../../context/AppContext";
import {IConversations} from "../../../interfaces/IConversations";
import {IUsersListResponse} from "../../../interfaces/IUsersListResponse";
import {AuthContext} from "../../../context/AuthContext";
import ConversationListContextProvider from "../../../context/ConversationListContext";
import UsersListDialog from "../Dialog/UsersListDialog";

function ConversationList() {
    const {updateFilteredChannels} = useContext(AppContext);
    const {filteredChannels} = useContext(AppContext);
    const {addChannels} = useContext(AppContext);
    const {authToken} = useContext(AuthContext);

    const getChannels = () => {
        const config = {
            headers: {'Authorization': "bearer " + authToken}
        };

        axios.get(process.env.REACT_APP_BASE_URL+'v1/channels', config).then(response => {
            const channelsList = response.data.data.channels.map((result: IUsersListResponse) => {
                return {
                    id: result.id,
                    photo: result.image_url,
                    name: result.title,
                    text: result.description
                };
            });
            addChannels(channelsList);
            updateFilteredChannels(channelsList);
        });
    };

    useEffect(() => {
        getChannels();
    }, []);

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
