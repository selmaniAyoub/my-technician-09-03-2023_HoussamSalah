import React, { Component } from 'react';
import UsersTable from './UsersTable';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';


const LoadingContainer = styled('div')`
    display: flex;
    height: 80vh;
    min-height: 500px;
    align-items: center;
    justify-content: center;
`

const Container = styled('div')`
    margin-top: 20px;
    padding: 24px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    }
`

export default class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            loading: true
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true })
            const { data } = await axios.get("https://api.my-health-network.be/search/clients")
            if (data && typeof data !== "string") {
                this.setState({ users: data })
            }
            this.setState({ loading: false })
        } catch (err) {
            this.setState({ loading: false })
            console.log(err)
        }
    }

    handleRemove = (user) => {
        const { users } = this.state;
        const newArr = users.filter(e => e.id !== user.id);
        this.setState({ users: newArr });
    }

    handleBan = (user) => {
        const { users } = this.state;
        const newArr = users.map((d) => {
            if (user.id === d.id) {
                d.banned = true;
            }
            return d;
        });

        this.setState({ users: newArr });
    }

    handleUnban = (user) => {
        const { users } = this.state;
        const newArr = users.map((d) => {
            if (user.id === d.id) {
                d.banned = false;
            }
            return d;
        });

        this.setState({ users: newArr });
    }

    render() {
        const { users, loading } = this.state;

        if (loading) {
            return (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            )
        }

        return (
            <Container>
                <UsersTable handleUnban={this.handleUnban} handleBan={this.handleBan} handleRemoveUser={this.handleRemove} users={users} />
            </Container>
        );
    }
}


