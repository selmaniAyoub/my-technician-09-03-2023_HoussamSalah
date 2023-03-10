import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { connect } from "react-redux";
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import UserLoginImg from '../../../assets/user-login.png'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';
import LoginSideImg from '../../../assets/register.jpg'
import { LoginUser } from '../../../thunks';
import { useSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import en from '../../../translation/en.json'
import fr from '../../../translation/fr.json'
import { withNamespaces } from 'react-i18next';
import i18n from '../../../translation/i18n'
import {compose  } from "recompose";


const BgLogin = styled('div')`
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: milk;
    padding-top:50px;
    margin-top:20px;
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
    flex-wrap;
    background:'red';
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

const StyledFormControll = styled(FormControl)`
    width: 90%;
    margin: 10px 0;
`

const LoginButton = styled(LoadingButton)`
    margin-top: 10px;
    padding: 10px 16px;
    width: 90%;
    font-weight: 600;
`

const RememberMe = styled(FormControlLabel)`
    .MuiTypography-root{
        color: #323e48;
        font-weight: 400;
        font-size: 14px;
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
`

const ForgotPsw = styled(Link)`
    margin-top: 30px;
    text-decoration: none;
    font-size: 14px;
    width: 90%;
`

const RegisterLabel = styled(Typography)`
    font-size: 16px
`

const RegisterClient = styled(Link)`
    margin-top: 10px;
    text-decoration: none;
    font-size: 14px;
`

const RegisterSoignant = styled(Link)`
    margin-top: 5px;
    text-decoration: none;
    font-size: 14px;
`

const RegisterContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`

const SideImg = styled('img')`
    display: block;
    width: 90%;
    max-width: 600px;
    margin: 0 0 0 auto;
    @media only screen and (max-width: 900px){
        width: 100%;  
        margin: 0 auto;
        max-width: 500px;
    }
`

const SideContent = styled('div')`
    margin: 80px auto;
    width: 45%;   
    justify-content: center;
    padding: 20px 0;
    @media only screen and (max-width: 900px){
        width: 100%;   
        margin: 20 auto;
    }
`


const GetErrorMessage = (err) => {
    console.log(err)
    console.log(err.response?.data)
    if (err.response?.data?.message) {
        if (err.response?.data.message === "Your account is not Activated ! check your mail to active your account.") {
            return "Votre compte n'est pas activ?? ! v??rifiez votre courrier pour activer votre compte."
        }
        if (err.response?.data.message === "Incorrect password !") {
            return "Mot de passe incorrect !"
        }
        else {
            return err.response.data.message
        }
    }

    if (typeof err.response?.data === 'string') {
        if (err.response?.data === "User doesn't exist ! Enter Valid email !") {
            return "L'utilisateur n'existe pas ! Entrez une adresse email valide !"
        }
        else {
            return err.response?.data
        }
    }

    return ""
}

function LoginPage(props,{t}) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [checked, setChecked] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disable, setDisable] = useState(false);
    const controller = new AbortController();


    useEffect(() => {
        window.addEventListener('beforeunload', alertUser)
        window.addEventListener('unload', handleEndConcert)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
            window.removeEventListener('unload', handleEndConcert)
            handleEndConcert()
        }
    })

    const alertUser = e => {
        if (disable) {
            e.preventDefault()
            e.returnValue = ''
        }
    }

    const handleEndConcert = async () => {
        if (disable) {
            controller.abort()
        }
    }

    const action = key => (
        <Button style={{ color: "#FFF" }} onClick={() => { closeSnackbar(key) }}>
            Fermer
        </Button>
    );

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };

    function handleSubmit(event) {
        event.preventDefault();
        setDisable(true)
        let validate = true;

        if (password.trim().length < 8) {
            validate = false
            setDisable(false)
            enqueueSnackbar("Mot de passe doit ??tre d'au moins 8 caract??res", { variant: "warning", action });
        }

        if (validate) {
            const data = { email, password }
            axios.post('http://192.168.1.113:5000/auth/signin', data, {
                signal: controller.signal
            })
                .then((res) => {
                    setDisable(false)
                    props.LoginUser(res.data)
                })
                .catch(err => {
                    setDisable(false)
                    const msg = GetErrorMessage(err);
                    if (msg) {
                        enqueueSnackbar(msg, { variant: "error", action });
                    } else {
                        enqueueSnackbar("server error", { variant: "error", action });
                    }
                })
        }

    }

    return (
        <BgLogin>
            <MainContainer>
                <StyledCard elevation={2}>
                    <Img src={UserLoginImg} />
                    <Form onSubmit={handleSubmit}>
                        <LoginHeader variant='h1'>{props.t('LogIn To Your Account')}
                        </LoginHeader>

                        <StyledFormControll variant="filled" required>
                            <TextField
                                type="email"
                                onChange={handleEmailChange}
                                id="standard-basic-email"
                                label="E-mail"
                                variant="filled"
                                required
                                value={email}
                                disabled={disable}
                            />
                        </StyledFormControll>
                        <StyledFormControll variant="filled" required>
                            <TextField
                                type="password"
                                onChange={handlePasswordChange}
                                id="standard-basic-psw"
                                label={props.t('Mot de passe')}
                                variant="filled"
                                minLength="8"
                                required
                                value={password}
                                disabled={disable}
                            />
                        </StyledFormControll>
                        <StyledFormControll>
                            <RememberMe
                                control={
                                    <Checkbox checked={checked} onChange={handleCheck} name="remember-me" disabled={disable} />
                                }
                                label={props.t("Se souvenir de moi?")}
                            />
                        </StyledFormControll>
                        <LoginButton
                            loading={disable}
                            type="submit" variant="contained">
                           Connexion
                        </LoginButton>
                        <ForgotPsw component={NavLink} to="/loginusername">connecter avec User Name ?</ForgotPsw>
                        <ForgotPsw component={NavLink} to="/">{props.t('Forget Password ?')}</ForgotPsw>

                    </Form>
                </StyledCard>
                <SideContent >
                    <SideImg src={LoginSideImg} />
                    <RegisterContainer>
                        <RegisterLabel>
                            {props.t('First Time On My Technician ?')}
                        </RegisterLabel>
                        <RegisterClient component={NavLink} to="/register">{props.t('SignUp As A Client')}</RegisterClient>
                        <RegisterSoignant component={NavLink} to="/register-technicians">{props.t('SignUp As A Technician')} </RegisterSoignant>
                    </RegisterContainer>
                </SideContent>
            </MainContainer>
        </BgLogin>
    )
}

const mapStateToProps = (state) => ({
    system: state.system
});

//  export default  connect(mapStateToProps, { LoginUser }) (LoginPage);

 export default compose (withNamespaces()) (connect(mapStateToProps, { LoginUser }) (LoginPage));

// export default withNamespaces()  (LoginPage);
