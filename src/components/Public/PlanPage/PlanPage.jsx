import React, { Component } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import UserLoginImg from '../../../assets/user-login.png';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';
import RegisterSideImg from '../../../assets/register.jpg';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import languages from '../../../Langues';
import belgiqueVilles from '../../../BelgiqueVilles';
import specialties from '../../../SpecificSpecialties';
import { withSnackbar } from 'notistack';
import "./Plan.scss";

let source;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    anchorOrigin: {
        vertical: "top",
        horizontal: "center"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "center"
    },
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
            width: 230,
        },
    },
};


const BgRegister = styled('div')`
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
`

const MainContainer = styled(Container)`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow: hidden;
    @media only screen and (max-width: 900px){
        padding: 32px 16px !important;
        flex-direction: column;
    }
    flex-direction: row;
`

const StyledCard = styled(Card)`
    margin: 80px  auto;
    width: 50%;   
    justify-content: center;
    padding: 20px 0;
    @media only screen and (max-width: 900px){
        width: 90%;
        max-width: 600px;
        min-width: 280px;
        margin: 0 auto;
    }
    @media only screen and (max-width: 500px){
        width: 100%;
    }
`

const Form = styled('form')`
    display: flex;
    flex-direction: column;
    padding: 16px;
    overflow: hidden;
    align-items: center;
`

const SideBySideInput = styled('div')`
    display: flex;
    flex-direction: rows;
    justify-content: space-between;
    width: 90%;
    flex-wrap: wrap;
`

const WideInputContainer = styled('div')`
    width: 90%;
`

const StyledFormControll = styled(FormControl)`
    width: 49%;
    margin: 10px 0;
    @media only screen and (max-width: 600px){
        width: 100%;
    }
`

const RegisterButton = styled(LoadingButton)`
    margin-top: 10px;
    padding: 10px 16px;
    width: 90%;
    font-weight: 600;
`
const WideStyledFormControll = styled(FormControl)`
    width: 100%;
    margin: 10px 0;
`

const RememberMe = styled(FormControlLabel)`
    .MuiTypography-root{
        color: #323e48;
        font-weight: 400;
        font-size: 14px;
    }
    @media only screen and (max-width: 600px){
       margin-top: 10px
    }
`

const Img = styled('img')`
    display: block;
    max-width: 150px;
    margin: 10px auto;
`

const LoginHeader = styled(Typography)`
    width: 90%;
    font-size: 20px;
    font-weight: 500;
    margin 0 auto 20px auto;
    text-align: center;
    font-weight: 600;
`

const ForgotPsw = styled(Link)`
    margin-top: 30px;
    text-decoration: none;
    font-size: 14px;
    width: 90%;
`

const SideImg = styled('img')`
    display: block;
    width: 90%;
    max-width: 600px;
    margin: auto 0 auto auto;
    @media only screen and (max-width: 900px){
        width: 100%;  
        margin: 0 auto;
        max-width: 500px;
    }
`

const SideContent = styled('div')`
    margin: 80px auto;
    width: 45%;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: end;
    @media only screen and (max-width: 900px){
        width: 100%;   
    }
`

const GetErrorMessage = (err) => {
    if (err.response.data.message === "User exist !") {
        return "Utilisateur existe !"
    }

    return ""
}


const Plan =({nextStep})=> {

   const Continue = e => {
    e.preventDefault();
    nextStep();
  }

        return (
            <BgRegister>
     <div className="pricingTable">
  <h2 className="pricingTable-title">Find a plan that's right for you.</h2>
<br/>
  <ul className="pricingTable-firstTable">
    <li className="pricingTable-firstTable_table">
      <h1 className="pricingTable-firstTable_table__header">Basic</h1>
      <p className="pricingTable-firstTable_table__pricing"><span>€</span><span>100</span><span>6 Months</span></p>
      <ul className="pricingTable-firstTable_table__options">
        <li>Profil en ligne complet</li>
        <li>Agenda en ligne sur mesure et sécurisé</li>
        <li>Client contact technicien</li>
      </ul>
      <button className="pricingTable-firstTable_table__getstart" onClick={ Continue }>Get Started Now</button>
    </li>
    <li className="pricingTable-firstTable_table">
      <h1 className="pricingTable-firstTable_table__header">Essential</h1>
      <p className="pricingTable-firstTable_table__pricing"><span>€</span><span>150</span><span>6 Months</span></p>
      <ul className="pricingTable-firstTable_table__options">
      <li>Agenda en ligne sur mesure et sécurisé</li>
        <li>Base de données clients</li>
        <li>Email de confirmation et de rappel</li>
        <li>Prise de rendez-vous en ligne</li>
        <li>Page d'acceuil(comme Facebook) + photo + description, specialité</li>
      </ul>
      <button className="pricingTable-firstTable_table__getstart" onClick={ nextStep() }>Get Started Now</button>
    </li>
    <li className="pricingTable-firstTable_table">
      <h1 className="pricingTable-firstTable_table__header">Premium</h1>
      <p className="pricingTable-firstTable_table__pricing"><span>€</span><span>300</span><span>6 Month</span></p>
      <ul className="pricingTable-firstTable_table__options">
        <li>Lien vers le site web</li>
        <li>Maintenance</li>
        <li>Gérer les reseaux sociaux</li>
        <li>Service de secrétariat</li>
      </ul>
      <button className="pricingTable-firstTable_table__getstart" onClick={ Continue, console.log("first") }>Get Started Now</button>
    </li>
  </ul>
</div>

            </BgRegister>
        )
    
}

export default withSnackbar(Plan);