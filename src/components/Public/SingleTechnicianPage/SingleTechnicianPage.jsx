import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import UpperSection from './UpperSection';
import AppointmentSection from './AppointmentSection'
import DescriptionSection from './DescriptionSection';
import ExperienceSection from './ExperienceSection';
import DiplomesSection from './DiplomesSection';
import CertificationSection from './CertificationSection';
import ConsultationSection from './ConsultationSection';
import PhotosCabinet from './PhotosCabinet';

import NotFound from '../../NotFound/NotFound';


const BgPage = styled('div')`
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
`

const MainContainer = styled('div')`
    margin-top: 100px;
    margin-bottom: 100px;
    @media only screen and (max-width: 900px){
        margin-top: 50px;
        margin-bottom: 50px;
    } 
`

const Main = styled('div')`
    width: 70%;
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

class SingleTechnicianPage extends Component {
    constructor(props) {
        console.log("props= ",props)
        super(props)
        this.state = {
            bookingDate: new Date(),
            selectedTimeSlot: null,
            user: null,
            orderSessions: [],
            message: "",
            subject: "",
            disable: false,
            loading: true
        }
    }

    async componentDidMount() {
        try {
            const { docId } = this.props;

            if (docId) {
                this.setState({ loading: true })

                const { data } = await axios.get(`http://192.168.1.113:5000/search/user/${docId}`);
console.log("data55555",data)
                if (data && typeof data === "object") {
                    this.setState({
                        user: data
                    })
                }
                this.setState({ loading: false })
            }
        } catch (err) {
            console.log(err);
            console.log(err.response.data);
            this.setState({ loading: false });
        }
    }

    render() {
        const { loading, user } = this.state;
        const { docId } = this.props;

        if ((!user && !loading) || !docId) {
            return <NotFound />
        }

        return (
            <BgPage>
                <MainContainer>
                    <Main>
                        {
                            loading ?
                                <LoadingContainer>
                                    <CircularProgress />
                                </LoadingContainer>
                                :
                                <>
                                     <UpperSection user={user} /><br/>                       
                          
                                    <DescriptionSection user={user} />
                                    <ExperienceSection user={user} />
                                    <DiplomesSection user={user} />
                                    <CertificationSection user={user} />
                                              <ConsultationSection user={user} system={this.props.system} docId={this.props.docId} />
                           
                                </>
                        }
                    </Main>
                </MainContainer>
            </BgPage>
        )
    }
}

const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(SingleTechnicianPage);