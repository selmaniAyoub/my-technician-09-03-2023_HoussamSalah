import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { compose } from "recompose";
import LanguageTranslation from ".././LanguageTranslation/index";
import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  setLanguage,
  translate,
} from "react-switch-lang";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ButtonBase from "@mui/material/ButtonBase";
import GbFlagIcon from "../../../assets/GbFlag";
import FrancaisFlagIcon from "../../../assets/FrancaisFlag";

const StyledAppBarr = styled(AppBar)`
  background-color: #ffffff;
  box-shadow: none;
  z-index: auto;
`;

const StyledToolbarr = styled(Toolbar)`
  display: flex;
  justify-content: center;
  background-color: blue;
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: space-between;
   }
`;

const InfoContainer = styled("div")`
  margin: 0 0 0 0;
  display: flex;
  flex-direction: raw;
  flex-wrap: wrap;
`;

const InfoItem = styled("div")`
  display: flex;
  flex-direction: raw;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex-wrap: wrap;
`;

const StyledPhoneIcon = styled(PhoneIcon)`
  max-width: 30px;
  color: #0066dd;
`;

const InfoText = styled(Typography)`
  font-size: 14px;
  margin-left: 8px;
  color: #4d4d4d;
`;

const StyledEmailIcon = styled(EmailIcon)`
  max-width: 30px;
  color: milk;
`;

const LangContainer = styled("div")`
  display: flex;
  flex-direction: raw;
  margin: 0 0 0 0;
  background-color: #e9e9e9;
  border-radius: 30px;
`;

const LangItem = styled(ButtonBase)`
  display: flex;
  flex-direction: raw;
  color: #424242;
  padding: 0.5em 1em;
`;

const StyledGbFlagIcon = styled(GbFlagIcon)`
  max-width: 30px;
  color: #424242;
`;

const StyledFrancaisFlagIcon = styled(FrancaisFlagIcon)`
  max-width: 30px;
  color: #424242;
`;

const LangText = styled(Typography)`
  font-size: 14px;
  margin-left: 15px;
  color: #424242;
`;

const options = ["Français", "English"];

const SelectedFlag = ({ val }) => {
  const lng = JSON.parse(localStorage.getItem("lng"));
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
};
const StyledAppBar = styled(AppBar)`
  background-color: white;
  box-shadow: none;
  position: fixed;
  z-index: 2;
  top: 0;
  display:flex;
  
`;

const StyledToolbar = styled(Toolbar)`
  background-color: white;
  display: flex;
  backgroud-color:red;
  @media only screen and (max-width: 1024px) {
   display: flex;
   justify-content: space-between;
  }
 
`;

const BtnLink = styled(NavLink)`
  text-decoration: none;
 
`;

const StyledLogo = styled("img")`
display: flex;

margin-left: 50px;

  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 85px;
  @media only screen and (max-width: 1024px) {
    max-width: 90px;
  }
  @media only screen and (max-width: 899px) {
    max-width: 90px;
  }
`;

const LinksContainer = styled("div")`

display: flex;

align-items: center;
margin: auto auto auto 10%;
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

const PageLink = styled(NavLink)`

  text-decoration: none;
  margin: -10px;
  color: #0066dd;
  font-size: 16px;
  font-weight: 700;
  transition: color 0.3s;
  text-transform: capitalize;
  &:hover {
    color: #014bac;
  }
`;

const ContactContainer = styled("div")`

background-color: #0066dd;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-weight: 600;
  outline-width: 0;
  text-transform: uppercase;
  border-radius: 100px;
   &:hover {
    background-color: #014bac;
  }
  @media only screen and (max-width: 600px) {
    font-size: 12px;
   }
 
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

const LoginLink = styled(NavLink)`
  text-decoration: none;
  padding: 0;
  margin: auto 30px auto 0;
  color: #0066dd;
  font-weight: 700;
  font-size: 17px;
`;

const ContactButton = styled(Button)`
  letter-spacing: 0.5px;
  color: #ffffff;
  font-size: 12px;
  background-color: #0066dd;
  text-transform: uppercase;
  transition: 0.3s;
  &:hover {
    background-color: #014bac;
  }
  
  font-weight: 600;
  outline-width: 0;
  border-radius: 100px;
  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const StyledIconButton = styled(IconButton)`
  @media only screen and (min-width: 1025px) {
    display: none;
  }
`;

const AccountBtn = styled(Button)`
color:white;
  box-shadow: none;
  font-weight: 600;
display: flex;
flex-wrap:wrap;
  border-radius: 100px;

  .MuiSvgIcon-root {
    font-size: 30px;
  }
