import React, { Component } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import MyClientsTable from './MyClientsTable';


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

export default class MyClients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            loading: true
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true })
            const { data } = await axios.get("http://192.168.1.113:5000/users/myclients")
            if (data) {
                this.setState({ clients: data })
            }
            this.setState({ loading: false })
        } catch (err) {
            this.setState({ loading: false })
            console.log(err)
        }
    }

    render() {
        const { clients, loading } = this.state;

        if (loading) {
            return (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            )
        }

        return (
            <Container>
                <MyClientsTable clients={clients} />
            </Container>
        );
    }
}


