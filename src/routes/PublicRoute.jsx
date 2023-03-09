import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from "react-redux";

const PublicRoute = (props) => {
    const { loggedIn } = props.system;

    return loggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
}

const mapStateToProps = (state) => ({
    system: state.system,
});

export default connect(mapStateToProps)(PublicRoute)