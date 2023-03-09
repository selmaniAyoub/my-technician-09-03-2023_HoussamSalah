import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import UpperSection from '../../Public/SingleTechnicianPage/UpperSection';
import AdminNotFound from '../AdminNotFound/AdminNotFound';


const Container = styled('div')`
    padding: 24px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    }  
`

const Main = styled('div')`
    width: 100%;
    margin: 0 auto;
    border-radius: 10px;
    max-width: 1260px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 900px){
        width: 90%;
    }
    @media only screen and (max-width: 400px){
        width: 98%;
    }
`

const LoadingContainer = styled('div')`
    display: flex;
    min-height: 500px;
    align-items: center;
    justify-content: center;
`

class SingleClient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            loading: true
        }
    }

    async componentDidMount() {
        try {
            const { clientId } = this.props;
            if (clientId) {
                this.setState({ loading: true })
                const { data } = await axios.get(`http://192.168.1.113:5000/search/user/${clientId}`);
                if (data && typeof data === "object") {
                    this.setState({
                        user: data
                    })
                }
            }
            this.setState({ loading: false })
        } catch (err) {
            console.log(err);
            console.log(err.response.data);
            this.setState({ loading: false });
        }
    }

    render() {
        const { loading, user } = this.state;

        if (!loading && !user) {
            return <AdminNotFound />
        }

        return (
            <Container>
                {
                    loading ?
                        <LoadingContainer>
                            <CircularProgress />
                        </LoadingContainer>
                        :
                        <Main>
                            <UpperSection user={user} />
                        </Main>
                }
            </Container>
        );
    }
}

export default SingleClient;
