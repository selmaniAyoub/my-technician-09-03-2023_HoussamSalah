import React from "react";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "../../../assets/FacebookIcon";
import InstagramIcon from "../../../assets/InstagramIcon";
import LinkedinIcon from "../../../assets/LinkedinIcon";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { compose } from "recompose";

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: rows;
  flew-wrap: wrap;
  @media only screen and (max-width: 900px) {
    padding: 0 50px;
  }
`;

const FullWidthFooter = styled("div")`
  width: 100%;
  padding: 50px 0;
  background-color: #082445;
  overflow: hidden;
`;

const Section = styled("div")`
  display: flex;
  flex-direction: column;
  width: 25%;
  min-width: 280px;
  @media only screen and (max-width: 650px) {
    margin: 20px 0 0 0;
  }
`;

const ContactText = styled(Typography)`
  font-size: 22px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 20px 0 5px 0;
  color: #ffffff;
  letter-spacing: 1px;
`;

const StyledListItemText = styled(ListItemText)`
  .MuiTypography-root {
    font-size: 14px !important;
    color: #d4d4d4;
  }
`;

const SectionContainer = styled("div")`
  display: flex;
  flex-direction: rows;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: 650px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledEmailIcon = styled(EmailIcon)`
  color: #d4d4d4;
`;

const StyledPhoneIcon = styled(PhoneIcon)`
  color: #d4d4d4;
`;

const StyledListItem = styled(ListItem)`
  margin-top: 10px;
`;

const SocialMediaContainer = styled("div")`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;

const StyledFacebookIcon = styled(FacebookIcon)`
  font-size: 25px;
  color: #ffffff;
  margin-right: 15px;
`;

const StyledInstagramIcon = styled(InstagramIcon)`
  font-size: 25px;
  color: #ffffff;
  margin-right: 15px;
`;

const StyledLinkedinIcon = styled(LinkedinIcon)`
  font-size: 25px;
  color: #ffffff;
`;

const CopyRightFooter = styled("div")`
  display: flex;
  width: 100%;
  padding: 16px;
  justify-content: center;
  background-color: #001834;
`;

const CopyRightText = styled(Typography)`
  font-size: 16px;
  text-align: center;
  color: #ffffff;
