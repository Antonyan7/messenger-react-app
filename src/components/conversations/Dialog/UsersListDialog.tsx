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
import {IConversations} from "../../../interfaces/IConversations";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ConversationGlobalSearch from "../ConversationSearch/ConversationGlobalSearch";
import {Channel, ChannelPayload, ChannelType} from "globalid-messaging-web-sdk/dist";
import {client} from "../../../helpers/initMessengerSdk";
import "./UsersListDialog.css";

const useStyles = makeStyles({
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: '#43c89a',
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
    const [channels, setChannels] = useState<Array<object>>([]);
    const {isUsersListOpened, updateIsUsersListOpened, searchedChannels, isSearching} = useContext(ConversationListContext);
    const {authToken, currentUser} = useContext(AuthContext);
    const {addChannel} = useContext(AppContext);

    useEffect(() => {
        getChannelsList();
    }, []);

    const config = {
        headers: {'Authorization': "bearer " + authToken}
    };

    const handleClose = () => {
        updateIsUsersListOpened(false);
    };

    const handleListItemClick = (channel: Channel) => {
        addConversation(channel)
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
            setChannels(channelsList)
        });
    };

    const addConversation = async (channelInfo: Channel) => {
        const channelPayload: ChannelPayload = {
            uuid: uuid(),
            type: ChannelType.Personal,
            exposed: false,
            participants: [channelInfo.id]
        };

        const channel: Channel = await client.channel().createChannel(channelPayload);
        addChannel(channel);
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
                classes={{ paper: classes.dialogPaper }}>
                <ConversationGlobalSearch/>

                <DialogContent dividers={true} className="dialog-wrapper">
                    {/*<CircularProgress  className={[*/}
                    {/*    `${isSearching ? classes.showComponent : classes.hideComponent}`,*/}
                    {/*].join('')} />*/}

                    {(searchedChannels.length != 0 ? searchedChannels : channels).map((channel: any) => (
                        <ListItem button onClick={() => handleListItemClick(channel)} key={channel.id}>
                            <ListItemAvatar>
                                <Avatar src={channel.photo} className={classes.orangeAvatar}>{channel.name.charAt(0)}</Avatar>
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
