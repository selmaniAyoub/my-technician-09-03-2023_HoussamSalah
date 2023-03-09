import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import SensorsIcon from '@mui/icons-material/Sensors';
import MedicalTeam from '../../../assets/medical-team.png';
import Users from '../../../assets/profile.png';
import MedicalAppointment from '../../../assets/medical-appointment.png';
import BarChart from './BarChart';
import LineChart from './LineChart';
import TopDocTable from './TopDocTable';
import PieChart from './PieChart';
import UsersPieChart from './UsersPieChart';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';



const Container = styled('div')`
    margin-top: 20px;
    padding: 24px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    }
`

const Header = styled(Typography)`
    font-size: 34px;
    font-weight: bold;
    margin-bottom: 20px;
`

const OverView = styled('div')`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @media only screen and (max-width: 530px){
        flex-direction: column;
        align-items: center;
    }
`

const Card = styled(Paper)`
    display: flex;
    flex-direction: row;
    padding: 16px;
    margin: 10px;
    justify-content: center;
    align-items: center;
    width: 20%;
    max-width: 320px;
    flex-wrap: wrap;
    min-width: 200px;
    @media only screen and (max-width: 530px){
        width: 100%;
        max-width: 300px;
        margin: 10px 0;
    }
`

const ContentValue = styled('div')`
    display: flex;
    width: 70%;
    flex-direction: column;
    justify-content: center;
    padding: 8px;
    @media only screen and (max-width: 530px){
        width: 100%;
    }
`

const ContentIcon = styled('div')`
    display: flex;
    justify-content: center;
    width: 30%;
    min-width: 70px;
    @media only screen and (max-width: 530px){
        width: 100%;
    }
`

const StatisticTitle = styled(Typography)`
    font-size: 16px;
    text-align: center;
    font-weight: 600;
    color: #555;
`

const StatisticValue = styled(Typography)`
    font-size: 28px;
    text-align: center;
    font-weight: bold;
`

const IconImg = styled('img')`
    width: 80px;
    height: 80px;
`

const ChartsContainer = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: start;
    margin-top: 50px;
    max-width: 1600px;
    @media only screen and (max-width: 1025px){
        flex-direction: column;
        align-items: center;
    }
    @media only screen and (max-width: 900px){
        margin-top: 30px;
        justify-content: center;
    }
    @media only screen and (max-width: 530px){
        margin-top: 20px;
    }
`

const StatisticCard = styled(Paper)`
    padding: 16px;
    margin: 10px;
    width: 45%;
    @media only screen and (max-width: 1025px){
        width: 100%;
    }
    overflow: auto;
`

const TableCard = styled('div')`
    margin: 10px;
    width: 45%;
    @media only screen and (max-width: 1025px){
        width: 100%;
    }
`

const PieCard = styled(Paper)`
    padding: 16px;
    width: 48%;
    min-width: 250px;
    @media only screen and (max-width: 600px){
        width: 100%;
        max-width: 300px;
        margin: 10px 0;
    }
`

const PiesContainer = styled('div')`
    display: flex;
    flex-direction: raw;
    width: 45%;
    margin-left: 10px;
    margin-top: 10px;
    justify-content: space-between;
    @media only screen and (max-width: 1025px){
        width: 100%;
        margin-left: 0;
    }
    @media only screen and (max-width: 600px){
        flex-direction: column;
        align-items: center;
    }
`

const CardTitle = styled(Typography)`
    font-size: 18px;
    margin-top: 10px;
    text-align: center;
`

const LoadingContainer = styled('div')`
    display: flex;
    height: 80vh;
    min-height: 500px;
    align-items: center;
    justify-content: center;
