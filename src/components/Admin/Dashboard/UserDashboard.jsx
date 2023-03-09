import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { translate } from 'react-i18next';
import { compose } from "recompose";



const Container = styled('div')`
    margin-top: 20px;
    padding: 24px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    }
`

const Header = styled(Typography)`
    font-size: 40px;
    font-weight: 600;
    color: #373737;
    margin-top: 20px;
    text-transform: capitalize;
`

const DescDash = styled(Typography)`
    font-size: 20px;
    margin: 20px 0;
`

const ActionsContainer = styled('div')`
    display: flex;
    flex-wrap: wrap;
    @media only screen and (max-width: 530px){
        flex-direction: column;
        justify-content: center;
    }
`

const SyledBtn = styled(Button)`
    margin: 10px;
    box-shadow: none;
    font-weight: bold;
    letter-spacing: 1px;   
    @media only screen and (max-width: 530px){
        max-width: 200px;
        width: 100%;
        margin: 10px auto;
    }
`

const RenderHeader = ({ data,t }) => {
    if (data.name) {
        return <Header variant="h1">Bonjour {data.name}</Header>
    }
    if (data.firstName && data.lastName) {
        return <Header variant="h1">{t('Bonjour')} {data.firstName} {data.lastName}</Header>
    }
    return null
}

function UserDashboard(props, { t }) {
    return (
        <Container>
            <RenderHeader data={props.user}  t={props.t}/>
            <DescDash>{props.t('Depuis le tableau de bord de votre compte, vous pouvez consulter vos rendez-vous.')}</DescDash>
            <DescDash>{props.t('Modifiez votre mot de passe et les détails de votre compte.')}</DescDash>
            <ActionsContainer>
                <SyledBtn component={NavLink} to="/dashboard/appointments" variant="contained">
                   {props.t('Les rendez-vous')}
                </SyledBtn>

                <SyledBtn component={NavLink} to="/dashboard/settings" variant="contained">
                    {props.t('paramètres')}
                </SyledBtn>
            </ActionsContainer>
        </Container>
    );
}
export default compose (withNamespaces()) (UserDashboard);