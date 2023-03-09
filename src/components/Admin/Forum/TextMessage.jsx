import React from 'react'
import { styled } from '@mui/material/styles';


const MyMsgContent = styled('div')`
    display: flex;
    padding: 0.6em 1.5em;
    background-color: #1976d2;
    color: #fff;
    border-radius: 2em;
    word-break: break-word;
    margin: 0 0 0 auto;
`

const OthersMsgContent = styled('div')`
    display: flex;
    padding: 0.6em 1.5em;
    background-color: #f1f1f1;
    color: #222;
    border-radius: 2em;
    word-break: break-word;
    margin: 0 auto 0 0;
`

export default function TextMessage({ owner, content }) {

    if (owner === "me") {
        return (
            <MyMsgContent>
                {content}
            </MyMsgContent>
        )
    } else {
        return (
            <OthersMsgContent>
                {content}
            </OthersMsgContent>
        )
    }

}
