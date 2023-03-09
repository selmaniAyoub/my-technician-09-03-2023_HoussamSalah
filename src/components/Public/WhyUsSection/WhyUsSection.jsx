import React from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TechnicianDesktop from '../../../assets/tech.jpg';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import en from '../../../translation/en.json'
import fr from '../../../translation/fr.json'
import { withNamespaces } from 'react-i18next';
import i18n from '../../../translation/i18n'
import { NavLink } from "react-router-dom"
import Button from '@mui/material/Button'
import CircularProgress from "@mui/material/CircularProgress";
const MainContainer = styled(Container)`
    display: flex; 
    flex-direction: rows;
    flew-wrap: wrap;
    @media only screen and (max-width: 900px){
        padding: 0 !important;
        flex-direction: column;
        margin-top: 0;
    } 
`

const BgSection = styled('div')`
    width: 100%;
    margin-top: 100px;
    padding: 100px 0;
    background-color: #e8f6ff;
    @media only screen and (max-width: 900px){
        margin-top: 25px;
        padding: 25px 0;
    }
`

const ContentContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 1em;
    @media only screen and (max-width: 900px){
        width: 100%;
    }
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
    font-size: 13px;
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
const ImgContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: center;
    align-items: end;
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
    margin-bottom: 10px;
    color: #444444;
    line-height: 1.7em;
    max-width: 600px;
    @media only screen and (max-width: 1024px){
        font-size: 14px;
    }  
`

const Img = styled('img')`
    width: 90%;
    max-width: 600px;
    @media only screen and (max-width: 900px){
        margin-top: 30px;
        max-width: 400px;
    }
`

const StyledListItemText = styled(ListItemText)`
    .MuiTypography-root{
        font-size: 16px !important;
    }
`


function WhyUsSection({t}) {
    return (
        <BgSection>
            <MainContainer>
                <ContentContainer>
                    <Header variant={'h2'}>{t('Why should you use our platform?')}
</Header>
                    <DescriptionText variant={'body1'}>
                    {t('We strive to lead and improve your business in the right direction through:')}
 


                    </DescriptionText>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon style={{ minWidth: 40 }}>
                                <CheckCircleIcon style={{ color: "#34b233", fontSize: 30 }} />
                            </ListItemIcon>
                            <StyledListItemText>
                            {t('Finding new customers quickly, easily and close to you through our databases')}
                            </StyledListItemText>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon style={{ minWidth: 40 }}>
                                <CheckCircleIcon style={{ color: "#34b233", fontSize: 30 }} />
                            </ListItemIcon>
                            <StyledListItemText>
                            {t('Joining several companies that need their skills')} 
                            </StyledListItemText>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon style={{ minWidth: 40 }}>
                                <CheckCircleIcon style={{ color: "#34b233", fontSize: 30 }} />
                            </ListItemIcon>
                            <StyledListItemText>
                             {t('Saving time by using our services')}
                            </StyledListItemText>
                        </ListItem>
                    </List>
                    <BtnsContainer>
                    <PrimaryButton LinkComponent={NavLink} to="/register-technicians" variant="contained">
                    {t('Are you a professional? Join our platform!')}
                        </PrimaryButton>
                   </BtnsContainer>
                        
                </ContentContainer>
                <ImgContainer>
                    <Img src={TechnicianDesktop} />
                </ImgContainer>
            </MainContainer>
        </BgSection>
    )
}
export default withNamespaces() (WhyUsSection);