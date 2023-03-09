import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom'

export default function SimpleDialog(props) {
    const { onClose, open } = props;
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
        navigate({
            pathname: '/login',
        });
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Connectez-vous pour prendre un rendez-vous</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
                    <ListItemAvatar>
                        <Avatar>
                            <LoginIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Connectez-vous" />
                </ListItem>
            </List>
        </Dialog>
    );
}