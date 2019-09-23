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
import {deepOrange} from "@material-ui/core/colors";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ConversationGlobalSearch from "../ConversationSearch/ConversationGlobalSearch";

const useStyles = makeStyles({
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
        fontFamily: 'Lato',
    },
    channelText: {
        fontFamily: 'Lato',
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
    const {authToken} = useContext(AuthContext);
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

    const handleListItemClick = (channel: IConversations) => {
        console.log(channel);
        addConversation(channel)
    };

    const getChannelsList = () => {
        axios.get(process.env.REACT_APP_BASE_URL + 'v1/identities', config).then(response => {
            console.log(response);
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

    const addConversation = (channel: IConversations) => {
        const props = {
            participants: [
                channel.id
            ],
            uuid: uuid(),
            type: "PERSONAL",
            exposed: true,
            title: channel.name,
            description: channel.text,
            image_url: channel.photo
        };

        axios.post(process.env.REACT_APP_BASE_URL + 'v1/channels', props, config).then(response => {

            const newChannel = {
                id: response.data.id,
                photo: response.data.image_url,
                name: response.data.title,
                text: response.data.description
            };

            addChannel(newChannel);
            handleClose();
        });
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

                <DialogContent dividers={true}>
                    {/*<CircularProgress  className={[*/}
                    {/*    `${isSearching ? classes.showComponent : classes.hideComponent}`,*/}
                    {/*].join('')} />*/}

                    {(searchedChannels.length != 0 ? searchedChannels : channels).map((channel: any) => (
                        <ListItem button onClick={() => handleListItemClick(channel)} key={channel.name}>
                            <ListItemAvatar>
                                <Avatar src={channel.photo} className={classes.orangeAvatar}>{channel.name.charAt(0)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText className={classes.channelText} primary={channel.name}/>
                        </ListItem>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" className={classes.channelText}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
