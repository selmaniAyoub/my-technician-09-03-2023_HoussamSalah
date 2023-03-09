import React from 'react'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PushPinIcon from '@mui/icons-material/PushPin';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TechnicianImg from '../../../assets/carpenter.png';
import PlumberImg from '../../../assets/plumber.png';
import welderImg from '../../../assets/welder.png';
import ElectricianImg from '../../../assets/electrician.png';
import OrchardImg from '../../../assets/orchard.png';
import BrickworkImg from '../../../assets/brickwork.png';
import { NavLink } from 'react-router-dom'
import HomeLayout from './../../../layouts/HomeLayout';

import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { translate } from 'react-i18next';
import { compose } from "recompose";
//images
import TechnicianThumbnail from '../../../assets/doctor-thumbnail.png'
import TechnicianFemaleThumbnail from '../../../assets/doctor-female-thumbnail.png'
import VeterinaryThumbnail from '../../../assets/veterinary-thumbnail.png'
import PsychologistThumbnail from '../../../assets/psychologist-thumbnail.png'
import DentistThumbnail from '../../../assets/dentist-thumbnail.png'
import PharmacieThumbnail from '../../../assets/pharmacies-image.png'
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

const SpeciSpecialtyText = styled('p')`
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.3px;
    text-transform: capitalize;
    margin: 5px 0;
    color: #424242;
    word-break: break-word;
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
        color: #bebebe;

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

const ImgContainer = styled('div')`
    width: 45%;
`

const Img = styled('img')`
    width: 100%;
    max-width: 150px;
    align-self: center;
    padding-right: 5px;
`

const RenderImg = ({ data }) => {
    const { role } = data.roles[0];

    if (role === "Carpenters") {
        return (
            <Img src={TechnicianImg} />
        )
    }

    if (role === "plombier") {
        return (
            <Img src={PlumberImg} />
        )
    }

    if (role  === "Welders") {
        return (
            <Img src={welderImg} />
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
    const { role } = data.roles[0];

    if (role === "Carpenters") {
        return (
            <SpeciSpecialtyText>{data.speciality || "Carpenters"}</SpeciSpecialtyText>
        )
    }

    if (role === "Plumbers") {
        return (
            <SpeciSpecialtyText>{data.speciality || "Plumbers"}</SpeciSpecialtyText>
        )
    }

    if (role === "Welders") {
        return (
            <SpeciSpecialtyText>{data.speciality || "Welders"}</SpeciSpecialtyText>
        )
    }

    if (role === "Electricians") {
        return (
            <SpeciSpecialtyText>{data.speciality || "Electricians"}</SpeciSpecialtyText>
        )
    }

    if (role === "landscapers") {
        return (
            <SpeciSpecialtyText>{data.speciality || "landscapers"}</SpeciSpecialtyText>
        )
    }
    if (role === "bricklayers") {
        return (
            <SpeciSpecialtyText>{data.speciality || "bricklayers"}</SpeciSpecialtyText>
        )
    }
    if (role === "Painters") {
        return (
            <SpeciSpecialtyText>{data.speciality || "Painters"}</SpeciSpecialtyText>
        )
    }

    if (role === "Chauffagistes") {
        return (
            <SpeciSpecialtyText>{data.speciality || "Chauffagistes"}</SpeciSpecialtyText>
        )
    }
    if (role === "Serruriers") {
        return (
            <SpeciSpecialtyText>{data.speciality || "Serruriers"}</SpeciSpecialtyText>
        )
    }
    return null;
}


const RenderTechnicianName = ({ data }) => {
    const { role } = data.roles[0];

    if (role === "pharmacie") {
        return (
            <TechnicianName>{data.name}</TechnicianName>
        )
    }

    return <TechnicianName>{`${data.lastName} ${data.firstName}`}</TechnicianName>

}



function TechnicienCard({ data,t }) {
    return (

       
        <Grid item xs={4} sm={4} md={4} lg={3}>
           
            <StyledCard elevation={2}>
                <UpperSection>
                    <ImgContainer>
                        <RenderImg data={data} />
                    </ImgContainer>
                    <TechnicianText>
                        <RenderTechnicianName data={data} />
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
                            {data.nbviews}
                        </VuesListItemText>
                    </ListItem>

                    <Button
                        LinkComponent={NavLink}
                        to={{
                            pathname: `/personnel/${data.lastName}-${data.firstName}`,
                            search: `?id=${data.id}`
                        }}
                        style={{
                            minWidth: 100,
                            fontSize: 13,
                            margin: "5px 0",
                            borderRadius: 100,
                            boxShadow: "none",
                            fontWeight: 600,
                        }}
                        variant="contained"
                    >
                    {t('See More Details')}
                    </Button>
                </ActionSection>
            </StyledCard>
       
        </Grid>
       
    )
}
export default compose (withNamespaces())(TechnicienCard);

