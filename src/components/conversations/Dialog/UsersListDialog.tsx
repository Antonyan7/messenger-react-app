import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import uuid from "uuid";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ConversationListContext} from "../../../context/ConversationListContext";
import {AuthContext} from "../../../context/AuthContext";
import {ListItem} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import {AppContext} from "../../../context/AppContext";
import {IConversations} from "../../../interfaces/IConversations";
import {deepOrange} from "@material-ui/core/colors";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
});

export default function UsersListDialog() {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [channels, setChannels] = useState<Array<object>>([]);
    const [searchedChannels, setSearchedChannels] = useState<Array<object>>([]);
    const {isUsersListOpened, updateIsUsersListOpened} = useContext(ConversationListContext);
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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        searchChannels(e.target.value);
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

    const searchChannels = (query: any) => {
        axios.get(process.env.REACT_APP_BASE_URL + 'v1/identities?gid_name=' + query, config).then(response => {
            console.log(response);
            const channelsList = response.data.map((result: any) => {
                return {
                    id: result.gid_uuid,
                    photo: result.display_image_url,
                    name: result.display_name,
                    text: result.description
                };
            });
            setSearchedChannels(channelsList)
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
            >
                <DialogTitle id="scroll-dialog-title">Add Channel</DialogTitle>
                <TextField
                    autoFocus
                    margin="dense"
                    id="channelName"
                    label="Channel Name"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <DialogContent dividers={true}>
                    {(searchedChannels.length != 0 ? searchedChannels : channels).map((channel: any) => (
                        <ListItem button onClick={() => handleListItemClick(channel)} key={channel.name}>
                            <ListItemAvatar>
                                <Avatar src={channel.photo} className={classes.orangeAvatar}>{channel.name.charAt(0)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={channel.name}/>
                        </ListItem>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
