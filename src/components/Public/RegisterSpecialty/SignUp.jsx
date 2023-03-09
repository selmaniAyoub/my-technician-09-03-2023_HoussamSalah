import React, {useEffect,useState, Component } from 'react';
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
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import Paper from '@mui/material/Paper';
import { translate } from 'react-i18next';
import { compose } from "recompose";

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
    margin-top:50px;
`

const MainContainer = styled(Container)`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow: hidden;
    @media only screen and (max-width: 900px){
        padding: 32px 16px !important;
        flex-direction: column
mn;
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

    const SignUp =({category,props,t,nextStep,values,handleChange,handleSubmit,loading,profilePhoto,handleLangueChange,checked,onPhotoAdded})=> {
    
   
const [cat, setCat] = useState("")
        useEffect(() => {
          const  lng = JSON.parse(localStorage.getItem('lng'));
          const  cat = JSON.parse(localStorage.getItem('category'))
          setCat(cat);
        console.log("cat = ",cat)
        }, [])

    

        return (
            loading ?
            <LoadingContainer>
                <CircularProgress />
            </LoadingContainer>
            :
            <BgRegister>
            <MainContainer>
                <StyledCard elevation={2}>
             
                    <Form onSubmit={ function(event){handleSubmit(event) } }>
                        <LoginHeader variant='h1'> {t('SignUp')} {cat}
                        </LoginHeader>
                        
                        <ImgSide elevation={0}>
                                <RenderImg profilePhoto={profilePhoto}   />
                                <UploadProfileImg onPhotoAdded={onPhotoAdded} profilePhoto={profilePhoto} loading={loading} />
                            </ImgSide>
                        <SideBySideInput>
                            <StyledFormControll variant="filled" required>
                                <TextField 
                                    type="text"
                                    onChange={handleChange("firstName")}
                                    id="standard-basic-firstName"
                                    label= {t("First Name")}
                                    variant="filled"
                                    required
                                    value={values.firstName}
                                    disabled={values.disabled}
                                    inputProps={{
                                        maxLength: "26",
                                        minLength: "2"
                                    }}
                                />
                            </StyledFormControll>
                            <StyledFormControll variant="filled" required>
                                <TextField
                                    type="text"
                                    onChange={handleChange("lastName")}
                                    id="standard-basic-lastName"
                                    label={t('LastName')}
                                    variant="filled"
                                    required
                                    value={values.lastName}
                                    disabled={values.disabled}
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
                                    onChange={handleChange("email")}
                                    id="standard-basic-email"
                                    label="E-mail"
                                    variant="filled"
                                    required
                                    value={values.email}
                                    disabled={values.disabled}
                                    inputProps={{
                                        maxLength: "62",
                                        minLength: "3"
                                    }}
                                />
                            </StyledFormControll>
                            <StyledFormControll variant="filled" required>
                                <TextField
                                    type="tel"
                                    onChange={handleChange("phoneNumber")}
                                    id="standard-basic-phoneNumber"
                                    label={t('Phone Number')}
                                    variant="filled"
                                    required
                                    value={values.phoneNumber}
                                    disabled={values.disabled}
                                    inputProps={{
                                        maxLength: "35",
                                        minLength: "3"
                                    }}
                                />
                            </StyledFormControll>
                        </SideBySideInput>


                        <SideBySideInput>
                      
                            <StyledFormControll variant="filled" required>
                                <TextField
                                    type="number"
                                    onChange={handleChange("experienceNumber")}
                                    id="standard-basic-experienceNumber"
                                    label={t('Years Of Experience')}
                                    variant="filled"
                                    required
                                    value={values.experienceNumber}
                                    disabled={values.disabled}
                                    inputProps={{
                                        max: "50",
                                        min: "1"
                                    }}
                                />
                            </StyledFormControll>

                            <StyledFormControll variant="filled" required>
                            <InputLabel id="demo-simple-select-standard-label-1">
                                 Accreditation
                                </InputLabel>
                                <Select
                               
                                    id="demo-simple-select-standard-1"
                                    value={values.accreditation}
                                    onChange={handleChange("accreditation")}
                                    label="accreditation"
                                    required
                                    MenuProps={MenuProps}
                                >
                                    
                                    <MenuItem value="Yes">{t("Yes")}</MenuItem>
                                    <MenuItem value="No">{t("No")}</MenuItem>
                                    
                                </Select>
                            </StyledFormControll>
                        </SideBySideInput>


                        <SideBySideInput>
                      

                            <StyledFormControll variant="filled" required>
                                <InputLabel id="demo-simple-select-standard-label-2">
                                    {t('Language')}
                                </InputLabel>
                                <Select
                                    id="demo-simple-select-standard-2"
                                    value={values.langue}
                                    onChange={handleLangueChange}
                                    label="Langue"
                                    multiple
                                    required
                                    disabled={values.disabled}
                                >
                                    {
                                        languages.map((Language, i) => (
                                            <MenuItem key={i} value={Language}>{t(Language)}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </StyledFormControll>


                            <StyledFormControll variant="filled" required>
                                <InputLabel id="demo-simple-select-standard-label-1">
                                    {t('City')}
                                </InputLabel>
                                <Select
                                    id="demo-simple-select-standard-1"
                                    value={values.ville}
                                    onChange={handleChange("ville")}
                                    label="Pays"
                                    required
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value={""}></MenuItem>
                                    {
                                        belgiqueVilles.map((ville, i) => (
                                            <MenuItem key={i} value={ville}>{t(ville)}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </StyledFormControll>
                            </SideBySideInput>


<SideBySideInput>

                            <StyledFormControll variant="filled" required>
                                <TextField
                                    type="text"
                                    onChange={handleChange("address")}
                                    id="standard-basic-address"
                                    label={t('Adress')}
                                    variant="filled"
                                    required
                                    value={values.address}
                                    disabled={values.disabled}
                                    inputProps={{
                                        maxLength: "95",
                                        minLength: "2"
                                    }}
                                />
                            </StyledFormControll>
                      
                            <StyledFormControll variant="filled" required>
                                <TextField
                                    type="number"
                                    inputProps={{
                                        max: "9999",
                                        min: "1000"
                                    }}
                                    onChange={handleChange("codePostal")}
                                    id="standard-basic-codePostal"
                                    label={t('Postal Code')}
                                    variant="filled"
                                    required
                                    value={values.codePostal}
                                    disabled={values.disabled}
                                />
                            </StyledFormControll>
                            </SideBySideInput>
                        <SideBySideInput>

                          
                       
                            <StyledFormControll variant="filled" required>
                                <TextField
                                    type="password"
                                    onChange={handleChange("password")}
                                    id="standard-basic-password"
                                    label={t('Password')}
                                    variant="filled"
                                    required
                                    value={values.password}
                                    disabled={values.disabled}
                                    inputProps={{
                                        minLength: "8"
                                    }}
                                />
                            </StyledFormControll>
                     

                            <StyledFormControll variant="filled" required>
                                <TextField
                                    type="password"
                                    onChange={handleChange("repeatPassword")}
                                    id="standard-basic-repeatPassword"
                                    label={t('Confirm Password')}
                                    variant="filled"
                                    required
                                    value={values.repeatPassword}
                                    disabled={values.disabled}
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
                                        onChange={handleChange("checked")} name="term and condition"
                                        required
                                        disabled={values.disabled}
                                    />
                                }
                                label={t('I agree with all terms and conditions')}
                            />
                        </WideInputContainer>
                        <RegisterButton loading={values.disabled} type="submit" variant="contained">{t('Register now')}
                        </RegisterButton>
                        <ForgotPsw component={NavLink} to="/login">{t('Already registered? Log in by clicking here')}</ForgotPsw>
                    </Form>
                </StyledCard>
                <SideContent >
                    <SideImg src={RegisterSideImg} />
                </SideContent>
            </MainContainer>
        </BgRegister>
        )
    }


  export default compose (withNamespaces(), withSnackbar)(SignUp);