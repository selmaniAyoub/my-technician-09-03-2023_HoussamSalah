import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from "react-redux";

const PrivateAdminRoute = (props) => {
    const { user } = props.system;
    const role =user?.roles[0]?.role;

    return role === "admin" ? <Outlet /> : <Navigate to="/dashboard" />;
}

const mapStateToProps = (state) => ({
    system: state.system,
});

export default connect(mapStateToProps)(PrivateAdminRoute)