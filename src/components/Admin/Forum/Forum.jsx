import {React,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import MembersSide from './MembersSide';
import ChatSide from './ChatSide';
import { connect } from "react-redux";


const StyledCotnainer = styled("div")`
    display: flex;
    width: 100%;
    overflow: hidden;
    @media only screen and (max-width: 900px){
        flex-direction: column-reverse;
    }
    padding: 24px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    }  
`

const MembersSideContainer = styled("div")`
    display: flex;
    width: 25%;
    margin: 0 20px 0 0;
    min-width: 300px;
    max-width: 350px;
    @media only screen and (max-width: 900px){
        width: 100%;
        max-width: 100%;
        margin-top: 30px;
    }
`

const ChatContainer = styled("div")`
    display: flex;
    width: 70%;
    min-height: 84vh;
    @media only screen and (max-width: 900px){
        width: 100%;
        max-width: 100%;
    }
`

const getUserName = ({ user }) => {
    if (user?.roles[0]?.role === "pharmacie") {
        return user.name
    }

    return `${user.firstName} ${user.lastName}`
}

function Forum({ sendMessage, connected, messages, system, setLoading, loading, room, handleRemove }) {
    useEffect(() => {
        console.log("forum =",{ sendMessage, connected, messages, system, setLoading, loading, room, handleRemove })
      }, [])
      
    const userPsudoName = getUserName(system);
    const date = new Date().toISOString();
    const handleSendMsg = ({ message, photoUrls, type }) => {
        let NewMsg = {
            sender: userPsudoName,
            content: message || "",
            time: date,
            type: type,
            images: photoUrls || [],
            files: [],
            username: system.user.username
        }

        sendMessage(NewMsg)
    }

    return (
        <StyledCotnainer>
            <MembersSideContainer>
                <MembersSide room={room} />
            </MembersSideContainer>
            <ChatContainer>
                <ChatSide handleRemove={handleRemove} room={room} loading={loading} setLoading={setLoading} connected={connected} handleSendMsg={handleSendMsg} Messages={messages} />
            </ChatContainer>
        </StyledCotnainer>
    )
}

const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(Forum)