import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import consultImg from "./tech.jpg"
import Contact from "./Contact";
import axios from 'axios';
import { useState } from 'react';
import TechnicianImg from '../../../assets/carpenter.png';
import PlumberImg from '../../../assets/plumber.png';
import welderImg from '../../../assets/welder.png';
import ElectricianImg from '../../../assets/electrician.png';
import OrchardImg from '../../../assets/orchard.png';
import BrickworkImg from '../../../assets/brickwork.png';
import en from '../../../translation/en.json'
import fr from '../../../translation/fr.json'
import { withNamespaces } from 'react-i18next';
import i18n from '../../../translation/i18n'
import { compose } from "recompose";
const HeaderContainer = styled('div')`
    display: flex;
    flex-direction: row;
    width: 130%;
    
    justify-content: center;
    @media only screen and (max-width: 900px){
        flex-direction: column;
        align-items: center;
    }
`
const NameContainer= styled('div')`

display: flex;
flex-direction: column;
align-content: center;
`
const ProfileImg = styled(Paper)`
   
    width: 25%;
   
    margin: 0 15px 0px 0; 
    border: 1px solid #f1f1f1;
    border-radius: 10px;
    flex-direction: column;
    min-width: 250px;
    max-width: 350px;
    @media only screen and (max-width: 900px){
        width: 100%;
        max-width: 500px;
        margin: 0;
        margin-bottom: 30px;
    }
`

const Img = styled('img')`
    display: flex;
    width: 90%;
    max-width: 300px;
    height: auto;
    margin: 10px auto;
    border-radius: 10px;
    
`

const ProfileName = styled(Typography)`
    font-size: 22px;
    text-align: center;
    font-weight: bold;
    text-transform: capitalize;
    margin: 10px 0 0 0; 
`

const ProfileRole = styled(Typography)`
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    text-transform: capitalize;
    margin: 5px 0; 
`

const Speciality = styled('span')`
    color: #5e5e5e;
    font-size: 14px;
`

const BasicInfo = styled(Paper)`
    display: flex;
    justify-content: center;
    align-items: wrap;
    width: 100%;
   height: 100%;
    min-width: 250px;
    border: 1px solid #f1f1f1;
    border-radius: 10px;
    flex-direction: column;
    padding: 1em;
    @media only screen and (max-width: 900px){
        width: 100%;
    }
`

const BioTypo = styled(Typography)`
    font-size: 23px;
    font-weight: bold;
    text-transform: capitalize;
`

const BioColumns = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content:center;
    
    margin: 20px 0 0 0;
    @media only screen and (max-width: 600px){
        flex-direction: column;
    }
`

const BioItem = styled('div')`
    width: 33%;
    display flex;
    flex-direction: column;
    justify-content: start;
    padding: 0.5em;
    align-items: center;
    @media only screen and (max-width: 600px){
        width: 100%;
        align-items: center;
    }
`

const BioItemLabel = styled(Typography)`
display: flex;
justify-content: center;
    font-size: 18px;
    color: #666;
    text-transform: capitalize;
`

const BioItemVal = styled(Typography)`

    font-size: 18px;
    color: #222;
    margin-top: 10px;
    font-weight: bold;
    word-break: break-word;
    @media only screen and (max-width: 600px){
        text-align: center;
    }
`
const BioItemLangVal = styled(Typography)`
display:flex;
flex-direction: row;
    font-size: 18px;
    color: #222;
    margin-top: 10px;
    font-weight: bold;
    word-break: break-word;
    @media only screen and (max-width: 600px){
        text-align: center;
    }
