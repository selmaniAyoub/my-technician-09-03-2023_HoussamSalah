import React ,{ useState } from 'react'
import { Popup, DatePicker } from 'react-date-time-picker-popup'
import 'react-date-time-picker-popup/dist/index.css'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PushPinIcon from '@mui/icons-material/PushPin';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NavLink } from 'react-router-dom';
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { translate } from 'react-i18next';
import { compose } from "recompose";
//images

//images
import TechnicianImg from '../../../assets/carpenter.png';
import PlumberImg from '../../../assets/plumber.png';
import welderImg from '../../../assets/welder.png';
import ElectricianImg from '../../../assets/electrician.png';
import OrchardImg from '../../../assets/orchard.png';
import BrickworkImg from '../../../assets/brickwork.png';
import SurveyorsImg from '../../../assets/surveyors.jpg';
import  VentilationImg from '../../../assets/ventilation.jpg';
import PeintreImg from '../../../assets/peintre.png';
import EntretienImg from '../../../assets/entretien.png';
import LockImg from '../../../assets/locksmith.png';

const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    padding: 1em 0.5em;
    border-radius: 8px;
    height: 100%;
    justify-content: space-between;
    @media only screen and (max-width: 1210px){
        padding: 1em 0.5em;
    }
    @media only screen and (max-width: 900px){
        padding: 1em;
    } 
    @media only screen and (max-width: 900px){
        max-width: 400px;
        margin: 0 auto;
    }  
`

const ImgContainer = styled('div')`
    width: 45%;
`

const UpperSection = styled('div')`
    display: flex;
    flex-direction: row;
`

const TechnicianText = styled('div')`
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    width: 55%;
    align-items: flex-start;
    margin-top: 10px;
    @media only screen and (max-width: 1210px){
        width: 70%;
    }
    @media only screen and (max-width: 900px){
        width: 55%;
    }  
`

const TechnicianName = styled('p')`
    font-size: 19px;
    font-weight: bold;
    text-transform: capitalize;
    color: #0066dd;
    margin: 10px 0 0 0;
`

const MidSection = styled('div')`
    display: flex;
    flex-direction: columns;
    padding-right: 5px;
`

const StyledListItemText = styled(ListItemText)`
    .MuiTypography-root{
        font-size: 14px !important;
    }
`

const VuesListItemText = styled(ListItemText)`
    .MuiTypography-root{
        font-size: 14px !important;
        color: #bebebe
    }
`

const ActionSection = styled('div')`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    border-top: 1px solid #dddddd;
    padding-top: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
`

const Img = styled('img')`
    width: 100%;
    max-width: 150px;
    align-self: center;
    padding-right: 5px;
`

const SpeciSpecialtyText = styled('p')`
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    text-transform: capitalize;
    margin: 5px 0;
    color: #424242;
    word-break: break-word;
`

const RenderImg = ({ data }) => {
    const { role } = data;
    if (role === "Carpenters") {
        return (
            <Img src={TechnicianImg} />
        )
    }

    if (role  === "Electricians") {
        return (
            <Img src={ElectricianImg} />
        )
    }

    if (role === "landscapers") {
        return (
            <Img src={OrchardImg} />
        )
    }

    if (role  === "bricklayers") {
        return (
            <Img src={BrickworkImg} />
        )
    }
    if (data.label === "serrurier") {
        return (
            <Img src={LockImg} />
        )
    }

    if (data.label === "ventilation") {
        return (
            <Img src={EntretienImg} />
        )
    }
    if (data.label === "peintre") {
        return (
            <Img src={PeintreImg} />
        )
    }
    return null;
}


const RenderSpecialty = ({ data }) => {
    const { role } = data;

    if (role === "medecin") {
        return (
            <SpeciSpecialtyText>{data.speciality || "Médecin"}</SpeciSpecialtyText>
        )
    }

    if (role === "kine") {
        return (
            <SpeciSpecialtyText>{data.speciality || "kiné"}</SpeciSpecialtyText>
        )
    }

    if (role === "dentiste") {
        return (
            <SpeciSpecialtyText>{data.speciality || "Dentiste"}</SpeciSpecialtyText>
        )
    }

    if (role === "psychologue") {
        return (
            <SpeciSpecialtyText>{data.speciality || "Psychologues"}</SpeciSpecialtyText>
        )
    }

    if (role === "veterinaire") {
        return (
            <SpeciSpecialtyText>{data.speciality || "Vétérinaires"}</SpeciSpecialtyText>
        )
    }
    return null;
}
 function SingleTechnician({ data, t }) {
    const [visible, setVisible] = useState(false);
    const [day, setDay] = useState(new Date());
    return (
        <Grid item xs={4} sm={4} md={4} lg={3}>
            <StyledCard elevation={2}>
                <UpperSection>
                    <ImgContainer>
                        <RenderImg data={data} />
                    </ImgContainer>
                    <TechnicianText>
                        <TechnicianName>{`${data.lastName} ${data.firstName}`}</TechnicianName>
                        <RenderSpecialty data={data} />
                    </TechnicianText>
                </UpperSection>

                <MidSection>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon style={{ minWidth: 40 }}>
                                <PushPinIcon style={{ color: "#58a5ff" }} />
                            </ListItemIcon>
                            <StyledListItemText>
                                {data.address}
                            </StyledListItemText>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemIcon style={{ minWidth: 40 }}>
                                <PhoneIcon style={{ color: "#58a5ff" }} />
                            </ListItemIcon>
                            <StyledListItemText>
                                {data.phoneNumber}
                            </StyledListItemText>
                        </ListItem>

                    </List>
                </MidSection>

                <ActionSection>
                    <ListItem style={{ width: '25%', marginRight: 10 }} disablePadding>
                        <ListItemIcon style={{ minWidth: 40 }}>
                            <VisibilityIcon style={{ color: "#bebebe" }} />
                        </ListItemIcon>
                        <VuesListItemText>
                            {data.nbViews}
                        </VuesListItemText>
                    </ListItem>
                    
                    <Button onClick={() => setVisible(true)}
    style={{
        minWidth: 100,
        fontSize: 13,
        margin: "5px 0",
        borderRadius: 100,
        boxShadow: "none",
        fontWeight: 600,
        background:"#1976d2",
        
    }}
    variant="contained"
    >{t('Prendre un Rendez-vous')}</Button>
    <Popup visible={visible} setVisible={setVisible} >
      <DatePicker lang="An" selectedDay={day} setSelectedDay={setDay} timeSelector={true} BGColor="#353131"
      />
      <Button onClick={() => setVisible(true)}
    style={{
        minWidth: 100,
        fontSize: 13,
        margin: "5px 0",
        borderRadius: 100,
        boxShadow: "none",
        fontWeight: 600,
        background:"#1976d2",
        
    }}
    variant="contained"
    >
{t('Valider')}    </Button>
    </Popup>

                    
                </ActionSection>
            </StyledCard>
        </Grid>
    )
}
export default compose (withNamespaces())(SingleTechnician);

