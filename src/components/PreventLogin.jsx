import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";


const SafeRoute = (props) => {
    const { loggedIn, Component, redirectTo } = props;

    if (!loggedIn) {
        return <Component />;
    }
    else {
        return <Navigate to={{ pathname: redirectTo, state: { from: "/" } }} />;
    }
}


class PreventLogin extends Component {
    render() {
        const { system, Component, location, redirectTo } = this.props;
        const { loggedIn, verified } = system;

        return (
            <SafeRoute verified={verified} loggedIn={loggedIn} Component={Component} location={location} redirectTo={redirectTo} />
        )
    }
}

const mapStateToProps = (state) => ({
    system: state.system,
});

export default connect(mapStateToProps)(PreventLogin)


