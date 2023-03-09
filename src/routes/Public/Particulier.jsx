import React, { useState } from "react";
import { useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { styled } from "@mui/material/styles";
import consultImg from "./photo.jpg";

import en from "../../translation/en";
import fr from "../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../translation/i18n";
import { original } from "@reduxjs/toolkit";
import Typography from "@mui/material/Typography";

const FORM_ENDPOINT = "https://public.herotofu.com/v1/EXAMPLE_FORM_ID";
//TODO - fill on the later step

const Img = styled("img")`
  display: flex;
  width: 100%;
  max-width: 900px;
  height: 50 auto;
  margin: 0 auto;
  color: "rgba(0,1,1,1)";
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
  width: 90%;
  padding-top: 20px;
  margin: auto;
  border-radius: 20px;
  max-width: 1500px;
  display: row;
  flex-direction: left;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 900px) {
    width: 90%;
  }
  @media only screen and (max-width: 400px) {
    width: 98%;
  }
`;
const Container = styled(
  "div"
)`    margin: 50px 0;    @media only screen and (max-width: 900px){        margin-top: 10px;    }    padding: 24px;    @media only screen and (max-width: 600px){        padding: 8px;    }  `;
const Particulier = ({ t }) => {
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
            color: "white",
            fontSize: "50px",
            fontWeight: "bold",
            filter: "brightness(1)",
            brightness: "white",
          }}
        >
           {t('Particulier')}
        </h1>
      </div>

      <Container>
        <div></div>
        <div>
          <p
      style={{
        textAlign: "center",
        padding: "0px",
        paddingTop: "30px",
        paddingRight: "5%",
        paddingBottom: "30px",
        paddingLeft: "5%",
        margin: "0px 5%",
        color:"grey",
        borderLeft: "3px solid #0066dd",
        height: "100%",
        position: "absolute",
        position: "left"
      }}
          >
            {t('Si vous avez des travaux, une installation, un entretien à effectuer ici cest lapplication qui répond à vos besoins que vous soyez. Une entreprise ou un particulier vous allez trouver le technicien que vous avez tant cherché. Pour les réparation de votre logement ou société on a une panoplie de peintres carreleurs, chauffagistes serruriers ,soudeurs..tous qualifiés compétents et efficaces juste avec un clic vous pouvez les contacter et organiser vos travaux sur mesure.')}
          </p>
        </div>
      </Container>
    </HomeLayout>
  );
};
export default withNamespaces()(Particulier);
