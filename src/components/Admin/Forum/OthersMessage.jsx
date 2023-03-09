import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import TextMessage from './TextMessage';
import PhotoMessage from './PhotoMessage';
import IconButton from '@mui/material/IconButton';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';


const MessageContent = styled('div')`
    display: flex;
    width: 100%;
    margin: 10px 0;
    position: relative;
    align-items: center;
`

const MessageCotnainer = styled('div')`
    display: flex;
    flex-direction: row;
    padding: 10px;
    max-width: 50%;
    align-items: end;
    min-width: 300px;
    @media only screen and (max-width: 600px){
        min-width: 250px;
        max-width: 60%;
    } 
    @media only screen and (max-width: 400px){
        padding: 10px 0;
        min-width: 200px;
    } 
`

const SingleMessage = styled('div')`
    display: flex;
    margin: 0 15px 5px 15px;
    flex-direction: column;
    @media only screen and (max-width: 400px){
        margin: 0 0 5px 0;
    } 
`

const MsgTime = styled('p')`
    color: #818181;
    font-size: 14px;
    font-family: "arial";
    margin: 5px 0 0 10px;
`

const StyledListItemText = styled(ListItemText)`
    .MuiTypography-root{
        font-size: 13px;
    }
`

const IconContainer = styled('div')`
    padding: 8px;
`

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

const RenderTime = (time) => {
    const date = moment(new Date()).format('MM-DD-YYYY');
    const msgDate = moment(new Date(time)).format('MM-DD-YYYY');

    if (msgDate === date) {
        const fullTime = moment(new Date(time)).format('H:mm');

        if (fullTime === "Invalid date") {
            return time
        }
        return fullTime
    } else {
        const fullDate = moment(new Date(time)).format('DD/MM/YYYY - H:mm');
        if (fullDate === "Invalid date") {
            return time
        }
        return fullDate
    }
}


const MsgMenu = (props) => {
    const { open, handleTooltipOpen, handleTooltipClose, loading, handleRemove } = props;

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
                <LightTooltip
                    PopperProps={{
                        disablePortal: true,
                    }}
                    placement="top"
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={
                        <List style={{ padding: 0 }}>
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleRemove} style={{ padding: "6px 18px" }}>
                                    <StyledListItemText primary="Supprimer" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    }
                >
                    {
                        loading ?
                            <IconContainer onClick={handleTooltipOpen} color="primary" aria-label="more" component="span">
                                <CircularProgress style={{ width: 24 }} size="small" />
                            </IconContainer>
                            :
                            <IconButton onClick={handleTooltipOpen} color="primary" aria-label="more" component="span">
                                <MoreHorizIcon />
                            </IconButton>
                    }
                </LightTooltip>
            </div>
        </ClickAwayListener>
    )
}

export default function OthersMessage(props) {
    const [isShown, setIsShown] = useState(false);
    const { message, room, role } = props;
    const { type, sender, content, time, avatarUrl, images } = message;
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const handleMouseEnter = () => {
        setIsShown(true)
    }

    const handleMouseLeave = () => {
        setIsShown(false)
        setOpen(false)
    }

    const handleRemove = () => {
        handleTooltipClose()
        setLoading(true)
        axios.delete(`http://192.168.1.113:5000/users/delete/message/${message.id}`)
            .then(res => {
                setLoading(false)
                props.handleRemove(message)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    if (type === "photos") {
        return (
            <MessageContent onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <MessageCotnainer>
                    <Avatar style={{ marginBottom: 20 }} alt="Remy Sharp" src={avatarUrl} />
                    <SingleMessage>
                        <PhotoMessage owner={"others"} images={images} />
                        <MsgTime>{`${sender}: ${RenderTime(time)}`}</MsgTime>
                    </SingleMessage>
                </MessageCotnainer>
                {isShown && role === "admin" && room && (
                    <MsgMenu loading={loading} handleRemove={handleRemove} open={open} handleTooltipOpen={handleTooltipOpen} handleTooltipClose={handleTooltipClose} />
                )}
            </MessageContent>
        )
    }

    if (type === "text") {
        return (
            <MessageContent onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <MessageCotnainer>
                    <Avatar style={{ marginBottom: 20 }} alt="Remy Sharp" src={avatarUrl} />
                    <SingleMessage>
                        <TextMessage content={content} owner={"others"} />
                        <MsgTime>{`${sender}: ${RenderTime(time)}`}</MsgTime>
                    </SingleMessage>
                </MessageCotnainer>
                {isShown && role === "admin" && room && (
                    <MsgMenu loading={loading} handleRemove={handleRemove} open={open} handleTooltipOpen={handleTooltipOpen} handleTooltipClose={handleTooltipClose} />
                )}
            </MessageContent>
        )
    }

    if (type === "text/photos") {
        return (
            <MessageContent onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <MessageCotnainer>
                    <Avatar style={{ marginBottom: 20 }} alt="Remy Sharp" src={avatarUrl} />
                    <SingleMessage>
                        <TextMessage content={content} owner={"others"} />
                        <PhotoMessage images={images} owner={"others"} />
                        <MsgTime>{`${sender}: ${RenderTime(time)}`}</MsgTime>
                    </SingleMessage>
                </MessageCotnainer>
                {isShown && role === "admin" && room && (
                    <MsgMenu loading={loading} handleRemove={handleRemove} open={open} handleTooltipOpen={handleTooltipOpen} handleTooltipClose={handleTooltipClose} />
                )}
            </MessageContent>
        )
    }

    return null;
}
