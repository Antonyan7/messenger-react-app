import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import uuid from "uuid";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {ConversationListContext} from "../../../context/ConversationListContext";
import {AuthContext} from "../../../context/AuthContext";
import {ListItem} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {AppContext} from "../../../context/AppContext";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ConversationGlobalSearch from "../ConversationSearch/ConversationGlobalSearch";
import {Channel, ChannelPayload, ChannelType} from "globalid-messaging-web-sdk";
import {client} from "../../../helpers/initMessengerSdk";
import "./UsersListDialog.css";

const useStyles = makeStyles({
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: '#0D2460',
        fontFamily: 'Lato',
    },
    channelText: {
        color: '#212121',
        fontFamily: 'Lato'
    },
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
    progress: {
        margin: 10,
        position: 'absolute',
        top: 50
    },
    showComponent: {
        opacity: 1
    },
    hideComponent: {
        opacity: 0,
    }
});

export default function UsersListDialog() {
    const classes = useStyles();
    const [identities, setIdentities] = useState<Array<object>>([]);
    const {isUsersListOpened, updateIsUsersListOpened, searchedChannels, updateSearchedChannels} = useContext(ConversationListContext);
    const {authToken} = useContext(AuthContext);
    const {channels} = useContext(AppContext);

    useEffect(() => {
        getChannelsList();
    }, []);

    const config = {
        headers: {'Authorization': "bearer " + authToken}
    };

    const handleClose = () => {
        updateSearchedChannels(identities);
        updateIsUsersListOpened(false);
    };

    const handleListItemClick = async (channel: Channel) => {
        await addConversation(channel)
    };

    const getChannelsList = () => {
        axios.get(process.env.REACT_APP_BASE_URL + 'v1/identities', config).then(response => {
            const channelsList = response.data.map((result: any) => {
                return {
                    id: result.gid_uuid,
                    photo: result.display_image_url,
                    name: result.display_name,
                    text: result.description
                };
            });
            setIdentities(channelsList)
        });
    };

    const addConversation = async (channelInfo: any) => {
        const existingChannels = channels.filter(function (channel) {
            return channel.participants.includes(channelInfo.id)
        });

        if (existingChannels.length === 0) {
            const channelPayload: ChannelPayload = {
                uuid: uuid(),
                type: ChannelType.Personal,
                exposed: false,
                title: channelInfo.name,
                image_url: channelInfo.photo,
                participants: [channelInfo.id]
            };

            await client.channel().createChannel(channelPayload);
        }
        updateIsUsersListOpened(false);
    };

    return (
        <div>
            <Dialog
                open={isUsersListOpened}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                fullWidth={true}
                classes={{paper: classes.dialogPaper}}>
                <ConversationGlobalSearch/>

                <DialogContent dividers={true} className="dialog-wrapper">
                    {(searchedChannels.length !== 0 ? searchedChannels : identities).map((channel: any) => (
                        <ListItem button onClick={() => handleListItemClick(channel)} key={channel.id}>
                            <ListItemAvatar>
                                <Avatar src={channel.photo}
                                        className={classes.orangeAvatar}>{channel.name.charAt(0)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText className={classes.channelText} primary={channel.name}/>
                        </ListItem>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.channelText}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
