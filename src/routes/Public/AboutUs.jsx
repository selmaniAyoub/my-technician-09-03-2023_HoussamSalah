import React from 'react'
import HomeLayout from '../../layouts/HomeLayout'
//import React from 'react'
import { styled } from '@mui/material/styles'
//import Container from '@mui/material/Container'
import TechnicianImg from './../../assets/about.jpg'
import Typography from '@mui/material/Typography'
import { NavLink } from "react-router-dom"
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import en from '../../translation/en'
import fr from '../../translation/fr.json'
import { withNamespaces } from 'react-i18next';
import i18n from '../../translation/i18n'

const Container = styled("div")`
margin: 50px 0;
    @media only screen and (max-width: 900px){
        margin-top: 10px;
    }
    padding: 24px;
    @media only screen and (max-width: 600px){
            padding: 8px;
    }
  `;
const MainContainer = styled(Container)`
margin-top: -50px ;
    @media only screen and (max-width: 900px){
        padding: 32px 16px !important;
    }
    
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 100%;
    flex-direction: row;
    overflow: hidden;
    @media only screen and (max-width: 900px){
        flex-direction: row;
    }
`

const LandBg = styled('div')`
    position: relative;
    left: 0;
    margin: 0;
    padding: 0;
    height: 65vh;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: #ccecff;
    @media only screen and (max-width: 900px){
        height: auto;
    }
    min-height: 550px;
`

const LeftSide = styled('div')`
    display: flex;
    width: 55%;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 5%;
    @media only screen and (max-width: 900px){
        width: 100%;
    }
`

const RightSide = styled('div')`
    display: flex;
    width: 45%;
    align-items: end;
    @media only screen and (max-width: 900px){
        width: 100%;
        justify-content: center;
    }
`

const AboutImg = styled('img')`
    display: flex;
    width: 100%;
    max-width: 600px;
    @media only screen and (max-width: 900px){
        width: 90%;
        margin-top: 20px;
        max-width: 400px;
    }
`

const SubHeader = styled(Typography)`
  font-size: 16px;
  letter-spacing: 0.5px;
  color:milk;
  font-weight: bold;
  text-transform: uppercase;
`

const Header = styled(Typography)`
  font-size: 45px;
  letter-spacing: 0.5px;
  color: #2a2a2a;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 5px;
  @media only screen and (max-width: 900px){
      font-size: 35px;
  }
`

const Description = styled(Typography)`
  margin-top: 20px;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #2a2a2a;
  
  line-height: 1.7em;
`

const BtnsContainer = styled('div')`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
`

const PrimaryButton = styled(Button)`
    letter-spacing: 0.5px;
    color: #FFFFFF;
    font-size: 18px;
    transition: 0.3s;
    font-weight: 600;
    padding: 10px 25px;
    border-radius: 100px;
    box-shadow: none;
    @media only screen and (max-width: 600px){
        font-size: 16px;
    }
    margin: 15px 15px 0 0;
`

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

 function AboutUs({t}) {
    return (
        <HomeLayout>
              <Container
        style={{
          wordWrap: "break-word",
          backgroundImage: `url(${"https://my-craft-solutions.be/wp-content/uploads/2022/12/cropped-zz.jpg"})`,
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",

          position: "relative",
          filter: "brightness(0.7)",
          height: "180px",
        }}
      ></Container>
      <div
        className="col-sm-8 col-sm-offset-2 col-xs-12"
        style={{
          filter: "brightness(1)",
          brightness: "white",
        }}
      >
        <h1
          className="page__title entry-title"
          style={{
            marginTop: "-170px",
            color: "white",
            fontSize: "50px",
            fontWeight: "bold",
            filter: "brightness(1)",
            brightness: "white",...(window.innerWidth <= 600 && {
              marginTop: "-195px",
            })
          }}
        >
          {t("Qui Sommes-Nous?")}
  
        </h1>
      </div>

            <MainContainer maxWidth="lg" style={{ flexGrow: 1 }}>
                <LeftSide>
                     
                    <Header variant="h1">{t('FIND YOUR TECHNICIAN NEARBY.')}</Header>
                    <Description variant="h2">{t('The my-craft solution is a web-based application created by M & Y Solutions to be used in order to link artisans, crafters, and skilled professionals with potential clients. Additionally, it makes it easier or less stressful for clients to look for qualified professional. The technician part and the client part are the two basic components of these web application. While clients visit the application, create an account by filling in all necessary information, and search for the nearest technician by using the city name, postal code, or language, technicians visit the application, register by filling in all necessary details that are secure, update their profiles, and wait for matches. For simple and efficient communication, My-craft-solution offers clients the option to look for a technician based on language.')}</Description>
                </LeftSide>
                <RightSide>
                    <AboutImg src={TechnicianImg}/>
                </RightSide>
            </MainContainer>
        </HomeLayout>
    )
}
export default withNamespaces() (AboutUs);