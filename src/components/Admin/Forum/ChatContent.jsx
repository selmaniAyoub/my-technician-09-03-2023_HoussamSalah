import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import SingleMessage from './SingleMessage';


const ChatContentContainer = styled('div')`
    display: flex;
    flex-grow: 1;
    height: 100%;
`

const MessageContainer = styled('div')`
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
`


export default function ChatContent({ Messages, room, handleRemove }) {
    const myRef = useRef(null)

    const scrollToBottom = () => {
        myRef.current.scrollTop = myRef.current.scrollHeight;
    }

    useEffect(() => {
        scrollToBottom()
    }, [Messages])

    return (
        <ChatContentContainer style={{ maxHeight: room ? "72vh" : "50vh" }}>
            <MessageContainer ref={myRef}>
                {
                    Messages.map((m, i) => {
                        return <SingleMessage handleRemove={handleRemove} room={room} message={m} key={i} />
                    })
                }
            </MessageContainer>
        </ChatContentContainer>
    )
}