`;

function Footer(props, { t }) {
  return (
    <>
      <FullWidthFooter>
        <MainContainer>
          <SectionContainer>
            <Section>
              <footer style={{ textAlign: "left" }}>
                <p>
                  <span style={{ textDecoration: "overline", color: "white" }}>
                    Informations
                  </span>
                </p>
              </footer>
              <List>
           
                <StyledListItemText  style={{ textAlign: "left" }}>
             <a href="/conditionsdutilisation">     {props.t("Conditions d’utilisation")}{" "}</a>
                </StyledListItemText>
                <StyledListItemText  style={{ textAlign: "left" }}>
                <a href="/politiquedeconfidentialite">     {props.t("Politique de confidentialité")}{" "}</a>
                </StyledListItemText>
                
              </List>
            </Section>

            <Section>
              <footer style={{ textAlign: "left" }}>
                <p>
                  <span style={{ textDecoration: "overline", color: "white" }}>
                    Menu
                  </span>
                </p>
              </footer>{" "}
              <List>
                <StyledListItem
                  component={NavLink}
                  to="/about-us"
                  disablePadding
                >
                  <StyledListItemText>
                    {props.t("About us")}{" "}
                  </StyledListItemText>
                </StyledListItem>
                <StyledListItem
                  component={NavLink}
                  to="/contact"
                  disablePadding
                >
                  <StyledListItemText>
                    {props.t("Contact us")}{" "}
                  </StyledListItemText>
                </StyledListItem>
                <StyledListItem
                  component={NavLink}
                  to="/Particulier"
                  disablePadding
                >
                  <StyledListItemText>
                    {props.t("Particulier")}{" "}
                  </StyledListItemText>
                </StyledListItem>
                <StyledListItem
                  component={NavLink}
                  to="/Technicien"
                  disablePadding
                >
                  <StyledListItemText>
                    {props.t("Technicien")}{" "}
                  </StyledListItemText>
                </StyledListItem>
                <StyledListItem
                  component={NavLink}
                  to="/Concept"
                  disablePadding
                >
                  <StyledListItemText>{props.t("Concept")} </StyledListItemText>
                </StyledListItem>
                {props?.system?.LoggedIn ? (
                  <>
                    <StyledListItem
                      component={NavLink}
                      to="/login"
                      disablePadding
                    >
                      <StyledListItemText>
                        {props.t("Signin")}
                      </StyledListItemText>
                    </StyledListItem>
                    <StyledListItem
                      component={NavLink}
                      to="/register"
                      disablePadding
                    >
                      <StyledListItemText>
                        {props.t("Registration Client")}
                      </StyledListItemText>
                    </StyledListItem>
                    <StyledListItem
                      component={NavLink}
                      to="/register-technicians"
                      disablePadding
                    >
                      <StyledListItemText>
                        {props.t("Registration Technician")}
                      </StyledListItemText>
                    </StyledListItem>
                  </>
                ) : (
                  <>
                    <StyledListItem
                      component={NavLink}
                      to="/dashboard"
                      disablePadding
                    >
                      <StyledListItemText>
                        {props.t("My Account")}
                      </StyledListItemText>
                    </StyledListItem>
                  </>
                )}
              </List>
            </Section>

            <Section>
              <footer style={{ textAlign: "left" }}>
                <p>
                  <span style={{ textDecoration: "overline", color: "white" }}>
                    {props.t("Media Sociaux")}
                  </span>
                </p>
              </footer>

              <SocialMediaContainer>
                <Link href="https://www.facebook.com/profile.php?id=100088758341512">
                  <StyledFacebookIcon />
                </Link>
                <Link href="https://www.instagram.com/mycraft_solutions/?hl=fr">
                  <StyledInstagramIcon />
                </Link>
                <Link href="https://www.linkedin.com/company/itm-bc/people/">
                  <StyledLinkedinIcon />
                </Link>
              </SocialMediaContainer>
            </Section>
            <Section>
            <footer style={{ textAlign: "left" }}>
                <p>
                  <span style={{ textDecoration: "overline", color: "white" }}>
                      {props.t("Bureau De My Craft Solution")}                  </span>
                </p>
              </footer>

              <List>
                <StyledListItem disablePadding>
                  <ListItemIcon style={{ minWidth: 40 }}>
                    <StyledEmailIcon />
                  </ListItemIcon>
                  <StyledListItemText>
                    info@my-craft-solutions.be
                  </StyledListItemText>
                </StyledListItem>
                <StyledListItem disablePadding>
                  <ListItemIcon style={{ minWidth: 40 }}>
                    <StyledPhoneIcon />
                  </ListItemIcon>
                  <StyledListItemText>+32 (0)2 318.99.03</StyledListItemText>
                </StyledListItem>
                
                <StyledListItemText style={{ marginRight: "10", marginLeft: "10", 
              padding: "0px",
              paddingTop: "10px",
              paddingRight: "50px",
              paddingBottom: "30px",
              
               }}>
                {props.t('Adresse')} : Bridge Building, Av. Charles-Quint 584, 1082 {props.t("Bruxelles")}                  </StyledListItemText>
              </List>
            </Section>
          </SectionContainer>
        </MainContainer>
      </FullWidthFooter>
      <CopyRightFooter>
        <CopyRightText>
          {props.t('All rights reserved. © 2023 - 2024 my-craft-solutions.be')}
        </CopyRightText>
      </CopyRightFooter>
    </>
  );
}

const mapStateToProps = (state) => ({
  system: state.system,
});

export default compose(withNamespaces())(connect(mapStateToProps)(Footer));
