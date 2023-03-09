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
const Container = styled("div")`
    margin: 50px 0;
    @media only screen and (max-width: 900px){
            margin-top: 50px;  
    margin-bottom:30px  
}    
padding: 24px;
    @media only screen and (max-width: 600px)
{        margin-top: 50px;
    margin-bottom:30px;
    padding:5px;
    }
  `;
const PolitiqueDeConfidentialite = ({ t }) => {
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
          {t("Politique de confidentialité")}
        </h1>
      </div>
      <Container>
        {" "}
        <div></div>{" "}
        <div>
          {" "}
          <p
            style={{
              textAlign: "left",
              padding: "0px 8%",
            }}
          >
            {" "}
            <>
              {" "}
              <div className="site-content" id="content">
                {" "}
                <div className="container">
                  {" "}
                  <div className="page__text">
                    {" "}
                    <p />{" "}
                    <ol start={1}>
                      {" "}
                      <li>
                        {" "}
                        <strong>1.{t("Parties et Objet")}</strong>{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "My-craft-solution (ci-après My-craft-solution ou le Responsable du Traitement)"
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Adresse du siège de la société  Bridge Building, Av. Charles-Quint 584, 1082 Bruxelles"
                      )}{" "}
                    </p>{" "}
                    <p>BCE / TVA : 0774 327 640</p>{" "}
                    <p>Mail : info@my-craft-solutions.be</p>{" "}
                    <p>{t("Téléphone")} : 0483 392 334</p>{" "}
                    <p>
                      {" "}
                      {t(
                        "My-craft-solution établit la présente Politique de confidentialité dont l’objet est d’informer en toute transparence les Utilisateurs du site internet hébergé à l’adresse suivante (my-craft-solutions.be/) (ci-après le “Site”), de la manière dont les données personnalisées sont récoltées et traitées par le Responsable du Traitement."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Le terme “Utilisateur” fait référence à tout utilisateur, soit toute personne physique ou morale, qui visite ou interagit d’une quelconque manière avec le site."
                      )}{" "}
                    </p>
                    <p>
                      {" "}
                      {t(
                        "À ce titre, My-craft-solution détermine tous les moyens et finalités techniques, juridiques, et organisationnels du traitement des données personnelles des Utilisateurs. My-craft-solution s’engage à cet effet à prendre toutes les mesures nécessaires pour garantir un traitement des données personnelles conforme à la loi du 30 juillet 2018 relative à la protection des données physiques à l’égard des traitement des données à caractère personnel (ci-après “la Loi”) et au Règlement européen du 26 avril 2016 relatif à la protection des données des personnes physiques à l’égard du traitement des données à caractère personnel et à la libre circulation de ces données (ci-après le “Règlement)."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "My-craft-solution est libre de choisir toute personne physique ou morale qui traite les données personnelles des utilisateurs à sa demande et pour son compte (ci-après le “Sous-traitant”). Le cas échéant, My-craft-solution s’engage à sélectionner un Sous-traitant offrant des garanties suffisantes quant aux mesures de sécurité techniques et organisationnelles du traitement des données personnelles, au regard de la Loi et du Règlement."
                      )}{" "}
                    </p>{" "}
                    <ol start={2}>
                      {" "}
                      <li>
                        {" "}
                        <strong>
                          {" "}
                          2.{t("Traitement des données personnelles")}{" "}
                        </strong>{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "L’utilisation du site par les Utilisateurs pourra entraîner la communication de données personnelles. Le traitement de ces données par My-craft-solution, en sa qualité de Responsable du traitement, ou par les prestataires agissant au nom et pour le compte de My-craft-solution, sera conforme à la Loi et au Règlement."
                      )}{" "}
                    </p>
                    <p>
                      {" "}
                      {t(
                        "Les données à caractère personnel seront traitées par My-craft-solution, conformément aux finalités citées plus bas, via affiner le moteur de recherche."
                      )}{" "}
                    </p>{" "}
                    <ol start={3}>
                      {" "}
                      <li>
                        {" "}
                        <strong>
                          {" "}
                          3.
                          {t(
                            "Finalité du traitement des données personnelles"
                          )}{" "}
                        </strong>{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Conformément à l’article 13 du Règlement, les finalités du traitement des données personnelles sont communiquées à l’utilisateur et  affiner le moteur de recherche"
                      )}{" "}
                    </p>{" "}
                    <ol start={4}>
                      {" "}
                      <li>
                        {" "}
                        <strong>
                          {" "}
                          4.
                          {t(
                            "Données personnelles susceptibles d’être traitées"
                          )}{" "}
                        </strong>{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "L’utilisateur consent, lors de la visite et lors de l’utilisation du site, que My-craft-solution recueille et traite selon les modalités et principes décrits dans la présente Politique de confidentialité, les données à caractère personnel suivantes "
                      )}{" "}
                    </p>{" "}
                    <ul>
                      {" "}
                      <li>
                        {" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                          href="https://docs.google.com/forms/d/1hps1N2yjepodbXuO2LouC-WA9VstP8tUZc9O9ZPRfbU/prefill/"
                        >
                          {" "}
                          https://docs.google.com/forms/d/
                          1hps1N2yjepodbXuO2LouC-WA9VstP8tUZc9O9ZPRfbU/ prefill/{" "}
                        </a>{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                        >
                          {" "}
                          https://my-craft-solutions.be/{" "}
                        </a>{" "}
                      </li>{" "}
                    </ul>{" "}
                    <ol start={5}>
                      {" "}
                      <li>
                        {" "}
                        <strong>5.{t("Consentement")}</strong>{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "En accédant au site et en l’utilisant, l’Utilisateur déclare avoir pris connaissance et marqué son accord de façon libre, spécifique, éclairée et univoque au traitement des données à caractère personnel la concernant. Cet accord porte sur le contenu de la présente Politique de confidentialité."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Le consentement est donné par l’acte positif par lequel l’Utilisateur a coché la case proposant la Politique de confidentialité en lien hypertexte. Ce consentement est une condition indispensable pour effectuer certaines opérations sur le site ou pour permettre à l’Utilisateur d’entrer en relation contractuelle avec My-craft-solution. Tout contrat liant My-craft-solution et un Utilisateur portant sur les services et biens proposés sur le site est subordonné à l’acceptation de la Politique de confidentialité par l’Utilisateur."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "L’Utilisateur consent à ce que le Responsable du Traitement traite et recueille, conformément aux modalités et principes compris dans la présente Politique de confidentialité, ses données à caractère personnel qu’il communique sur le site ou à l’occasion des services proposés par My-craft-solution, pour les finalités indiquées plus haut."
                      )}{" "}
                    </p>
                    <p>
                      {" "}
                      {t(
                        "L’Utilisateur a le droit de retirer son consentement à tout moment. Le retrait du consentement ne compromet pas la licéité du traitement fondé sur le consentement préalablement donné."
                      )}{" "}
                    </p>{" "}
                    <ol start={6}>
                      {" "}
                      <li>
                        {" "}
                        <strong>
                          {" "}
                          6.
                          {t(
                            "Durée de conservation des données personnelles des Utilisateurs"
                          )}{" "}
                        </strong>{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Conformément à l’article 13 du Règlement et de la Loi, le Responsable du Traitement ne conserve les données à caractère personnel que pendant le temps raisonnablement nécessaire pour permettre l’accomplissement des finalités pour lesquelles elles sont traitées."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Cette durée est dans tous les cas inférieure à  10 ans."
                      )}{" "}
                    </p>{" "}
                    <ol start={7}>
                      <li>
                        {" "}
                        <strong>
                          {" "}
                          7.
                          {t(
                            "Destinataires des données et divulgation à des tiers"
                          )}{" "}
                        </strong>{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Les données personnelles peuvent être transmises aux préposés, collaborateurs, sous-traitants ou fournisseurs de My-craft-solution qui offrent des garanties de sécurité des données adéquates et qui collaborent avec My-craft-solution dans le cadre de la commercialisation de produits ou de la fourniture de services. Ils agissent sous l’autorité directe de My-craft-solution et sont notamment responsables de recueillir, traiter ou sous-traiter ces données."
                      )}{" "}
                    </p>
                    <p>
                      {" "}
                      {t(
                        "Dans tous les cas, les destinataires des données et ceux à qui ces données ont été divulguées respectent le contenu de la présente Politique de confidentialité. My-craft-solution assure qu’ils traiteront ces données aux seules finalités prévues, de façon discrète et sécurisée."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Dans l’hypothèse où les données seraient divulguées à des tiers à des fins de marketing direct ou de prospection, l’Utilisateur en sera préalablement informé pour qu’il exprime son consentement à l’utilisation de ses données personnelles."
                      )}{" "}
                    </p>{" "}
                    <ol start={8}>
                      <li>
                        {" "}
                        <strong>
                          8.{t("Data Protection Officer (DPO)")}
                        </strong>{" "}
                      </li>
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "La personne suivante est nommée Déléguée à la Protection des Données ou Data Protection officer (ci-après DPO)  Damak Salma."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Le rôle du DPO est de s’assurer la bonne mise en œuvre des dispositions nationales et supranationales quant à la collecte et au traitement des données à caractère personnel."
                      )}{" "}
                    </p>
                    <p>
                      {" "}
                      {t(
                        "Le DPO peut être contacté comme suit  Salma.damak@itm-bc.com."
                      )}{" "}
                    </p>
                    <ol start={9}>
                      {" "}
                      <li>
                        {" "}
                        <strong>9.{t("Droits des Utilisateurs")}</strong>{" "}
                      </li>
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "À tout moment, l’Utilisateur peut exercer ses droits en envoyant un message par courrier électronique à l’adresse suivante  info@my-craft-solutions.be"
                      )}{" "}
                    </p>
                    <ol start={1}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        9.1 {t("Droit d’accès")}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Conformément à l’article 15 du Règlement, My-craft-solution garantit le droit d’accès à l’Utilisateur à ses données personnelles. L’Utilisateur a le droit d’obtenir l’accès auxdites données à caractère personnel ainsi que les informations suivantes "
                      )}{" "}
                    </p>{" "}
                    <ul>
                      {" "}
                      <li>{t("les finalités du traitement ;")}</li>{" "}
                    </ul>
                    <ul>
                      {" "}
                      <li>
                        {" "}
                        {t(
                          "les catégories de données à caractère personnel concernées ;"
                        )}{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        {t(
                          "les destinataires ou catégories de destinataires auxquels les données à caractère personnel ont été ou seront communiquées, en particulier les destinataires qui sont établis dans des pays tiers ou les organisations internationales ;"
                        )}{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        {t(
                          "lorsque cela est possible, la durée de conservation des données à caractère personnel envisagée ou, lorsque ce n’est pas possible, les critères utilisés pour déterminer cette durée ;"
                        )}{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        {t(
                          "l’existence d’une prise de décision automatisée, y compris un profilage, visée à l’article 22, paragraphes 1 et 4 du Règlement, et, au moins en pareils cas, des informations concernant la logique sous-jacente, ainsi que l’importance et les conséquences prévues de ce traitement pour la personnes concernée."
                        )}{" "}
                      </li>{" "}
                    </ul>{" "}
                    <p>
                      {" "}
                      {t(
                        "Le Responsable du Traitement peut exiger le paiement de frais raisonnables basés sur les coûts administratifs pour toute copie supplémentaire demandée par l’Utilisateur."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Lorsque l’Utilisateur introduit cette demande par voie électronique (par le biais de l’adresse électronique par exemple), les informations sont fournies sous une forme électronique d’usage courant, à moins que l’Utilisateur ne demande qu’il en soit autrement."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "La copie de ses données sera communiquée à l’Utilisateur au plus tard dans le mois après la réception de la demande."
                      )}{" "}
                    </p>{" "}
                    <ol start={2}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        9.2 {t("Droit de rectification")}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "My-craft-solution garantit le droit de rectification et d’effacement des données personnelles à l’Utilisateur."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Conformément à l’article 16 du Règlement, les données incorrectes, inexactes ou non-pertinentes peuvent être corrigées ou effacées, à tout moment. L’Utilisateur procède d’abord lui-même aux modifications nécessaires depuis son compte utilisateur/autre, sauf si celles-ci ne peuvent être effectuées de manière autonome, dans quel cas la demande peut en être faite auprès de My-craft-solution."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Conformément à l’article 19 du Règlement, le Responsable du Traitement notifie à chaque destinataire auquel les données à caractère personnel ont été communiquées toute rectification des données à caractère personnel, à moins qu’une telle communication se révèle impossible ou exige des efforts disproportionnés. Le Responsable du Traitement fournit à la personne concernée des informations sur ces destinataires si celle-ci en fait la demande."
                      )}{" "}
                    </p>{" "}
                    <ol start={3}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        9.3 {"Droit à l’effacement"}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "L’Utilisateur a le droit d’obtenir l’effacement de ses données personnelles dans les meilleurs délais dans les hypothèses énumérées à l’article 17 du Règlement."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Lorsque le Responsable de Traitement a rendu publiques les données à caractère personnel et qu’il est tenu de les effacer en vertu du paragraphe précédent, le Responsable du Traitement, compte tenu des technologies disponibles et des coûts de mise en œuvre, prend des mesures raisonnables, y compris d’ordre technique, pour informer les autres responsables du traitement qui traitent ces données à caractère personnel que la personne concernée a demandé l’effacement par ces responsables du traitement de tout lien vers ces données à caractère personnel, ou de toute copie ou reproduction de celles-ci."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        " Les deux paragraphes précédents ne s’appliquent pas dans la mesure où ce traitement est nécessaire :"
                      )}{" "}
                    </p>{" "}
                    <ul>
                      {" "}
                      <li>
                        {" "}
                        {t(
                          "à l’exercice du droit à la liberté d’expression et d’information ;"
                        )}{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        {t(
                          "pour respecter une obligation légale qui requiert le traitement prévue par le droit de l’Union ou par le droit de l’État membre auquel le responsable du traitement est soumis, ou pour exécuter une mission d’intérêt public ou relevant de l’exercice de l’autorité publique dont est investi le Responsable du Traitement ;"
                        )}{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        {t(
                          "à la constatation, à l’exercice ou à la défense de droits en justice."
                        )}{" "}
                      </li>{" "}
                    </ul>{" "}
                    <p>
                      {" "}
                      {t(
                        "Conformément à l’article 19 du Règlement, le Responsable du Traitement notifie à chaque destinataire auquel les données à caractère personnel ont été communiquées tout effacement de données à caractère personnel ou toute limitation du traitement effectué à moins qu’une telle communication se révèle impossible ou exige des efforts disproportionnés. Le Responsable du Traitement fournit à la personne concernée des informations sur ces destinataires si celle-ci en fait la demande."
                      )}{" "}
                    </p>{" "}
                    <ol start={4}>
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        9.4 {t("Droit de limitation du traitement")}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "L’Utilisateur a le droit d’obtenir la limitation du traitement de ses données personnelles dans les hypothèses énumérées à l’article 19 du Règlement."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Conformément à l’article 19 du Règlement, le Responsable du Traitement notifie à chaque destinataire auquel les données à caractère personnel ont été communiquées toute limitation du traitement effectué, à moins qu’une telle communication se révèle impossible ou exige des efforts disproportionnés. Le Responsable du Traitement fournit à la personne concernée des informations sur ces destinataires si celle-ci en fait la demande."
                      )}{" "}
                    </p>{" "}
                    <ol start={5}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        9.5 {t("Droit de portabilité des données")}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Conformément à l’article 20 du Règlement, les Utilisateurs ont le droit de recevoir de My-craft-solution les données à caractère personnel les concernant dans un format structuré, couramment utilisé et libsible par machine. Les Utilisateurs ont le droit de transmettre ces données à un autre responsable du traitement sans que My-craft-solution y fasse obstacle dans les cas prévus par le Règlement."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Lorsque l’Utilisateur exerce son droit à la portabilité des données en application du paragraphe précédent, elle a le droit d’obtenir que les données à caractère personnel soient transmises directement d’un responsable du traitement à un autre, lorsque cela est techniquement possible."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "L’exercice du droit de portabilité des données s’étend sans préjudice du droit à l’effacement. Ce droit ne s’applique pas au traitement nécessaire à l’exécution d’une mission d’intérêt public ou relevant de l’exercice de l’autorité publique dont est investi le responsable du traitement."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Le droit de portabilité des données ne porte pas atteinte aux droits et libertés de tiers."
                      )}{" "}
                    </p>{" "}
                    <ol start={6}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        9.6{" "}
                        {t(
                          "Droit d’opposition et prise de décision individuelle automatisée"
                        )}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "L’Utilisateur dispose à tout moment du droit de s’opposer au traitement de ses données personnelles en raison de sa situation particulière, y compris l’automatisation des données effectuée par My-craft-solution. Conformément à l’article 21 du Règlement, My-craft-solution ne traitera plus les données à caractère personnel, à moins qu’il existe des motifs légitimes et impérieux pour le traitement qui prévalent sur les intérêts et les droits et libertés de l’Utilisateur, ou pour la constatation, l’exercice ou la défense de droits en justice."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Lorsque les données à caractère personnel sont traitées à des fins de prospection, l’Utilisateur a le droit de s’opposer à tout moment au traitement des données à caractère personnel la concernant à de telles fins de prospection, y compris au profilage dans la mesure où il est lié à une telle prospection."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Lorsque la personne concernée s’oppose au traitement à des fins de prospection, les données à caractère personnel ne sont plus traitées à ces fins."
                      )}{" "}
                    </p>{" "}
                    <ol start={7}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        9.7 {t("Droit de plainte")}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "L’Utilisateur dispose du droit d’introduire une plainte concernant le traitement de ses données personnelles par My-craft-solution auprès de l’Autorité de Protection des Données, compétente pour le territoire belge. De plus amples informations peuvent être trouvées sur le site internet "
                      )}{" "}
                      <a
                        style={{ color: "blue", textDecoration: "underline" }}
                        href="https://www.autoriteprotectiondonnees.be/"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {" "}
                        https://www.autoriteprotectiondonnees.be{" "}
                      </a>{" "}
                      .{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "L’introduction d’une plainte se fait aux adresses suivantes :"
                      )}{" "}
                    </p>{" "}
                    <p>{t("Autorité de Protection des Données")}</p>{" "}
                    <p>{t("Rue de la Presse 35, 1000 Bruxelles")}</p>{" "}
                    <p>{t("Tél")} : + 32 2 274 48 00</p>{" "}
                    <p>Fax : +32 2 274 48 35</p>{" "}
                    <p>
                      {" "}
                      E-mail :{" "}
                      <a
                        style={{ color: "blue", textDecoration: "underline" }}
                        href="mailto:contact@apd-gba.be"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {" "}
                        contact@apd-gba.be{" "}
                      </a>{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "L’utilisateur peut également introduire une plainte auprès du tribunal de première instance de son domicile."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      <strong>10.{t("Cookies")}</strong>{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Le site utilise des cookies pour distinguer les Utilisateurs du site. Cela permet de fournir aux Utilisateurs une meilleure expérience de navigation et une amélioration du site et de son contenu. Les objectifs et modalités des cookies sont contenus dans ce présent article."
                      )}{" "}
                    </p>{" "}
                    <ol start={1}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        10.1 {t("Principes généraux")}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Un “Cookie” est un fichier déposé temporairement ou de façon permanente sur le disque dur de l’Utilisateur lors de la consultation du site internet, en vue d’une connexion ultérieure. Grâce aux cookies, le serveur reconnaît l’ordinateur de l’Utilisateur."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Les cookies peuvent aussi être installés par des tiers avec lesquels My-craft-solution collabore."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Certains cookies utilisés par My-craft-solution sont nécessaires au bon fonctionnement du Site, d’autres permettent d’améliorer l’expérience de l’Utilisateur."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "L’Utilisateur peut personnaliser ou désactiver les cookies en paramétrant son navigateur."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "En utilisant le site internet, l’Utilisateur marque expressément son accord avec la gestion des cookies telle que décrite dans le présent article."
                      )}{" "}
                    </p>{" "}
                    <ol start={2}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        10.2 {t(
                          "Type de cookies et finalités poursuivies"
                        )}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Différents types de cookies sont utilisés par My-craft-solution sur le site"
                      )}{" "}
                    </p>{" "}
                    <ul>
                      {" "}
                      <li>
                        {" "}
                        *{" "}
                        {t(
                          "Les cookies techniques  ils sont nécessaires à l’exploitation du site internet, permettent la communication des données introduites et sont destinés à faciliter la navigation de l’Utilisateur."
                        )}{" "}
                      </li>{" "}
                    </ul>{" "}
                    <ul>
                      {" "}
                      <li>
                        {" "}
                        *{" "}
                        {t(
                          "Les cookies de mesure statistiques et d’audience  ces cookies permettent la reconnaissance de l’Utilisateur et sont utilisés afin de comptabiliser le nombre d’Utilisateurs du site internet sur une certaine période. Dès lors qu’ils indiquent aussi le comportement de navigation, ils sont un moyen efficace pour améliorer la navigation de l’Utilisateur, en lui affichant des propositions et offres susceptibles de l’intéresser. Ils permettent aussi à My-craft-solution de repérer les possibles bugs sur le site internet et de les corriger."
                        )}{" "}
                      </li>{" "}
                    </ul>{" "}
                    <ul>
                      {" "}
                      <li>
                        {" "}
                        *{" "}
                        {t(
                          "Les cookies fonctionnels  ces cookies facilitent l’utilisation du site internet en retenant certains choix introduits (par exemple la langue)"
                        )}{" "}
                      </li>{" "}
                    </ul>{" "}
                    <ul>
                      {" "}
                      <li>
                        {" "}
                        *{" "}
                        {t(
                          "Les cookies de traçage  My-craft-solution utilise des cookies de traçage via Google Analytics, pour mesurer l’interaction des Utilisateurs avec le contenu du site et produire des statistiques anonymes. Ces statistiques permettent à My-craft-solution de perfectionner le site internet. Google étaye l’explication de ces cookies à l’adresse suivante"
                        )}{" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                          href="https://www.google.nl/intl/en_uk/policies/privacy/"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          https://www.google.nl/intl/en_uk/ policies/privacy/
                        </a>
                      </li>{" "}
                    </ul>{" "}
                    <ol start={3}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        10.3 {t("Délai de conservation des cookies")}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Les cookies sont conservés pour le temps nécessaire à l’accomplissement de la finalité poursuivie. Les cookies susceptibles d’être stockés sur le disque dur de l’Utilisateur ainsi que leur délai de conservation sont les suivants  10 ans."
                      )}{" "}
                    </p>{" "}
                    <ol start={4}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        10.4 {t("Gestion des cookies")}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Si l’Utilisateur ne veut pas que le site internet place des cookies sur son disque dur, il lui est aisé de les gérer ou les supprimer en modifiant les paramètres de son navigateur. La programmation du navigateur permet aussi à l’Utilisateur de recevoir un avis ou une notification dès qu’un site internet utilise des cookies et ainsi décider d’accepter cela, ou de le refuser."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Si l’Utilisateur désactive certains cookies, il accepte que le site interne puisse ne pas fonctionner de manière optimale. Certaines parties du site internet pourraient ainsi ne pas être utilisables, ou l’être partiellement."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Si l’Utilisateur souhaite ainsi gérer et/ou supprimer certains cookies, il peut le faire en utilisant le/les liens suivant(s) "
                      )}{" "}
                    </p>{" "}
                    <ol>
                      {" "}
                      <li>
                        {" "}
                        - Internet Explorer :{" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                          href="https://windows.microsoft.com/en-gb/windows-10/edge-privacy-faq"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {" "}
                          https://windows.microsoft.com/
                          en-gb/windows-10/edge-privacy-faq{" "}
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        - Chrome :{" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                          href="https://support.google.com/accounts/answer/61416?hl=fr"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {" "}
                          https://support.google.com/accounts/
                          answer/61416?hl=fr{" "}
                        </a>{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        - Firefox :{" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                          href="https://support/mozilla.org/fr/kb/activer-desactiver-cookies-preferences"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {" "}
                          https://support/mozilla.org/fr/
                          kb/activer-desactiver-cookies-preferences{" "}
                        </a>{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        - Safari :{" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                          href="https://support.apple.com/kb/ph21411?locale=fr_CA"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {" "}
                          https://support.apple.com/ kb/ph21411?locale=fr_CA{" "}
                        </a>{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      <strong>
                        {" "}
                        11.{" "}
                        {t(
                          "Limitation de responsabilité du Responsable de Traitement"
                        )}{" "}
                      </strong>{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Le site internet peut contenir des liens vers d’autres sites internet détenus par des tiers non liés à My-craft-solution. Le contenu de ces sites et le respect de ceux-ci au regard de la Loi et du Règlement ne relèvent pas de la responsabilité de My-craft-solution."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Le titulaire de l’autorité parentale doit donner son consentement exprès pour que le mineur de moins de 16 ans puisse divulguer des informations ou données personnelles sur le site internet. My-craft-solution conseille vivement aux personnes exerçant l’autorité parentale sur des mineurs de promouvoir une utilisation responsable et sécurisée d’internet. Le Responsable de Traitement ne peut être tenu responsable pour avoir collecté et traité des informations et données personnelles de mineurs de moins de 16 ans dont le consentement n’est pas effectivement couvert par celui de leurs parents légaux ou pour des données incorrectes – notamment concernant l’âge – introduites par des mineurs. En aucun cas, des données personnelles ne seront traitées par le Responsable de Traitement si l’Utilisateur précise qu’il est âgé de moins de 16 ans."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "My-craft-solution n’est pas responsable de la perte, de la corruption ou du vol de données personnelles causés notamment par la présence de virus ou suite à des attaques informatiques."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      <strong>
                        {" "}
                        12. {t(
                          "Droit applicable et juridiction compétente"
                        )}{" "}
                      </strong>{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "La présente Politique de confidentialité est exclusivement régie par le droit belge. Tout litige sera porté devant les tribunaux de l’arrondissement judiciaire du siège social de My-craft-solution."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      <strong>13. {t("Contact")}</strong>{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Pour toute question ou réclamation relative à la présente Politique de confidentialité, l’Utilisateur peut contacter le Responsable du Traitement via l’adresse suivante "
                      )}{" "}
                      info@my-craft-solutions.be
                    </p>{" "}
                    <p>
                      {" "}
                      <strong>
                        {" "}
                        {t(
                          "Déclaration relative aux cookies utilisés par My-craft-solution"
                        )}{" "}
                      </strong>{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Le site utilise des cookies pour distinguer les Utilisateurs du site. Cela permet de fournir aux Utilisateurs une meilleure expérience de navigation et une amélioration du site et de son contenu. Les objectifs et modalités des cookies sont contenus dans ce présent article."
                      )}{" "}
                    </p>{" "}
                    <ol start={5}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        13.1 {t("Principes généraux")}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Un “Cookie” est un fichier déposé temporairement ou de façon permanente sur le disque dur de l’Utilisateur lors de la consultation du site internet, en vue d’une connexion ultérieure. Grâce aux cookies, le serveur reconnaît l’ordinateur de l’Utilisateur."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Les cookies peuvent aussi être installés par des tiers avec lesquels My-craft-solution collabore."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Certains cookies utilisés par My-craft-solution sont nécessaires au bon fonctionnement du Site, d’autres permettent d’améliorer l’expérience de l’Utilisateur."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "L’Utilisateur peut personnaliser ou désactiver les cookies en paramétrant son navigateur."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "En utilisant le site internet, l’Utilisateur marque expressément son accord avec la gestion des cookies telle que décrite dans le présent article."
                      )}{" "}
                    </p>{" "}
                    <ol start={6}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        13.2 {"Type de cookies et finalités poursuivies"}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Différents types de cookies sont utilisés par My-craft-solution sur le site"
                      )}{" "}
                    </p>{" "}
                    <ul>
                      {" "}
                      <li>
                        {" "}
                        *{" "}
                        {t(
                          "Les cookies techniques  ils sont nécessaires à l’exploitation du site internet, permettent la communication des données introduites et sont destinés à faciliter la navigation de l’Utilisateur."
                        )}{" "}
                      </li>{" "}
                    </ul>{" "}
                    <ul>
                      {" "}
                      <li>
                        {" "}
                        *{" "}
                        {t(
                          "Les cookies de mesure statistiques et d’audience  ces cookies permettent la reconnaissance de l’Utilisateur et sont utilisés afin de comptabiliser le nombre d’Utilisateurs du site internet sur une certaine période. Dès lors qu’ils indiquent aussi le comportement de navigation, ils sont un moyen efficace pour améliorer la navigation de l’Utilisateur, en lui affichant des propositions et offres susceptibles de l’intéresser. Ils permettent aussi à My-craft-solution de repérer les possibles bugs sur le site internet et de les corriger."
                        )}{" "}
                      </li>{" "}
                    </ul>{" "}
                    <ul>
                      {" "}
                      <li>
                        {" "}
                        *{" "}
                        {t(
                          "Les cookies fonctionnels  ces cookies facilitent l’utilisation du site internet en retenant certains choix introduits (par exemple la langue)"
                        )}{" "}
                      </li>{" "}
                    </ul>{" "}
                    <ul>
                      {" "}
                      <li>
                        {" "}
                        *{" "}
                        {t(
                          "Les cookies de traçage  My-craft-solution utilise des cookies de traçage via Google Analytics, pour mesurer l’interaction des Utilisateurs avec le contenu du site et produire des statistiques anonymes. Ces statistiques permettent à My-craft-solution de perfectionner le site internet. Google étaye l’explication de ces cookies à l’adresse suivante"
                        )}{" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                          href="https://www.google.nl/intl/en_uk/policies/privacy/"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {" "}
                          https://www.google.nl/intl/ en_uk/policies/privacy/{" "}
                        </a>{" "}
                      </li>{" "}
                    </ul>{" "}
                    <ol start={7}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        13.3 {t("Délai de conservation des cookies")}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Les cookies sont conservés pour le temps nécessaire à l’accomplissement de la finalité poursuivie. Les cookies susceptibles d’être stockés sur le disque dur de l’Utilisateur ainsi que leur délai de conservation sont les suivants  10 ans."
                      )}{" "}
                    </p>{" "}
                    <ol start={8}>
                      {" "}
                      <li style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        13.4 {t("Gestion des cookies")}{" "}
                      </li>{" "}
                    </ol>{" "}
                    <p>
                      {" "}
                      {t(
                        "Si l’Utilisateur ne veut pas que le site internet place des cookies sur son disque dur, il lui est aisé de les gérer ou les supprimer en modifiant les paramètres de son navigateur. La programmation du navigateur permet aussi à l’Utilisateur de recevoir un avis ou une notification dès qu’un site internet utilise des cookies et ainsi décider d’accepter cela, ou de le refuser."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Si l’Utilisateur désactive certains cookies, il accepte que le site interne puisse ne pas fonctionner de manière optimale. Certaines parties du site internet pourraient ainsi ne pas être utilisables, ou l’être partiellement."
                      )}{" "}
                    </p>{" "}
                    <p>
                      {" "}
                      {t(
                        "Si l’Utilisateur souhaite ainsi gérer et/ou supprimer certains cookies, il peut le faire en utilisant le/les liens suivant(s) "
                      )}{" "}
                    </p>{" "}
                    <ul>
                      {" "}
                      <li>
                        {" "}
                        - Internet Explorer:{" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                          rel="noreferrer noopener"
                          href="https://windows.microsoft.com/en-gb/windows-10/edge-privacy-faq"
                          target="_blank"
                        >
                          {" "}
                          https://windows.microsoft.com/
                          en-gb/windows-10/edge-privacy-faq{" "}
                        </a>{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        - Chrome:{" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                          rel="noreferrer noopener"
                          href="https://support.google.com/accounts/answer/61416?hl=fr"
                          target="_blank"
                        >
                          {" "}
                          https://support.google.com/accounts/
                          answer/61416?hl=fr{" "}
                        </a>{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        - Firefox:{" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                          rel="noreferrer noopener"
                          href="https://support/mozilla.org/fr/kb/activer-desactiver-cookies-preferences"
                          target="_blank"
                        >
                          {" "}
                          https://support/mozilla.org/fr/kb/
                          activer-desactiver-cookies-preferences{" "}
                        </a>{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        - Safari:{" "}
                        <a
                          style={{ color: "blue", textDecoration: "underline" }}
                          rel="noreferrer noopener"
                          href="https://support.apple.com/kb/ph21411?locale=fr_CA"
                          target="_blank"
                        >
                          {" "}
                          https://support.apple.com/ kb/ph21411?locale=fr_CA{" "}
                        </a>{" "}
                      </li>{" "}
                    </ul>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </>{" "}
          </p>{" "}
        </div>{" "}
      </Container>
    </HomeLayout>
  );
};
export default withNamespaces()(PolitiqueDeConfidentialite);
