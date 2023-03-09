import React, { useState } from "react";
import { useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { styled } from "@mui/material/styles";
import consultImg from "./logo.png";
import Typography from "@mui/material/Typography";
import en from "../../translation/en";
import fr from "../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../translation/i18n";
import { useSnackbar } from "notistack";
import axios from "axios";
import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "../../assets/FacebookIcon";
import InstagramIcon from "../../assets/InstagramIcon";
import LinkedinIcon from "../../assets/LinkedinIcon";
import Link from "@mui/material/Link";
import { zIndex } from "@mui/material/styles/zIndex";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
//const FORM_ENDPOINT = "https://public.herotofu.com/v1/EXAMPLE_FORM_ID";
//TODO - fill on the later step

const Img = styled("img")`
  display: flex;
  width: 70%;
  max-width: 300px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 30px;
`;
const form = styled("div")`
  width: 50%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin-top: 30%;
  text-decoration: none;
  border-radius: 10px;
  padding: 10px;
  flex-wrap: wrap;
  border: 1px solid #999;
  border: inset 1px solid #333;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Form = styled("form")`
  width: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
`;

const MainContainer = styled("div")`
  margin-top: 100px;
  margin-bottom: 100px;

  @media only screen and (max-width: 900px) {
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;
const Main = styled("div")`
  width: auto;
  padding-top: 30px;

  margin: auto;
  border-radius: 20px;
  padding-bottom: 50px;
  max-width: 1500px;
  display: row;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 900px) {
    width: 90%;
  }
  @media only screen and (max-width: 400px) {
    width: 98%;
  }
`;
const Section = styled("div")`
  display: flex;
  flex-direction: row;

  justify-content: center;

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

const StyledListItem = styled(ListItem)`
  margin-top: 10px;
`;

const SocialMediaContainer = styled("h1")`
  display: flex;
  flex-direction: column;
  justify-content: space-arround;

  margin-top: 50px;
`;
const StyledPhoneIcon = styled(PhoneIcon)`
  font-size: 50px;
  color: #0066dd;
`;
const StyledLocationIcon = styled(LocationIcon)`
  font-size: 50px;
  color: #0066dd;
`;
const StyledEmailIcon = styled(EmailIcon)`
  font-size: 50px;
  color: #0066dd;
`;
const Label = styled("div")`
  margin-left: 50px;

  text-decoration: none;
  font-size: 17px;
  color: #5a5a5a;
`;
const label = styled("div")`
  text-decoration: none;
  font-size: "20px";
  color: #5a5a5a;
`;

const StyledFacebookIcon = styled(FacebookIcon)`
  font-size: 50px;
  color: #0066dd;
`;

const StyledInstagramIcon = styled(InstagramIcon)`
  font-size: 50px;
  color: #0066dd;
`;

const StyledLinkedinIcon = styled(LinkedinIcon)`
  font-size: 50px;
  color: #0066dd;
`;

const Container = styled(
  "div"
)`    margin: 50px 0;    @media only screen and (max-width: 900px){        margin-top: 10px;    }    padding: 24px;    @media only screen and (max-width: 600px){        padding: 8px;    }  `;

const LandBg = styled("div")`
  display: flex;
  align-items: center;
  border-radius: 100px;

  padding: 0px 50px 0 50px;

  margin: 100px 30px 100px 0;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #ccecff;
  @media only screen and (max-width: 600px) {
    padding: 0px 50px 25px 50px;

    margin: 0px 30px 100px 30px;
  }
  @media only screen and (max-width: 900px) {
  }
`;

const Contact = ({ t }) => {
  const action = (key) => (
    <Button
      style={{ color: "#FFF" }}
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      Close
    </Button>
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [contactData, setContactData] = useState({
    name: "",
    sender: "",
    receiver: "info@my-craft-solutions.be",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeNumber = (event) => {
    console.log("event =", event);
    setContactData({
      ...contactData,
      phoneNumber: event,
    });
  };

  const handleSendEmail = async (event, data) => {
    event.preventDefault();
    console.log("contactData:  ", contactData);
    data.phoneNumber = "00" + data.phoneNumber;
    axios
      .post("http://192.168.1.113:5000/emails/send-email", data, {})

      .then((res) => {
        console.log("Email was sent successfully : ", data);

        setContactData({
          name: "",
          sender: "",
          receiver: "info@my-craft-solutions.be",
          phoneNumber: "",
          message: "",
        });

        enqueueSnackbar("Email was sent successfully!", {
          variant: "warning",
          action,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
        <div className="text-2xl">{t("Thank you")}!</div>
        <div className="text-md">{t("We'll be in touch soon")}.</div>
      </>
    );
  }

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
            marginTop: "-165px",
            fontSize: "50px",
            fontWeight: "bold",
            color: "white",
            filter: "brightness(1)",
            brightness: "white",
          }}
        >
          Contact
        </h1>
      </div>
      <h1
        style={{
          fontSize: "40px",

          color: "#2a2a2a",
          fontWeight: "bold",
          fontFamily:
            ("IBM Plex Sans",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "Helvetica Neue",
            "Arial",
            "sans-serif",
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol"),
        }}
      >
        {t("Contactez-Nous Maintenant")}
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",

          justifyContent: "space-arround ",
          ...(window.innerWidth <= 600 && {
            flexDirection: "column",
          }),
        }}
      >
        <Main>
          <Img src={consultImg} />

          <Form onSubmit={(event) => handleSendEmail(event, contactData)}>
            <div className="mb-3 pt-0">
              <input
                type="text"
                placeholder={t("Your name")}
                name="name"
                value={contactData.name}
                onChange={handleChange}
                className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                required
              />
            </div>
            <div className="mb-3 pt-0">
              <input
                type="email"
                placeholder="Email"
                name="sender"
                onChange={handleChange}
                value={contactData.sender}
                className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                required
              />
            </div>
            <div className="mb-3 pt-0">
              <PhoneInput
                inputStyle={{
                  width: "370px",focus:"ringWFull"
                
                }}
                country={"be"}
                name="phoneNumber"
                value={contactData.phoneNumber}
                onChange={handleChangeNumber}
              />
            </div>
            <div className="mb-3 pt-0">
              <textarea
                placeholder={t("Your message")}
                onChange={handleChange}
                name="message"
                value={contactData.message}
                className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                required
              />
            </div>
            <div className="mb-3 pt-0">
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                {t("Send a message")}
              </button>
            </div>
          </Form>
        </Main>

        <Section>
          {/* <ContactText vaiant="body1">
                            {t('FOLLOW')}
                                                        </ContactText> */}
          <LandBg>
            <SocialMediaContainer>
              <Link
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
                href="tel:0483 392 334"
              >
                <StyledPhoneIcon />
                <Label>Tel: 0483 392 334</Label>
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
                href="mailto:info@my-craft-solutions.be"
              >
                <StyledEmailIcon />
                <Label>Mail: info@my-craft-solutions.be</Label>
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
                href="https://www.google.com/maps/place/Regus+Brussels+West+Basilix/@50.8716964,4.2866205,17z/data=!3m1!4b1!4m6!3m5!1s0x47c3c16aa2f8b46d:0x8957a86530f9e733!8m2!3d50.8716964!4d4.2888092!16s%2Fg%2F1ptwtzr_9"
              >
                <StyledLocationIcon />
                <Label>
                  {t('Adresse')}: Bridge Building, Av. Charles-Quint 584, 1082
                  Bruxelles
                </Label>
              </Link>

              <Link
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
                href="https://www.facebook.com/profile.php?id=100088758341512"
              >
                <StyledFacebookIcon />
                <Label>My Craft Solutions</Label>
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
                href="https://www.instagram.com/mycraft_solutions/?hl=fr"
              >
                <StyledInstagramIcon />
                <Label>My Craft Solutions</Label>
              </Link>
            </SocialMediaContainer>
          </LandBg>
        </Section>
      </div>
    </HomeLayout>
  );
};
export default withNamespaces()(Contact);
