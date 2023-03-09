import React, { Component,useEffect } from 'react';
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
import plans from '../../../Plans';
import belgiqueVilles from '../../../BelgiqueVilles';
import specialties from '../../../SpecificSpecialties';
import { withSnackbar } from 'notistack';
import UploadProfileImg from '../../Admin/UploadProfileImg';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper'
import SignUp from "./SignUp";
import PlanPage from "./PlanPage";
import Success from "./Success";

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

const WideStyledFormControll = styled(FormControl)`
    width: 100%;
    margin: 10px 0;
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
const LoadingContainer = styled('div')`
    display: flex;
    height: 80vh;
    min-height: 500px;
    align-items: center;
    justify-content: center;
`
const ImgSide = styled(Paper)`
    display: flex;
    width: 25%;
    min-width: 250px;
    max-width: 350px;
    margin: 0 10px auto 0;
    flex-direction: column;
    border: 1px solid #f1f1f1;
    @media only screen and (max-width: 900px){
        width: 100%;  
    }
`
const RenderImg = ({ profilePhoto }) => {
    if (profilePhoto) {
        return <Img src={URL.createObjectURL(profilePhoto)} />
    } else {
       
        return <Img src={UserLoginImg} />
    }
}
const url = `https://api.cloudinary.com/v1_1/bilel-moussa/upload`;

const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append(
            "upload_preset",
            "btuw2go3"
        );
        fetch(url, {
            method: "post",
            body: formData,
        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}



const GetErrorMessage = (err) => {
    if (err.response.data.message === "User exist !") {
        return "Utilisateur existe !"
    }

    return ""
}

class RegisterTechnician extends Component {

    
    constructor(props) {

      
       /*  useEffect(() => {
            axios.get('http://192.168.1.113:5000/plan/all', {
                    
            })
                .then((res) =>data=> {
                   this.plan=data;
                   
                })
                .catch(err => {
                    console.log(err)
                    if (axios.isCancel(err)) {
                        console.log('Request canceled', err.message);
                    } else {
                        this.setState({ disabled: false })
                        const msg = GetErrorMessage(err);
                        console.log(err.response.data)
                        if (msg) {
                            console.log(msg)
                            this.props.enqueueSnackbar(msg, { variant: "error", action: this.action });
                        } else {
                            console.log("server Error")
                            this.props.enqueueSnackbar("server error", { variant: "error", action: this.action });
                        }
                    }
                })
        }, []) */
        
        super(props)

        const href=window.location.href;
         this.category = href.slice(31);
        console.log(this.category);
        
          

        this.state = {
            step:1,
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
            speciality: this.category,
            experienceNumber: "",
            inami: "",
            password: "",
            repeatPassword: "",
            accreditation:"",
            disabled: false,
         //   plan:""
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
        } else if(name === "plan") {
            this.setState({ plan: {id:Number(event.target.value)} });
            console.log("plan.id : " ,this.state.plan);
        } else {
            this.setState({ [name]: event.target.value });
        }
    };

    resetFields = () => {
        this.setState({
            step:1,
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
            accreditation: "",
            inami: "",
           // plan:"",
            profilePhoto: "",
        });
    }

    action = key => (
        <Button style={{ color: "#FFF" }} onClick={() => { this.props.closeSnackbar(key) }}>
            Fermer
        </Button>
    );
    
    handleSubmit = async (event) => {
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
            speciality,
            accreditation,
            inami,
            //plan
      
        } = this.state;
console.log("this.state " , this.state)
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
                profession: "Technicien",
                speciality: speciality,
                accreditation,
               
                photoCabinet: [],
              //  plan
            }

            if (this.state.profilePhoto) {
                const resImg = await uploadImage(this.state.profilePhoto);
                if (resImg.url) {
                    data.photoUrl = resImg.url
                }
            }
if (data.speciality=="Plumber"){
            axios.post('http://192.168.1.113:5000/auth/signupplombier', data, {
                cancelToken: source.token
            })
       
                .then((res) => {
                    console.log("data = "+data);
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
                        console.log(err.response.data)
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


        if (this.category=="plombier"){
            axios.post('http://192.168.1.113:5000/auth/signupplombier', data, {
                cancelToken: source.token
            })
       
                .then((res) => {
                    console.log("data = "+data);
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
                        console.log(err.response.data)
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

        if (this.category=="soudeur"){
            axios.post('http://192.168.1.113:5000/auth/signupsoudeurr', data, {
                cancelToken: source.token
            })
       
                .then((res) => {
                    console.log("data = "+data);
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
                        console.log(err.response.data)
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

        if (this.category=="paysagiste"){
            axios.post('http://192.168.1.113:5000/auth/signuppaysagiste', data, {
                cancelToken: source.token
            })
       
                .then((res) => {
                    console.log("data = "+data);
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
                        console.log(err.response.data)
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

        if (this.category=="menuisier"){
            axios.post('http://192.168.1.113:5000/auth/signupmenuisier', data, {
                cancelToken: source.token
            })
       
                .then((res) => {
                    console.log("data = "+data);
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
                        console.log(err.response.data)
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

        if (this.category=="peintre"){
            axios.post('http://192.168.1.113:5000/auth/signuppeintre', data, {
                cancelToken: source.token
            })
       
                .then((res) => {
                    console.log("data = "+data);
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
                        console.log(err.response.data)
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
        if (this.category=="electricien"){
            axios.post('http://192.168.1.113:5000/auth/signupelectricien', data, {
                cancelToken: source.token
            })
       
                .then((res) => {
                    console.log("data = "+data);
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
                        console.log(err.response.data)
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
        if (this.category=="carreleur"){
            axios.post('http://192.168.1.113:5000/auth/signupcarreleur', data, {
                cancelToken: source.token
            })
       
                .then((res) => {
                    console.log("data = "+data);
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
                        console.log(err.response.data)
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
    }

    onPhotoAdded = (NewPhoto) => {
        this.setState({
            profilePhoto: NewPhoto
        })
    }
    componentWillUnmount() {
        if (source) {
            source.cancel("got unmounted");
        }
    }
              // go back to previous step
prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  // proceed to the next step
nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

    render() {
        const { step } = this.state;
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
            repeatPassword,
            speciality,
            inami,
            accreditation,
            disabled ,
            profilePhoto,
            loading,
         //   plan
        } = this.state
const values ={
   
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
    repeatPassword,
    speciality,
    inami,
    accreditation,
    disabled ,
    profilePhoto,
    loading,
  //  plan
}
    
          
            switch (step) {
  case 1: 
   return (
     /*     <PlanPage nextStep={this.nextStep}  values={this.state}/>
    )
  case 2: 
    return ( */
        <SignUp category={this.category} nextStep={this.nextStep} values={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} loading={loading} profilePhoto={profilePhoto} handleLangueChange={this.handleLangueChange} checked={checked} onPhotoAdded={this.onPhotoAdded} />
    )
 
 
  // never forget the default case, otherwise VS code would be mad!
  default: 
     <div> do nothing </div>
}
         
        
    }
}

export default withSnackbar(RegisterTechnician);