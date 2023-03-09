import React from 'react';
import { connect } from "react-redux";
import MyMessage from './MyMessage';
import OthersMessage from './OthersMessage';


function SingleMessage({ message, system, room, handleRemove }) {
    const { username, } = message;
    const role = system?.user?.roles[0]?.role || undefined;

    if (username === system.user.username && !room) {
        return <MyMessage role={role} room={room} handleRemove={handleRemove} message={message} />
    } else {
        return <OthersMessage role={role} room={room} handleRemove={handleRemove} message={message} />
    }
}


const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(SingleMessage)