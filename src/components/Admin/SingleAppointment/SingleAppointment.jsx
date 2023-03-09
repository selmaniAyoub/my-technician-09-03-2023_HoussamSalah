import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AdminNotFound from '../AdminNotFound/AdminNotFound';
import { connect } from "react-redux";

const Container = styled('div')`
    width: 100%;
    height: 100%;
    margin-top: 20px;
    padding: 24px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    }
`
const LoadingContainer = styled('div')`
    display: flex;
    height: 80vh;
    min-height: 500px;
    align-items: center;
    justify-content: center;
`
const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    width: 90%;
    padding: 1em;
    margin: auto;
    max-width: 1200px;
    min-width: 400px;
    @media only screen and (max-width: 1025px){
        min-width: 250px;
        overflow: hidden;
    }
`
const Row = styled('div')`
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    @media only screen and (max-width: 1025px){
        flex-direction: column;
    }
`
const RowItem = styled('div')`
    display: flex;
    flex-direction: row;
    width: 45%;
    justify-content: start;
    min-width: 300px;
    margin: 15px 20px;
    border-bottom: 1px solid #ddd;
    padding: 10px 5px;
    @media only screen and (max-width: 1025px){
        width: auto;
    }
    @media only screen and (max-width: 500px){
        flex-direction: column;
        margin: 10px 0;
    }
`
const LabelTile = styled(Typography)`
    font-size: 20px;
    margin: 10px auto 30px auto;
    font-weight: bold;
`
const Label = styled(Typography)`
    font-size: 18px;
    margin: 0 5px;
    font-weight: bold;
    min-width: 130px;
    @media only screen and (max-width: 500px){
        margin: 5px 0;
    }
`
const LabelValue = styled(Typography)`
    font-size: 16px;
    margin: 0;
    word-break: break-word;
    margin: 0 0 5px 0;
    @media only screen and (max-width: 500px){
        margin: 0;
    }
