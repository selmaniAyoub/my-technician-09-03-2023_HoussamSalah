import React ,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button'
import TechnicianImg from '../../../assets/carpenter.jpg';
import PlumberImg from '../../../assets/plumber.jpg';
import welderImg from '../../../assets/welder.jpg';
import ElectricianImg from '../../../assets/electrician.jpg';
import LandscaperImg from '../../../assets/landscaper.jpg';
import TilerImg from '../../../assets/carreleur.jpg';
import PaintersImg from '../../../assets/painter.jpg';
import VentilationImg from '../../../assets/carpenter.jpg';

import { NavLink } from "react-router-dom"
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate, createSearchParams } from "react-router-dom";
import specialties from '../../../truesSpecialties';
import HomeLayout from '../../../layouts/HomeLayout'
import en from '../../../translation/en.json'
import fr from '../../../translation/fr.json'
import { withNamespaces } from 'react-i18next';
import i18n from '../../../translation/i18n'


const SecondaryButton = styled(Button)`
    letter-spacing: 0.5px;
    color: #0;
    font-size: 18px;
    background-color: rgba(25,118,210,0.0);
    transition: 0.3s;
    font-weight: 600;
    border: 2px solid #0066dd;
    &:hover {
        background-color: #1565c0;
        color: #FFFFFF;
        border-color: #1565c0;
    }
    padding: 6px 25px;
    border-radius: 100px;
    @media only screen and (max-width: 600px){
        font-size: 16px;
    }
    margin: 15px 15px 0 0;
`
const MainContainer = styled(Container)`
    @media only screen and (max-width: 900px){
        padding: 32px 16px !important;
        margin-top: 50px;
    }
    margin-top: 100px;
`

const TextContainer = styled('div')`
    max-width: 700px;
    margin-bottom: 50px;
`

const SubHeader = styled(Typography)`
    color: #014bac;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
`

const CopyRightFooter = styled('div')`
    display: flex;
    width: 100%;
    padding: 16px;
    justify-content: center;
    background-color: #001834;
`

const CopyRightText = styled(Typography)`
    font-size: 16px;
    text-align: center;
    color: #ffffff;
`

const Header = styled(Typography)`
    font-size: 50px;
    font-weight: 600;
    letter-spacing: 1px;
    color: #2a2a2a;
    text-transform: capitalize;
    line-height: 1.2em;
    @media only screen and (max-width: 900px){
        font-size: 35px;
    }
`

const Img = styled('img')`
    max-width: 100%;
    max-height: 180px;
`

const StyledCard = styled(Card)`
    box-shadow: 0px 0px 30px 0px rgb(0 0 0 / 10%)
`

const SpecialtyText = styled('p')`
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.5px;
    text-transform: capitalize;
    margin: 10px 0;
    text-align: center;
`

const SpecialtyDisc = styled('p')`
    font-size: 18px;
    letter-spacing: 0.5px;
    text-align: center;
    margin: 0;
`

const BoxContent = styled(ButtonBase)`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1em;
`

const RenderImg = ({ data }) => {
    if (data.value === "Carpenters") {
        
                return(
                <Img src={TechnicianImg} />
        
            ) 
           
        
    }

    if (data.value === "Plumbers") {
        return (
            <Img src={PlumberImg} />
        )
    }

    if (data.value === "Welders") {
        return (
            <Img src={welderImg} />
        )
    }

    if (data.value === "Electricians") {
        return (
            <Img src={ElectricianImg} />
           
        )
    }

    if (data.value === "Landscapers") {
        return (
            <Img src={LandscaperImg} />
        )
    }
    if (data.value === "Tilers") {
        return (
            <Img src={TilerImg} />
        )
    }
    if (data.value === "Painters") {
        return (
            <Img src={PaintersImg} />
        )
    }

    if (data.value === "ventilation") {
        return (
            <Img src={VentilationImg} />
        )
    }
    return null;
}



 function ServicesList({t}) {
    const navigate = useNavigate();

    const handleClick = (data) => () => {
        navigate({
            pathname: '/about-us',
           search: `?${createSearchParams({ category: data.value })}`,
        });
    }

    return (
        <HomeLayout>
        <MainContainer maxWidth="lg" style={{ flexGrow: 1 }}>
            <TextContainer>
                <Header>Nos Techniciens </Header>
            </TextContainer>
            <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
                {
                     specialties.map((data, i) => (
                        <Grid item xs={4} sm={4} md={4} lg={3} key={i}>
                            <StyledCard >
                                <BoxContent onClick={handleClick(data)}>
                                    <RenderImg data={data} />
                                    <SpecialtyText>{t(data.label)}</SpecialtyText>
                                    <SpecialtyDisc>{t(data.text)}</SpecialtyDisc>
                                </BoxContent>
                            </StyledCard>
                        </Grid>
                    ))
                }
            </Grid>
                     
        </MainContainer>
        </HomeLayout>
    )
}
export default withNamespaces() (ServicesList)