`;

function HomeNavigation(props, { t }) {
  useEffect(() => {
    const index = JSON.parse(localStorage.getItem("lngindex"));
    setSelectedIndex(index);
  }, []);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    if (index === 0) {
      i18n.changeLanguage("fr");
      localStorage.setItem("lng", JSON.stringify("fr"));
      localStorage.setItem("lngindex", JSON.stringify(0));
    } else {
      i18n.changeLanguage("en");
      localStorage.setItem("lng", JSON.stringify("en"));
      localStorage.setItem("lngindex", JSON.stringify(1));
    }
    setSelectedIndex(index);

    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(false);
  };

  const SideList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <Toolbar />
      <Divider />

      {props?.system?.loggedIn ? (
        <>
          <ListItem component={NavLink} to="/home" button>
            <ListItemText primary={props.t("Accueil")} />
          </ListItem>
          <ListItem component={NavLink} to="/dashboard" button>
            <ListItemText primary={props.t("Mon Compte")} />
          </ListItem>
          
          <ListItem component={NavLink} to="/Concept" button>
            <ListItemText primary={props.t("Concept")} />
          </ListItem>
          <ListItem component={NavLink} to="/services" button>
            <ListItemText primary={props.t("Search")} />
          </ListItem>
          <ListItem component={NavLink} to="/Particulier" button>
            <ListItemText primary={props.t("Particulier")} />
          </ListItem>

          <ListItem component={NavLink} to="/Technicien" button>
            <ListItemText primary={props.t("Technicien")} />
          </ListItem>

          <ListItem component={NavLink} to="/about-us" button>
            <ListItemText primary={props.t("Qui sommes-nous?")} />
          </ListItem>

          <ListItem component={NavLink} to="/contact">
            <ListItemText primary={props.t("Contact")} />
          </ListItem>
        </>
      ) : (    

        <>
          <ListItem component={NavLink} to="/home" button>
            <ListItemText primary={props.t("Accueil")} />
          </ListItem>
      
          <ListItem component={NavLink} to="/Concept" button>
            <ListItemText primary={props.t("Concept")} />
          </ListItem>
          <ListItem component={NavLink} to="/services" button>
            <ListItemText primary={props.t("Search")} />
          </ListItem>
          <ListItem component={NavLink} to="/Particulier" button>
            <ListItemText primary={props.t("Particulier")} />
          </ListItem>

          <ListItem component={NavLink} to="/Technicien" button>
            <ListItemText primary={props.t("Technicien")} />
          </ListItem>

          <ListItem component={NavLink} to="/about-us" button>
            <ListItemText primary={props.t("Qui sommes-nous?")} />
          </ListItem>

          <ListItem component={NavLink} to="/contact">
            <ListItemText primary={props.t("Contact")} />
          </ListItem>
          
          <ListItem component={NavLink} to="/login" button>
            <ListItemText primary={props.t("Connexion")} />
          </ListItem>
          <ListItem component={NavLink} to="/register-technicians" button>
            <ListItemText primary={props.t("SignUp As A Technician")} />
          </ListItem>
          <ListItem component={NavLink} to="/register" button>
            <ListItemText primary={props.t("SignUp As A Client")} />
          </ListItem>
        </>
      )}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        
          <StyledToolbar>
            <StyledIconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, color: "#222" }}
            >
              <MenuIcon />
            </StyledIconButton>

            <BtnLink to="/home">
              <StyledLogo src={Logo} style ={{marginRight:"20px"}}/>
            </BtnLink>

            {props?.system?.loggedIn ? (
              <LinksContainer>
                      <PageLink to="/home">{props.t("Accueil")}</PageLink>     
                       <PageLink to="/concept">{props.t("Concept")}</PageLink> 
                           
                <PageLink to="/find-a-technician">{props.t("Search")}</PageLink>
                             
                <PageLink to="/particulier">{props.t("Particulier")}</PageLink> 
                           
                <PageLink to="/technicien">{props.t("Technicien")}</PageLink>   
                         
                <PageLink to="/about-us">
                  {props.t("Qui sommes-nous?")}
                </PageLink>
                             
               <PageLink to="/contact">{props.t("Contactez-Nous")}</PageLink>         
                     
              </LinksContainer>
            ) : null}

            {props?.system?.loggedIn ? (
              <ContactContainer>
                <AccountBtn
                  startIcon={<PersonIcon />}
                  LinkComponent={NavLink}
                  to="/dashboard"
                  variant="contained"
                >
                  {props.t("Mon Compte")}
                </AccountBtn>
              </ContactContainer>
            ) : (
              <LinksContainer>
                    <PageLink to="/home">{props.t("Accueil")}</PageLink>     
                     <PageLink to="/Concept">{props.t("Concept")}</PageLink> 
                         
              <PageLink to="/find-a-technician">{props.t("Search")}</PageLink>
                           
              <PageLink to="/Particulier">{props.t("Particulier")}</PageLink> 
                         
              <PageLink to="/Technicien">{props.t("Technicien")}</PageLink>   
                       
              <PageLink to="/about-us">
                {props.t("Qui sommes-nous?")}
              </PageLink>
                           
              <PageLink to="/contact">{props.t("Contact")}</PageLink>         
                   
              <PageLink to="/login">{props.t("Connexion")}</PageLink>       
             <ContactContainer>  
                <AccountBtn

                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  focusRipple
                >
                  {props.t("Register")}
                </AccountBtn></ContactContainer>
                </LinksContainer>
            )}  
            
             <LanguageTranslation />
          </StyledToolbar>
        
   
     
      </StyledAppBar>

      <Menu
        style={{  }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={handleClose}
          component={NavLink}
          to="/register-technicians"
        >
          {props.t("Register As Technician")}
        </MenuItem>
        <MenuItem onClick={handleClose} component={NavLink} to="/register">
          {props.t("Register As Client")}
        </MenuItem>
      </Menu>

      <Drawer anchor={"left"} open={open} onClose={handleDrawerClose}>
        <SideList />
      </Drawer>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  system: state.system,
});

export default compose(withNamespaces())(
  connect(mapStateToProps)(HomeNavigation)
);
