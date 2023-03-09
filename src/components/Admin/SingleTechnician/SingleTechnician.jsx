import React, { Component } from 'react';
import { connect } from "react-redux";
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import UpperSection from '../../Public/SingleTechnicianPage/UpperSection';
import DescriptionSection from '../../Public/SingleTechnicianPage/DescriptionSection';
import ExperienceSection from '../../Public/SingleTechnicianPage/ExperienceSection';
import DiplomesSection from '../../Public/SingleTechnicianPage/DiplomesSection';
import CertificationSection from '../../Public/SingleTechnicianPage/CertificationSection';
import PhotosCabinet from '../../Public/SingleTechnicianPage/PhotosCabinet';
import ConsultationSection from '../../Public/SingleTechnicianPage/ConsultationSection';
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

class SingleTechnician extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            loading: true
        }
    }

    async componentDidMount() {
        try {
            const { praticienId } = this.props;

            if (praticienId) {
                this.setState({ loading: true })
                const { data } = await axios.get(`http://192.168.1.113:5000/search/user/${praticienId}/`);
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

        if ((!loading && !user) || user?.roles[0]?.role === "client") {
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
                            <ConsultationSection user={user} system={this.props.system} docId={this.props.praticienId} />
                            <DescriptionSection user={user} />
                            <ExperienceSection user={user} />
                            <DiplomesSection user={user} />
                            <CertificationSection user={user} />
                            <PhotosCabinet user={user} />
                        </Main>
                }
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(SingleTechnician);