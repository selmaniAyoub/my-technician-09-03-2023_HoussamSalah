import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import { translate } from 'react-i18next';
import { compose } from "recompose";

const Container = styled('div')`
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
    margin-bottom: 20px;
    @media only screen and (max-width: 900px){
        font-size: 30px;
    }
`

const DescSettings = styled(Typography)`
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
    letter-spacing: 0.5px;
    @media only screen and (max-width: 530px){
        max-width: 200px;
        width: 100%;
        margin: 10px auto;
    }
`

function Settings(props,{t}) {
    const role = props.system.user?.roles[0].role;

    return (
        <Container>
            <Header variant="h1">{props.t('Paramètres')}</Header>
            <Divider />
            <DescSettings variant="body1"  t={props.t} >
                {props.t('À partir la page des paramètres, vous pouvez modifier les détails de votre compte et votre mot de passe.')}
            </DescSettings>
            <ActionsContainer>
                {
                    role !== "admin" ?
                        <SyledBtn component={NavLink} to="/dashboard/edit-profile" variant="contained">
                            {props.t('Editer mon profil')}
                        </SyledBtn>
                        :
                        null
                }

                <SyledBtn component={NavLink} to="/dashboard/edit-password" variant="contained">
                    {props.t('changer mot de passe')}
                </SyledBtn>
            </ActionsContainer>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    system: state.system
});

export default compose  (withNamespaces(),connect(mapStateToProps)) (Settings);
