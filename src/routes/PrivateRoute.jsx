import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from "react-redux";

const PrivateRoute = (props) => {
    const { loggedIn } = props.system;

    return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

const mapStateToProps = (state) => ({
    system: state.system,
});

export default connect(mapStateToProps)(PrivateRoute)
