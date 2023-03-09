import React from 'react';
import { connect } from "react-redux";
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';


function Dashboard(props) {
    if (props.system.user) {
        const role = props.system.user?.roles[0]?.role;

        if (!role) {
            return null
        }

        if (role === "admin") {
            return (
                <AdminDashboard />
            )
        }

        return (
            <UserDashboard user={props.system.user} />
        )
    }

    return null
}

const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(Dashboard);