`
function SingleAppointment({ appointmentId, system }) {
    const [loading, setLoading] = useState(false);
    const [appointment, setAppointment] = useState(false);
    const [clientId, setClientId] = useState("");
    const [personnelId, setPersonnelId] = useState("");
    const [clientData, setClientData] = useState("");
    const [personnelData, setPersonnelData] = useState("");
    const { roles } = system.user;
    // console.log("user conected : ",system.user);
    // console.log("roles: ",roles);  console.log("role ",roles[0].role )

    useEffect(() => {
       console.log("role ",roles[0].role )
            if (appointmentId) {
                console.log("AppointmentId: ", appointmentId) 
                   setLoading(true)
                     axios.get(`http://192.168.1.113:5000/rendezvous/single/${appointmentId}`)
                       .then((res) => {
                           if (res.data) {
                               console.log("data appointment :", res.data);
                               setClientId(res.data.clientId)
                               setPersonnelId(res.data.personnelId)
                               setAppointment(res.data)
                            //  console.log("res.data.clientId : ",res.data.clientId ,"res.data.personnelId : ",res.data.personnelId)
                               
                           }
                           setLoading(false)
                       })
                       .catch(err => {
                           console.log(err.message)
                           setLoading(false)
                       })

                       if(roles[0].role !== "client"){                 
                            console.log("appointment.clientId : ",clientId);
                             axios
                                .get(`http://192.168.1.113:5000/admin/single/client/${clientId}`)
                                .then((res) => {
                                    console.log("Client Data: ", res.data);
                                    setClientData(res.data)				
                                    setLoading(false);
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                    setLoading(false);
                                });
                       } else {  
                            console.log("appointment.personnelId : ",personnelId);
                              axios
                              .get(`http://192.168.1.113:5000/admin/single/personnel/${personnelId}`)
                              .then((res) => {
                               console.log("Personnel Data: ", res.data);	
                               setPersonnelData(res.data)			
                               setLoading(false);
                               })
                              .catch((err) => {
                               console.log(err.message);
                               setLoading(false);
                           }); 
                       
                        }
            }
    }, [appointmentId, clientId, personnelId, roles])

    if (loading) {
        return (
            <LoadingContainer>
                <CircularProgress />
            </LoadingContainer>
        )
    }

    if (!loading && !appointment) {
        return (<AdminNotFound />)
    }

    return (
        <Container>
            <StyledPaper>
                <LabelTile color="primary" variant="h4">Rendez-vous</LabelTile>
                <Row>
                    <RowItem>
                        <Label variant="body1">Ref :</Label>
                        <LabelValue variant="body2">#{appointment.id}</LabelValue>
                    </RowItem>
                    <RowItem>
                        <Label variant="body1">Statut :</Label>
                        <LabelValue variant="body1">{appointment.status}</LabelValue>
                    </RowItem>
                </Row>
                <Row>
                    <RowItem>
                        <Label variant="body1">Date de début :</Label>
                        <LabelValue variant="body2">{appointment.startDate}</LabelValue>
                    </RowItem>
                    <RowItem>
                        <Label variant="body1">Date de fin :</Label>
                        <LabelValue variant="body2">{appointment.endDate}</LabelValue>
                    </RowItem>
                </Row>
                <Row>
                    <RowItem>
                        <Label variant="body1">Sujet :</Label>
                        <LabelValue variant="body2">{appointment.subject}</LabelValue>
                    </RowItem>
                    <RowItem>
                        <Label variant="body1">Message :</Label>
                        <LabelValue variant="body2">{appointment.text}</LabelValue>
                    </RowItem>
                </Row>
                {                
                    roles[0].role !== "client" ?
                        <>
                            <Row>
                                <RowItem>
                                    <Label variant="body1">Client :</Label>
                                    <LabelValue variant="body2">{clientData.firstName} {clientData.lastName}</LabelValue>
                                </RowItem>
                                <RowItem>
                                    <Label variant="body1">Numéro de téléphone :</Label>
                                    <LabelValue variant="body2">{clientData.phoneNumber}</LabelValue>
                                </RowItem>
                            </Row>
                            <Row>
                                <RowItem>
                                    <Label variant="body1">Ville :</Label>
                                    <LabelValue variant="body2">{clientData.ville}</LabelValue>
                                </RowItem>
                                <RowItem>
                                    <Label variant="body1">Adresse :</Label>
                                    <LabelValue variant="body2">{clientData.address}</LabelValue>
                                </RowItem>
                            </Row>
                            <Row>
                                <RowItem>
                                    <Label variant="body1">Code postal :</Label>
                                    <LabelValue variant="body2">{clientData.postalCode}</LabelValue>
                                </RowItem>
                                <RowItem>
                                    <Label variant="body1">E-mail :</Label>
                                    <LabelValue variant="body2">{clientData.email}</LabelValue>
                                </RowItem>
                            </Row>
                        </>
                        :
                        <>
                            <Row>
                                <RowItem>
                                    <Label variant="body1">Praticien :</Label>
                                    <LabelValue variant="body2">{personnelData.firstName} {personnelData.lastName}</LabelValue>
                                </RowItem>
                                <RowItem>
                                    <Label variant="body1">Numéro de téléphone :</Label>
                                    <LabelValue variant="body2">{personnelData.phoneNumber}</LabelValue>
                                </RowItem>
                            </Row>
                            <Row>
                                <RowItem>
                                    <Label variant="body1">Ville :</Label>
                                    <LabelValue variant="body2">{personnelData.ville}</LabelValue>
                                </RowItem>
                                <RowItem>
                                    <Label variant="body1">Adresse :</Label>
                                    <LabelValue variant="body2">{personnelData.address}</LabelValue>
                                </RowItem>
                            </Row>
                            <Row>
                                <RowItem>
                                    <Label variant="body1">Code postal :</Label>
                                    <LabelValue variant="body2">{personnelData.postalCode}</LabelValue>
                                </RowItem>
                                <RowItem>
                                    <Label variant="body1">E-mail :</Label>
                                    <LabelValue variant="body2">{personnelData.email}</LabelValue>
                                </RowItem>
                            </Row>
                        </>
                }
            </StyledPaper>
        </Container>
    )
}


const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(SingleAppointment)