import React from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
// import TechnicianIcon from '../../../assets/TechnicianIcon'
import Container from '@mui/material/Container'
import AboutUsImage from '../../../assets/about-us-img.png'
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import TechnicianDesktop from '../../../assets/tech.jpg';
import en from '../../../translation/en.json'
import fr from '../../../translation/fr.json'
import { withNamespaces } from 'react-i18next';
import i18n from '../../../translation/i18n'


const MainContainer = styled(Container)`
    display: flex; 
    flex-direction: rows;
    flew-wrap: wrap;
    margin-top: 100px;
    @media only screen and (max-width: 900px){
        
        padding: 0 !important;
        flex-direction: column-reverse;
        margin-top: 0;
    } 
`

const ContentContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 1em;
    @media only screen and (max-width: 900px){
        
        justify-content: center;
        width: 100%;
    }
`

const ImgContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: center;
    @media only screen and (max-width: 900px){
        width: 100%;
        align-items: center;
    }
`


const Header = styled(Typography)`
    font-size: 50px;
    font-weight: 600;
    letter-spacing: 1px;
    line-height: 1.2em;
    @media only screen and (max-width: 1024px){
        font-size: 35px;
    }  
    @media only screen and (max-width: 320px){
        font-size: 30px;
    } 
    max-width: 600px; 
`

const DescriptionText = styled(Typography)`
    font-size: 16px;
    letter-spacing: 1px;
    margin-top: 20px;
    color: #444444;
    line-height: 1.9em;
    max-width: 600px;
    @media only screen and (max-width: 1024px){
        font-size: 14px;
    }  
`

const Img = styled('img')`
    width: 90%;
    max-width: 500px;
    @media only screen and (max-width: 900px){
        margin-top: 30px;
        max-width: 400px;
    }
`

const CtaBtn = styled(Button)`
    margin: 30px auto 0 0;
    border-radius: 100px;
    min-width: 180px;
    padding: 8px 16px;
    box-shadow: none;
    font-weight: 600;
   
`


 function AboutUs({t}) {
    return (
        <MainContainer>
            <ImgContainer>
                <Img src={TechnicianDesktop} />
            </ImgContainer>
            <ContentContainer>
                <Header variant="h2">{t('MY-CRAFT-SOLUTION')}  </Header>
                <DescriptionText>
                {t('Our platform, filled with talents and skilled artisans from several sectors (gardener, electrician ...etc.). Its mission is to revolutionize the world of artisans, by connecting qualified and reliable professionals, who are looking to find rapidly new customers and projects, with people and companies who need their services.')}
                </DescriptionText>
                <CtaBtn component={NavLink} to="/about-us" variant="contained">
                {t('WHO WE ARE')}
                                </CtaBtn>
            </ContentContainer>
        </MainContainer>
    )
}
export default withNamespaces() (AboutUs);