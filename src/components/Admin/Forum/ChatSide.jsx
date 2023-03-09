import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import RoomAvatar from './RoomAvatar';
import Divider from '@mui/material/Divider';
import ChatContent from './ChatContent';
import ChatAction from './ChatAction';


const ChatContainer = styled('div')`
    display: flex;
    width: 90%;
    margin: 0 auto;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`

const ChatHeader = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
`

export default function ChatSide({ connected, Messages, handleSendMsg, setLoading, loading, room, handleRemove }) {

    return (
        <Paper style={{ display: "flex", width: "100%" }} elevation={0}>
            <ChatContainer>
                <ChatHeader>
                    <RoomAvatar room={room} connected={connected} />
                </ChatHeader>
                <Divider />
                <ChatContent handleRemove={handleRemove} room={room} Messages={Messages} />
                <Divider />
                {
                    room ?
                        null
                        :
                        <ChatAction loading={loading} setLoading={setLoading} connected={connected} handleSendMsg={handleSendMsg} />
                }
            </ChatContainer>
        </Paper>
    )
}