`
const RenderProfileName = ({ user , t }) => {
    if (user.speciality) {
        return (
            <ProfileRole>{user?.roles[0]?.role}
                <Speciality> ({t(user.speciality)})</Speciality>
            </ProfileRole>
        )
    } else {
        return <ProfileRole>{t(user?.roles[0]?.role)}</ProfileRole>
    }
}


const RenderName = ({ user }) => {
    const role = user?.roles[0]?.role;

    if (role === "pharmacie") {
        return <ProfileName color={"primary"}>{user.name}</ProfileName>
    } else {
        return <ProfileName color={"primary"}>{user.firstName} {user.lastName}</ProfileName>
    }
}


const ExperienceNumber = ({ user,t }) => {
    const role = user?.roles[0]?.role || null;
    if (role) {
        if (role !== "client" && role !== "pharmacie") {
            return (
                <BioItem>
                    <BioItemLabel>{t("nombre d'expérience")}</BioItemLabel>
                    <BioItemVal>{user.experienceNumber}</BioItemVal>
                </BioItem>
            )
        }
        return null;
    }
    return null;
}

const RenderImg = ( data ) => {
    const { role } = data.src.roles[0];
console.log("data.roles[0]; =",data )

   console.log("role =  " , role)

    
    if (role === "menuisier") {
        return (
            <Img src={data.photoUrl || TechnicianImg} />
        )
    }

    if (role === "plombier") {
        return (
            <Img src={data.photoUrl || PlumberImg} />
        )
    }

    if (role  === "soudeur") {
        return (
            <Img src={data.photoUrl || welderImg} />
        )
    }

    if (role  === "electricien") {
        return (
            <Img src={data.photoUrl || ElectricianImg} />
        )
    }

    if (role === "paysagiste") {
        return (
            <Img src={data.photoUrl || OrchardImg} />
        )
    }

    if (role  === "peintre") {
        return (
            <Img src={data.photoUrl || BrickworkImg} />
        )
    }
    if (data.label === "carreleur") {
        return (
            <Img src={data.photoUrl || BrickworkImg} />
        )
    }


    return null;
}


 function UpperSection({ user,t }) {
 
    return (
        <HeaderContainer>
            <>
            <ProfileImg elevation={0}>
                <RenderImg
                    src={user}
                />
                <NameContainer>
                <RenderName user={user} />
                <RenderProfileName user={user} t={t} />
                </NameContainer>
            </ProfileImg>
            <BasicInfo elevation={0}>
                <BioTypo color={"primary"}>{t("Informations")}</BioTypo>
                <BioColumns>
                    <BioItem>
                        <BioItemLabel>{t("Ville")}</BioItemLabel>
                        <BioItemVal >{t(user.ville)}</BioItemVal>
                    </BioItem>
                    <BioItem>
                        <BioItemLabel >{t("Adresse")}</BioItemLabel>
                        <BioItemVal style={{ width:"90%"  }}>{user.address}</BioItemVal>
                    </BioItem>
                    <BioItem>
                        <BioItemLabel>{t("Code postal")}</BioItemLabel>
                        <BioItemVal>{user.postalCode}</BioItemVal>
                    </BioItem>
                
                </BioColumns>
                <BioColumns>
                    <BioItem>
                    <BioItemLabel>{t("Email")}</BioItemLabel>
                        <BioItemVal>{user.email}</BioItemVal>
                    </BioItem>
                    <BioItem>
                    <BioItemLabel>{t("Phone Number")}</BioItemLabel>
                        <BioItemVal>{user.phoneNumber }</BioItemVal>
                    </BioItem>
                    <ExperienceNumber user={user} t={t}/>
                </BioColumns>
                <BioColumns>
                <BioItem>
                    <BioItemLabel>{t("Languages")}</BioItemLabel>
                 <BioItemVal>   { user.language.map(language =>
                  <span>{t("language")  } </span>
)}</BioItemVal>
                     </BioItem>

                    {/*  <BioItem>
                    <BioItemLabel>Availablity</BioItemLabel>
                        <BioItemVal><span>Start: 08:00 =></span>
                        <span> End: 17:00</span></BioItemVal>
                    </BioItem>
                    <BioItem>
                    <BioItemLabel>Rate</BioItemLabel>
                        <BioItemVal>*****</BioItemVal>
                    </BioItem> */}
                    </BioColumns>
            </BasicInfo>
            </>
            <Contact technician={user}/>
        </HeaderContainer>
    );
}   
export default  withNamespaces() (UpperSection);