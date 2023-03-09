import React, { Component } from 'react';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
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
import LoadingButton from '@mui/lab/LoadingButton';

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
    background-color: milk;
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
const WideStyledFormControll = styled(FormControl)`
    width: 100%;
    margin: 10px 0;
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

class RegisterPhysiotherapist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            name: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            ville: "",
            address: "",
            codePostal: "",
            langue: [],
            speciality: "",
            experienceNumber: "",
            inami: "",
            password: "",
            repeatPassword: "",
            disabled: false
        }
        source = axios.CancelToken.source();
    }

    handleLangueChange = (event) => {
        const {
            target: { value },
        } = event;

        const val = typeof value === 'string' ? value.split(',') : value;

        this.setState({
            langue: val,
        });
    }

    handleChange = name => event => {
        if (name === "checked") {
            this.setState({ checked: event.target.checked });
        } else {
            this.setState({ [name]: event.target.value });
        }
    };

    resetFields = () => {
        this.setState({
            name: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            ville: [],
            address: "",
            codePostal: "",
            langue: [],
            speciality: "",
            password: "",
            repeatPassword: "",
            checked: false,
            experienceNumber: "",
            inami: "",
        });
    }

    action = key => (
        <Button style={{ color: "#FFF" }} onClick={() => { this.props.closeSnackbar(key) }}>
            Fermer
        </Button>
    );

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ disabled: true });
        const {
            password,
            repeatPassword,
            firstName,
            lastName,
            email,
            phoneNumber,
            codePostal,
            langue,
            address,
            ville,
            experienceNumber,
            inami
        } = this.state;

        let validate = true;

        if (password.trim().length < 8) {
            validate = false
            this.setState({ disabled: false })
            this.props.enqueueSnackbar("Mot de passe doit être d'au moins 8 caractères", { variant: "error", action: this.action });
            return;
        }

        if (password.trim().length > 15) {
            validate = false
            this.setState({ disabled: false })
            this.props.enqueueSnackbar("Le mot de passe doit contenir au maximum 15 caractères", { variant: "error", action: this.action });
            return;
        }

        if (password !== repeatPassword) {
            validate = false;
            this.setState({ disabled: false })
            this.props.enqueueSnackbar("Les mots de passe ne correspondent pas", { variant: "error", action: this.action });
            return;
        }

        if (validate) {
            const data = {
                firstName,
                lastName,
                password,
                passwordConfirmation: repeatPassword,
                email,
                phoneNumber,
                postalCode: codePostal,
                language: langue,
                address,
                ville,
                experienceNumber,
                inami,
                profession: "Kine",
                speciality: null,
                photoUrl: "https://i.ibb.co/sytQ7Qc/physiotherapist.png",
                photoCabinet: []
            }

            axios.post('http://192.168.1.113:5000/auth/signupkine', data, {
                cancelToken: source.token
            })
                .then((res) => {
                    this.props.enqueueSnackbar("vous enregistré avec succès", { variant: "success", action: this.action });
                    this.setState({ disabled: false })
                    this.resetFields()
                })
                .catch(err => {
                    console.log(err)
                    if (axios.isCancel(err)) {
                        console.log('Request canceled', err.message);
                    } else {
                        this.setState({ disabled: false })
                        const msg = GetErrorMessage(err);
                        console.log(err)
                        if (msg) {
                            console.log(msg)
                            this.props.enqueueSnackbar(msg, { variant: "error", action: this.action });
                        } else {
                            console.log("server Error")
                            this.props.enqueueSnackbar("server error", { variant: "error", action: this.action });
                        }
                    }
                })
        }
    }

    componentWillUnmount() {
        if (source) {
            source.cancel("got unmounted");
        }
    }

    render() {
        const {
            checked,
            firstName,
            lastName,
            email,
            phoneNumber,
            ville,
            address,
            codePostal,
            langue,
            experienceNumber,
            password,
            speciality,
            repeatPassword,
            inami,
            disabled
        } = this.state

        return (
<BgRegister>
                <MainContainer>
                    <StyledCard elevation={2}>
                        <Img src={UserLoginImg} />
                        <Form onSubmit={this.handleSubmit}>
                            <LoginHeader variant='h1'>SignUp Electrician
                            </LoginHeader>
                            <SideBySideInput>
                                <StyledFormControll variant="filled" required>
                                    <TextField
                                        type="text"
                                        onChange={this.handleChange("firstName")}
                                        id="standard-basic-firstName"
                                        label="FirstName"
                                        variant="filled"
                                        required
                                        value={firstName}
                                        disabled={disabled}
                                        inputProps={{
                                            maxLength: "26",
                                            minLength: "2"
                                        }}
                                    />
                                </StyledFormControll>
                                <StyledFormControll variant="filled" required>
                                    <TextField
                                        type="text"
                                        onChange={this.handleChange("lastName")}
                                        id="standard-basic-lastName"
                                        label="LastName"
                                        variant="filled"
                                        required
                                        value={lastName}
                                        disabled={disabled}
                                        inputProps={{
                                            maxLength: "26",
                                            minLength: "2"
                                        }}
                                    />
                                </StyledFormControll>
                            </SideBySideInput>
                            <SideBySideInput>
                                <StyledFormControll variant="filled" required>
                                    <TextField
                                        type="email"
                                        onChange={this.handleChange("email")}
                                        id="standard-basic-email"
                                        label="E-mail"
                                        variant="filled"
                                        required
                                        value={email}
                                        disabled={disabled}
                                        inputProps={{
                                            maxLength: "62",
                                            minLength: "3"
                                        }}
                                    />
                                </StyledFormControll>
                                <StyledFormControll variant="filled" required>
                                    <TextField
                                        type="tel"
                                        onChange={this.handleChange("phoneNumber")}
                                        id="standard-basic-phoneNumber"
                                        label="Phone Number"
                                        variant="filled"
                                        required
                                        value={phoneNumber}
                                        disabled={disabled}
                                        inputProps={{
                                            maxLength: "35",
                                            minLength: "3"
                                        }}
                                    />
                                </StyledFormControll>
                            </SideBySideInput>
                            <SideBySideInput>
                                <StyledFormControll variant="filled" required>
                                    <InputLabel id="demo-simple-select-standard-label-1">
                                        Ville
                                    </InputLabel>
                                    <Select
                                        id="demo-simple-select-standard-1"
                                        value={ville}
                                        onChange={this.handleChange("ville")}
                                        label="Pays"
                                        required
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value={""}></MenuItem>
                                        {
                                            belgiqueVilles.map((ville, i) => (
                                                <MenuItem key={i} value={ville}>{ville}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </StyledFormControll>
                                <StyledFormControll variant="filled" required>
                                    <TextField
                                        type="text"
                                        onChange={this.handleChange("address")}
                                        id="standard-basic-address"
                                        label="Adress"
                                        variant="filled"
                                        required
                                        value={address}
                                        disabled={disabled}
                                        inputProps={{
                                            maxLength: "95",
                                            minLength: "2"
                                        }}
                                    />
                                </StyledFormControll>
                            </SideBySideInput>
                            <SideBySideInput>
                                <StyledFormControll variant="filled" required>
                                    <TextField
                                        type="number"
                                        inputProps={{
                                            max: "9999",
                                            min: "1000"
                                        }}
                                        onChange={this.handleChange("codePostal")}
                                        id="standard-basic-codePostal"
                                        label="Postal Code "
                                        variant="filled"
                                        required
                                        value={codePostal}
                                        disabled={disabled}
                                    />
                                </StyledFormControll>
                                <StyledFormControll variant="filled" required>
                                    <InputLabel id="demo-simple-select-standard-label-2">
                                        Langue
                                    </InputLabel>
                                    <Select
                                        id="demo-simple-select-standard-2"
                                        value={langue}
                                        onChange={this.handleLangueChange}
                                        label="Langue"
                                        multiple
                                        required
                                        disabled={disabled}
                                    >
                                        {
                                            languages.map((Language, i) => (
                                                <MenuItem key={i} value={Language}>{Language}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </StyledFormControll>
                            </SideBySideInput>
                            <SideBySideInput>
                                <StyledFormControll variant="filled" required>
                                    <TextField
                                        type="password"
                                        onChange={this.handleChange("password")}
                                        id="standard-basic-password"
                                        label="Password"
                                        variant="filled"
                                        required
                                        value={password}
                                        disabled={disabled}
                                        inputProps={{
                                            minLength: "8"
                                        }}
                                    />
                                </StyledFormControll>
                                <StyledFormControll variant="filled" required>
                                    <TextField
                                        type="password"
                                        onChange={this.handleChange("repeatPassword")}
                                        id="standard-basic-repeatPassword"
                                        label="Confirm Password"
                                        variant="filled"
                                        required
                                        value={repeatPassword}
                                        disabled={disabled}
                                        inputProps={{
                                            minLength: "8"
                                        }}
                                    />
                                </StyledFormControll>
                            </SideBySideInput>
                            <WideInputContainer>
                                <RememberMe
                                    control={
                                        <Checkbox
                                            inputProps={{ 'aria-label': 'controlled' }} checked={checked}
                                            onChange={this.handleChange("checked")} name="term and condition"
                                            required
                                            disabled={disabled}
                                        />
                                    }
                                    label="I agree with all terms and conditions"
                                />
                            </WideInputContainer>
                            <RegisterButton loading={disabled} type="submit" variant="contained">
                            Register now
                            </RegisterButton>
                            <ForgotPsw component={NavLink} to="/login">Already registered? Log in by clicking here</ForgotPsw>
                        </Form>
                    </StyledCard>
                    <SideContent >
                        <SideImg src={RegisterSideImg} />
                    </SideContent>
                </MainContainer>
            </BgRegister>
        )
    }
}

export default withSnackbar(RegisterPhysiotherapist);
