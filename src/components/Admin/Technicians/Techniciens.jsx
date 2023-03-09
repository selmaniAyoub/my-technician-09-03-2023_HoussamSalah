import React, { Component } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import TechniciansTable from './TechniciansTable';
import TechniciensTable from './TechniciensTable';


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

export default class Technicians extends Component {
    constructor(props) {
        super(props)
        this.state = {
            technicians: [],
            loading: true
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true })
            const { data } = await axios.get("http://192.168.1.113:5000/auth/notconfirmed")
            if (data && typeof data !== "string") {

                this.setState({ technicians: data })
            }
            this.setState({ loading: false })
        } catch (err) {
            this.setState({ loading: false })
            console.log(err)
        }
    }

    handleRemove = (user) => {
        const { technicians } = this.state;
        const newArr = technicians.filter(e => e.id !== user.id);
        this.setState({ technicians: newArr });
    }
    handleConfirm = (user) => {
        const { technicians } = this.state;
        const newArr = technicians.filter(e => e.confirmationToken !== user.confirmationToken);
        this.setState({ technicians: newArr });
    }

    handleBan = (user) => {
        const { technicians } = this.state;
        const newArr = technicians.map((d) => {
            if (user.id === d.id) {
                d.banned = true;
            }
            return d;
        });


        this.setState({ technicians: newArr });
    }

    handleUnban = (user) => {
        const { technicians } = this.state;
        const newArr = technicians.map((d) => {
            if (user.id === d.id) {
                d.banned = false;
            }
            return d;
        });


        this.setState({ technicians: newArr });
    }

    render() {
        const { technicians, loading } = this.state;

        if (loading) {
            return (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            )
        }

        return (
            <Container>
                <TechniciensTable handleUnban={this.handleUnban} handleBan={this.handleBan} handleRemoveUser={this.handleRemove} technicians={technicians} handleConfirme={this.handleConfirm} />
            </Container>
        );
    }
}


