import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { connect } from "react-redux";
import TechnicianImg from '../../../assets/carpenter.png';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import AdvancedSection from './AdvancedSection';
import { Navigate } from "react-router-dom";


const Container = styled('div')`
    margin: 50px 0;
    width: 100%;
    @media only screen and (max-width: 900px){
        margin-top: 10px;
    }
    padding: 24px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    }  
`

const HeaderContainer = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media only screen and (max-width: 900px){
        flex-direction: column;
        align-items: center;
    }
`

const ProfileImg = styled(Paper)`
    display: flex;
    width: 25%;
    margin: 0 15px 0 0; 
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
    width: 100%;
    max-width: 300px;
    height: auto;
    margin: 0 auto;
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

const LoadingContainer = styled('div')`
    display: flex;
    height: 80vh;
    min-height: 500px;
    align-items: center;
    justify-content: center;
`

const Speciality = styled('span')`
    color: #5e5e5e;
    font-size: 14px;
`

const BasicInfo = styled(Paper)`
    display: flex;
    width: 70%;
    min-width: 250px;
    border: 1px solid #f1f1f1;
    border-radius: 10px;
    flex-direction: column;
    padding: 1em;
    max-width: 900px;
    @media only screen and (max-width: 900px){
        width: 100%;
    }
`

const BioTypo = styled(Typography)`
    font-size: 22px;
    font-weight: bold;
    text-transform: capitalize;
`

const BioColumns = styled('div')`
    display: flex;
    flex-direction: row;
    margin: 20px 0 0 0;
    @media only screen and (max-width: 600px){
        flex-direction: column;
    }
`

const BioItem = styled('div')`
    width: 33%;
    display flex;
    flex-direction: column;
    padding: 0.5em;
    align-items: start;
    @media only screen and (max-width: 600px){
        width: 100%;
        align-items: center;
    }
`

const BioItemLabel = styled(Typography)`
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

const BioAction = styled('div')`
    margin: 20px 0;
    padding: 0.5em;
    padding-top: 10px;
    @media only screen and (max-width: 600px){
        display: flex;
        justify-content: center;
    }
`

const EditBtn = styled(Button)`
    box-shadow: none;
    font-weight: bold;
    letter-spacing: 1px;
`


const RenderProfileName = ({ user }) => {
    if (user.speciality) {
        return (
            <ProfileRole>{user?.roles[0]?.role}
                <Speciality> ({user.speciality})</Speciality>
            </ProfileRole>
        )
    } else {
        return <ProfileRole>{user?.roles[0]?.role}</ProfileRole>
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


const ExperienceNumber = ({ user }) => {
    const role = user?.roles[0]?.role || null;
    if (role) {
        if (role !== "Technician " && role !== "pharmacie") {
            return (
                <BioItem>
                    <BioItemLabel>nombre d'expérience</BioItemLabel>
                    <BioItemVal>{user.experienceNumber}</BioItemVal>
                </BioItem>
            )
        }
        return null;
    }
    return null;
}



function Profile({ system }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const { user: userSy } = system;
    const role = userSy.roles[0]?.role;

    const getUserData = async ({ userSy }) => {
        try {
            const { data } = await axios.get(`http://192.168.1.113:5000/search/user/${userSy.id}/`);
            if (data) {
                setUser(data)
            }
            setLoading(false)

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        const { user: userSy } = system;

        setLoading(true)

        if (userSy.id) {
            getUserData({ userSy })
        }
    }, [system])


    if (role === "admin") {
        return <Navigate to="/dashboard/404" />
    }

    return (
        <Container>
            {
                loading ?
                    <LoadingContainer>
                        <CircularProgress />
                    </LoadingContainer>
                    :
                    user.id ?
                        <>
                            <HeaderContainer>
                                <ProfileImg elevation={0}>
                                    <Img
                                        src={TechnicianImg}
                                    />
                                    
                                    <RenderName user={user} />
                                    <RenderProfileName user={user} />
                                </ProfileImg>
                                <BasicInfo elevation={0}>
                                    <BioTypo color={"primary"}>coordonnées de Technician </BioTypo>
                                    <BioColumns>
                                        <BioItem>
                                            <BioItemLabel>Ville</BioItemLabel>
                                            <BioItemVal>{user.ville}</BioItemVal>
                                        </BioItem>
                                        <BioItem>
                                            <BioItemLabel>Adresse</BioItemLabel>
                                            <BioItemVal>{user.address}</BioItemVal>
                                        </BioItem>
                                        <BioItem>
                                            <BioItemLabel>Code postal</BioItemLabel>
                                            <BioItemVal>{user.postalCode}</BioItemVal>
                                        </BioItem>
                                        <BioItem>
                                            <BioItemLabel>Experience</BioItemLabel>
                                            <BioItemVal>{user.postalCode}</BioItemVal>
                                        </BioItem>
                                    </BioColumns>
                                    <BioColumns>
                                        <BioItem>
                                            <BioItemLabel>E-mail</BioItemLabel>
                                            <BioItemVal>{user.email}</BioItemVal>
                                        </BioItem>
                                        <BioItem>
                                            <BioItemLabel>numéro de téléphone</BioItemLabel>
                                            <BioItemVal>{user.phoneNumber}</BioItemVal>
                                        </BioItem>
                                        <ExperienceNumber user={user} />
                                    </BioColumns>
                                    <BioAction>
                                        <EditBtn component={NavLink} to="/dashboard/edit-profile" variant="contained">
                                            Editer mon Profile
                                        </EditBtn>
                                    </BioAction>
                                </BasicInfo>
                            </HeaderContainer>
                            <AdvancedSection user={user} />
                        </>
                        : null
            }
        </Container>
    )
}


const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(Profile)