`

const IconStyles = {
    width: 80,
    height: 80,
    color: "#1976d2"
}

const getTopDoc = ({ data }) => {
    const d = [];

    if (data.topDentiste) {
        data.topDentiste.category = "Dentistes"
        d.push(data.topDentiste)
    }

    if (data.topKine) {
        data.topKine.category = "Kinés"
        d.push(data.topKine)
    }

    if (data.topMedecin) {
        data.topMedecin.category = "Médecins"
        d.push(data.topMedecin)
    }

    if (data.topPharmacie) {
        data.topPharmacie.category = "Pharmacies"
        d.push(data.topPharmacie)
    }

    if (data.topPsychologue) {
        data.topPsychologue.category = "Psychologues"
        d.push(data.topPsychologue)
    }

    if (data.topVeterinaire) {
        data.topVeterinaire.category = "Vétérinaires"
        d.push(data.topVeterinaire)
    }

    return d;
}


const getRendevousStats = ({ data }) => {
    const d = [];

    if (data) {
        d.push(data.nbConfirmedRdv)
        d.push(data.nbPendingRdv)
        d.push(data.nbRefusedRdv)
    }

    return d;
}

const getUsersStats = ({ data }) => {
    const d = [];

    if (data) {
        d.push(data.nbMedecin)
        d.push(data.nbPsychologue)
        d.push(data.nbVeterinaire)
        d.push(data.nbDentiste)
        d.push(data.nbPharmacie)
        d.push(data.nbKine)
    }

    return d;
}

class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            loading: true
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true })
            const { data } = await axios.get("http://192.168.1.113:5000/stats/info")

            if (data) {
                this.setState({ data: data, loading: false })
            }

        } catch (err) {
            this.setState({ loading: false })
            console.log(err)
        }
    }


    render() {
        const { data, loading } = this.state;

        if (loading) {
            return (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            )
        }

        const topDoc = getTopDoc({ data });
        const pieRendezvous = getRendevousStats({ data });
        const pieUsers = getUsersStats({ data });

        return (
            <Container>
                <Header>Tableau de bord</Header>
                <OverView>
                    <Card>
                        <ContentIcon>
                            <IconImg src={MedicalTeam} />
                        </ContentIcon>
                        <ContentValue>
                            <StatisticValue>{data.nbPraticiens}</StatisticValue>
                            <StatisticTitle>Nombre praticiens</StatisticTitle>
                        </ContentValue>
                    </Card>
                    <Card>
                        <ContentIcon>
                            <IconImg src={Users} />
                        </ContentIcon>
                        <ContentValue>
                            <StatisticValue>{data.nbClients}</StatisticValue>
                            <StatisticTitle>Nombre clients</StatisticTitle>
                        </ContentValue>
                    </Card>
                    <Card>
                        <ContentIcon>
                            <SensorsIcon style={IconStyles} />
                        </ContentIcon>
                        <ContentValue>
                            <StatisticValue>{data.nbOnlineUsers}</StatisticValue>
                            <StatisticTitle>Utilisateurs en ligne</StatisticTitle>
                        </ContentValue>
                    </Card>
                    <Card>
                        <ContentIcon>
                            <IconImg src={MedicalAppointment} />
                        </ContentIcon>
                        <ContentValue>
                            <StatisticValue>{data.nbTotalRdv}</StatisticValue>
                            <StatisticTitle>Nombre de rendez-vous</StatisticTitle>
                        </ContentValue>
                    </Card>
                </OverView>
                <ChartsContainer>
                    <StatisticCard>
                        <div style={{ minWidth: 400 }}>
                            <BarChart d={data.newClients} />
                        </div>
                    </StatisticCard>
                    <StatisticCard>
                        <div style={{ minWidth: 400 }}>
                            <LineChart d={data.newRdv} />
                        </div>
                    </StatisticCard>
                </ChartsContainer>
                <ChartsContainer>
                    <TableCard>
                        <TopDocTable technicians={topDoc} />
                    </TableCard>
                    <PiesContainer>
                        <PieCard>
                            <PieChart d={pieRendezvous} />
                            <CardTitle variant="body1">Rendez-vous</CardTitle>
                        </PieCard>
                        <PieCard style={{ marginRight: 0 }}>
                            <UsersPieChart d={pieUsers} />
                            <CardTitle variant="body1">Professionnel de la santé</CardTitle>
                        </PieCard>
                    </PiesContainer>
                </ChartsContainer>
            </Container>
        );
    }
}

export default AdminDashboard