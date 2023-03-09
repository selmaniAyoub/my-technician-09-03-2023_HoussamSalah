import * as React from 'react';
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ButtonBase from '@mui/material/ButtonBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GbFlagIcon from '../../../assets/GbFlag';
import FrancaisFlagIcon from '../../../assets/FrancaisFlag';
import PropTypes from 'prop-types'
import {setTranslations,setDefaultLanguage,setLanguageCookie,setLanguage,translate  } from 'react-switch-lang'
import en from '../../../translation/en.json'
import fr from '../../../translation/fr.json'
import { withNamespaces } from 'react-i18next';
import i18n from '../../../translation/i18n'
import { useEffect } from 'react';

/* 
setTranslations ({en,fr});
setDefaultLanguage({en});

setLanguageCookie(); */


const StyledAppBarr = styled(AppBar)`
  background-color: #FFFFFF;
  box-shadow: none;
  z-index:2;
`

const StyledToolbarr = styled(Toolbar)`
margin-left: -15px;
margin-right: -20px;
`

const InfoContainer = styled('div')`
  margin: 0 0 0 0;
  display: flex;
  flex-direction: raw;
  flex-wrap: wrap;

`

const InfoItem = styled('div')`
  display: flex;
  flex-direction: raw;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex-wrap: wrap
`

const StyledPhoneIcon = styled(PhoneIcon)`
  max-width: 30px;
  color: #0066dd;
`

const InfoText = styled(Typography)`
    font-size: 14px;
    margin-left: 8px;
    color: #4d4d4d;
`

const StyledEmailIcon = styled(EmailIcon)`
  max-width: 30px;
  color:milk;
`

const LangContainer = styled('div')`
  display: flex;
  flex-direction: raw;
  margin: 0 0 0 0;
  background-color: #e9e9e9;
  border-radius:30px;
`

const LangItem = styled(ButtonBase)`
  display: flex;
  flex-direction: raw;
  color: #424242;
  padding: 0.5em 1em;
`

const StyledGbFlagIcon = styled(GbFlagIcon)`
  max-width: 30px;
  color: #424242;
`

const StyledFrancaisFlagIcon = styled(FrancaisFlagIcon)`
  max-width: 30px;
  color: #424242;
`

const LangText = styled(Typography)`
    font-size: 14px;
    margin-left: 15px;
    color: #424242;
`

const options = [
  'Français',
  'English',
];

const SelectedFlag = ({ val }) => {
 
  const  lng = JSON.parse(localStorage.getItem('lng'));
  if (val) {
   



   if (val === "Français") {
    return <StyledFrancaisFlagIcon />;

  }

  if (val === "English") {
    return <StyledGbFlagIcon />;
    setLanguage(en);
  } 
  } else {
    return <StyledGbFlagIcon />;
  }
  return null;
}


 function LanguageTranslation({ t }) {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    if (index === 0) {
      i18n.changeLanguage("fr");
      localStorage.setItem('lng', JSON.stringify('fr'));
      localStorage.setItem('lngindex', JSON.stringify(0));
    }
    else{
      i18n.changeLanguage("en");
      localStorage.setItem('lng', JSON.stringify('en'));
      localStorage.setItem('lngindex', JSON.stringify(1));
    }
    setSelectedIndex(index);
    
    setAnchorEl(null);


  };
useEffect(() => {
  const  index = JSON.parse(localStorage.getItem('lngindex'));
  setSelectedIndex(index);
}, [])

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    
     
        <StyledToolbarr>
       
         <LangContainer>
            <LangItem
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickListItem}
            >
              <SelectedFlag val={options[selectedIndex]} />
              <LangText>
                {options[selectedIndex] ? options[selectedIndex]:options[1]}
              </LangText>
            </LangItem>
          </LangContainer> 
    
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}

          >
            {options.map((option, index) => (
              <MenuItem
                style={{ minWidth: 150, justifyContent: "start" }}
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                <SelectedFlag val={option} />
                <LangText>
                  {option}
                </LangText>
              </MenuItem>
            ))}
          </Menu>
        </StyledToolbarr>
      
   
  );
}
export default withNamespaces() (LanguageTranslation);