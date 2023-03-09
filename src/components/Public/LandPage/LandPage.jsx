import {React ,useEffect} from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import TechnicianImg from '../../../assets/electri.jpg'
import Typography from '@mui/material/Typography'
import { NavLink } from "react-router-dom"
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import en from '../../../translation/en.json'
import fr from '../../../translation/fr.json'
import { withNamespaces } from 'react-i18next';
import i18n from '../../../translation/i18n'

const MainContainer = styled(Container)`
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

border-radius:100px;
    position: relative;
   
    margin-top: 10px;
    margin-left: 50px;
    margin-right: 50px;
    height: 65vh;
    
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: #ccecff;
    
    @media only screen and (max-width: 900px){
        height: auto;
        margin-left: 25px;
        margin-right: 25px;
    }
    min-height: 550px;
`

const LeftSide = styled('div')`
    display: flex;
    width: 50%;
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
    align-items: center;
    @media only screen and (max-width: 900px){
        width: 100%;
        justify-content: center;
    }
`

const LandImg = styled('img')`
    display: flex;
    
    width: 100%;
    border-radius:100px;
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
      font-size: 30px;
      margin-top:30px;
     
  }
`

const Description = styled(Typography)`
  margin-top: 20px;
  font-family: 'Montblanc', sans-serif;
                                                
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #2a2a2a;
  max-width: 610px;
  line-height: 1.9em;
`

const BtnsContainer = styled('div')`
    display: flex;
    justify-content: center;
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

 function LandPage({t}) {

useEffect(() => {
    localStorage.removeItem('searchData');
}, [])


    return (
        <LandBg>
            <MainContainer maxWidth="lg" style={{ flexGrow: 1 ,marginBottom:"30px"}}>
                <LeftSide>
                     <SubHeader></SubHeader> 
                    <Header variant="h1"> {t('WELCOME TO MY CRAFTSMAN HELPER')} </Header>
                    <Description variant="h2"> <p>{t('- Are you looking to find new customers or new craft projects?')}</p> <p>{t('- Do you need the professional services of a craftsman?')}</p><p> {t('You are in the right place !!')}</p><p> {t('What are you waiting for to start with us? :')}</p> </Description>
                    <BtnsContainer>
                        <PrimaryButton LinkComponent={NavLink} to="/find-a-technician" variant="contained">
                            {t('Technician')} 
                        </PrimaryButton>
                        <SecondaryButton LinkComponent={NavLink} to="/contact">
                            {t('Contact')}
                        </SecondaryButton>
                    </BtnsContainer>
                </LeftSide>
                <RightSide>
                    <LandImg src={TechnicianImg}/>
                </RightSide>
                
            </MainContainer>
        </LandBg>
    )
}
export default withNamespaces( )(LandPage);