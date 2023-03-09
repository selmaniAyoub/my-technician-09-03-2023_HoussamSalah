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
  color: "rgba(0,1,1,1)",
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

const ConditionsDUtilisation = ({ t }) => {
  return (
    <HomeLayout >
      
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
          {t("Conditions d'utilisation")}
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
         padding:"0px 10%"
            }}
          >
            
         <div >
 

  <div   className="site-content" id="content" >
    <div className="container">
      <div className="page__text" >
        <p>
          <strong>{t('Préambule')}</strong>
        </p>
        <p>
          {t('Les présentes conditions générales d’utilisation sont conclues entre')}
        </p>
        <ol start={1}>
          <li>{" "}{" "}* {" "}{" "}
            {t('le gérant du site internet, ci-après désigné Éditeur,')}
          </li>
        </ol>
        <ol start={2}>
          <li>{" "}{" "}*{" "}{" "}
            {t('toute personne souhaitant accéder au site et à ses services, ci-après appelé Utilisateur.')}
          </li>
        </ol>
        <p><br/>
          <strong>{t('Article 1 – Principes')}</strong>
        </p>
        <p>
          {t('Les présentes conditions générales ont pour objet l’encadrement juridique de l’utilisation du site My-craft-solution et de ses services.')}
        </p>
        <p>
          {t('Le site internet')} (<a style={{ color:"blue" ,textDecoration: "underline" }} href="https://my-craft-solutions.be">{t('my-craft-solutions.be')}</a>) {t('est un service de')}
        </p>
        <ul>
          <li>{" "}*{" "}{t('la société ')} my-craft-solutions</li>
          <li>{" "}*{" "}
            {t('située  Bridge Building, Av. Charles-Quint 584, 1082 Bruxelles,Belgique')}
          </li>
        </ul>
        <ul>
          <li>{" "}*{" "}
            {t('adresse URL du site ')}<a style={{ color:"blue" ,textDecoration: "underline" }} href="https://my-craft-solutions.be">{t('my-craft-solutions.be')}</a>
          </li>
          <li>{" "}*{" "}{t('e-mail')}{" : "}{t('info@my-craft-solutions.be')}</li>
          <li>{" "}*{" "}{t('numéro de téléphone ')}{t('0483 392 334')}</li>
        </ul>
        <p>
          {t('Les conditions générales d’utilisation doivent être acceptées par tout Utilisateur. L’accès à ce site vaut acceptation de ces conditions.')}
        </p>
        <p><br/>
          <strong>
            {t('Article 2 – Évolution et durée de ces conditions générales d’utilisation')}
          </strong>
          
        </p>
        <p>
          {t('Les présentes conditions générales d’utilisation sont conclues pour une durée indéterminée. Le contrat produit ses effets à l’égard de l’Utilisateur à compter du début de l’utilisation du service.')}
        </p>
        <p><br/>
          <strong>{t('Article 3 – Accès au site')}</strong>
        </p>
        <p>
          {t('Tout Utilisateur ayant accès à internet peut accéder gratuitement et depuis n’importe où au site My-craft-solution. Les frais supportés par l’Utilisateur pour y accéder (connexion internet, matériel informatique, etc) ne sont pas à la charge de l’Éditeur. Le site et ses différents services peuvent être interrompus ou suspendus par l’Éditeur, notamment à l’occasion d’une maintenance, sans obligation de préavis ou de justification.')}
        </p>
        <p>
          {t('L’utilisateur du site à accès aux services suivants (en fonction de la formule d’abonnement qu’il choisit) ')}
        </p>
        <ul>
          <li>{" "}*{" "}{t('Profil complet en ligne,')}</li>
          <li>{" "}*{" "}{t('Agenda en ligne, personnalisé et sécurisé,')}</li>
          <li>{" "}*{" "}{t('Contact entre le client et le technicien,')}</li>
        </ul>
        <ul>
          <li>{" "}*{" "}{t('Base de données de clients,')}</li>
          <li>{" "}*{" "}
            {t('Emails de confirmation et de rappels de rendez-vous,')}
          </li>
          <li>{" "}*{" "}{t('Prise de rendez-vous en ligne,')}</li>
          <li>{" "}*{" "}{t('Page d’accueil personnalisée,')}</li>
          <li>{" "}*{" "}{t('Création d’un site web,')}</li>
        </ul>
        <ul>
          <li>{" "}*{" "}{t('Maintenance du site web,')}</li>
          <li>{" "}*{" "}{t('Marketing via les réseaux sociaux,')}</li>
          <li>{" "}*{" "}{('Service de secrétariat.')}</li>
        </ul>
        <p><br/>
          <strong>{t('Article 4 – Responsabilités')}</strong>
        </p>
        <p>
          {t('La responsabilité de l’Éditeur ne peut être engagée en cas de défaillance, panne, difficulté ou interruption du fonctionnement, empêchant l’accès au site ou à une de ses fonctionnalités.')}
        </p>
        <p>
          {t('Le matériel de connexion au site utilisé est sous l’entière responsabilité de l’Utilisateur qui doit prendre toutes les mesures appropriées pour protéger le matériel et les données, notamment d’attaques virales par Internet. L’Utilisateur est, par ailleurs, le seul responsable des sites et données qu’il consulte.')}
        </p>
        <p>
          {t('L’Éditeur ne pourra être tenu responsable en cas de poursuites judiciaires à l’encontre de l’Utilisateur ')}
        </p>
        <ul>
          <li>
            {t('du fait de l’usage du site ou de tout service accessible')}
            <em>{t('via')}</em> {t('Internet')} ;
          </li>
          <li>
            {t('du fait du non-respect par l’Utilisateur des présentes conditions générales.')}
          </li>
        </ul>
        <p>
          {t('L’Éditeur n’est pas responsable des dommages causés à l’Utilisateur, à des tiers et/ou à l’équipement de l’Utilisateur du fait de sa connexion ou de son utilisation du site. L’Utilisateur renonce à toute action contre l’Éditeur de ce fait.')}
        </p>
        <p>
          {t('Si l’Éditeur venait à faire l’objet d’une procédure amiable ou judiciaire à raison de l’utilisation du site par l’Utilisateur, il pourra se retourner contre lui pour obtenir indemnisation de tous les préjudices, sommes, condamnations et frais qui pourraient découler de cette procédure.')}
        </p>
        <p><br/>
          <strong>{t('Article 5 – Propriété intellectuelle')}</strong>
        </p>
        <p>
          {t('Tous les documents techniques, produits, photographies, textes, logos, dessins, vidéos, etc sont soumis à des droits d’auteur et sont protégés par le Code de la propriété intellectuelle. Lorsqu’ils sont remis à nos clients, ils demeurent la propriété exclusive de My-craft-solution, seul titulaire des droits de propriété intellectuelle sur ces documents, qui doivent lui être rendus à sa demande. Nos clients s’engagent à ne faire aucun usage de ces documents, susceptible de porter atteinte aux droits de propriété industrielle ou intellectuelle du fournisseur et s’engagent à ne les divulguer à aucun tiers, en dehors d’une autorisation expresse et préalable donnée par l’Éditeur.')}
        </p>
        <p><br/>
          <strong>{t('Article 6 – Liens hypertextes')}</strong>
        </p>
        <p>
          {t('La mise en place par l’Utilisateur de tous liens hypertextes vers tout ou une partie du site est strictement interdite, sauf autorisation préalable et écrite de l’Éditeur, sollicitée par courriel à l’adresse suivante ')} : info@my-craft-solutions.be 
        </p>
        <p>
          {t('L’Éditeur est libre de refuser cette autorisation sans avoir à justifier de quelque manière que ce soit sa décision. Dans le cas où l’Éditeur accorderait son autorisation, celle-ci n’est dans tous les cas que temporaire et pourra être retirée à tout moment, sans obligation de justification à la charge de l’Éditeur.')}
        </p>
        <p>
          {t('Dans tous les cas, tout lien devra être retiré sur simple demande de l’Éditeur. Toute information accessible via un lien vers d’autres sites n’est pas sous le contrôle de l’Éditeur qui décline toute responsabilité quant à leur contenu.')}
        </p>
        <p><br/>
          <strong>{t('Article 7 – Protection des données personnelles')}</strong>
        </p>
        <p>{t('Données collectées')}</p>
        <p>
          {t('Les données à caractère personnel qui sont collectées sur ce site sont les suivantes ')}
        </p>
        <ul>
          <li>
          <a style={{ color:"blue" ,textDecoration: "underline",marginRight:"-500px" }}
              href="https://docs.google.com/forms/d/1hps1N2yjepodbXuO2LouC-WA9VstP8tUZc9O9ZPRfbU/prefill"
              target="_blank"
              rel="noreferrer noopener"
            >
              https://docs.google.com/forms/d/
              1hps1N2yjepodbXuO2LouC-WA9VstP8tUZc9O9ZPRfbU/prefill
            </a>
            / 
          </li>
          <li>
            <a style={{ color:"blue" ,textDecoration: "underline" }}
              href="https://my-craft-solutions.be"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('https://my-craft-solutions.be')}
            </a>
            
          </li>
        </ul>
        <br/>
        <p><strong>{t('Utilisation des données personnelles')}</strong></p>
        <p>
          {t('Les données personnelles collectées auprès des utilisateurs ont pour objectif la mise à disposition des services du site web, leur amélioration et le maintien d’un environnement sécurisé. Plus précisément, les utilisations sont les suivantes ')}
        </p>
        <ul>
          <li>{" "}*{" "}
            {t('accès et utilisation du site web par l’utilisateur ;')}
          </li>
          <li>{" "}*{" "}
            {t('gestion du fonctionnement et optimisation du site web ;')}
          </li>
          <li>{" "}*{" "}
            {t('organisation des conditions d’utilisation des Services de paiement;')}
          </li>
        </ul>
        <ul>
          <li>{" "}*{" "}
            {t('vérification, identification et authentification des données transmises par l’utilisateur ;')}
          </li>
          <li>{" "}*{" "}
            {t('proposition à l’utilisateur de communiquer avec d’autres utilisateurs du site web ')};
          </li>
          <li>{" "}*{" "}{t('mise en œuvre d’une assistance utilisateurs ;')}</li>
          <li>{" "}*{" "}
            {t('personnalisation des services en affichant des publicités en fonction de l’historique de navigation de l’utilisateur, selon ses préférences ;')}
          </li>
          <li>{" "}*{" "}
            {t('prévention et détection des fraudes, malwares (logiciels malveillants) et gestion des incidents de sécurité.;')}
          </li>
        </ul>
        <ul>
          <li>{" "}*{" "}
            {t('gestion des éventuels litiges avec les utilisateurs ;')}
          </li>
          <li>{" "}*{" "}
            {t('envoi d’informations commerciales et publicitaires en fonction des préférences de l’utilisateur.')}
          </li>
        </ul>
        <br/>
        <p><strong>{t('Partage de données personnelles avec des tiers')}</strong></p>
        <p>
          {t('Les données personnelles peuvent être partagées avec des sociétés tierces dans les cas suivants ')}
        </p>
        <ul>
          <li>{" "}*{" "}
            {t('lorsque l’Utilisateur utilise les services de paiement, pour la mise en oeuvre de ces services, le site web est en relation avec des sociétés bancaires et financières tierces avec lesquelles elle a passé des contrats ;')}
          </li>
        </ul>
        <ul>
          <li>{" "}*{" "}
            {t('lorsque l’Utilisateur autorise le site web d’un tiers à accéder à ses données ;')}
          </li>
        </ul>
        <ul>
          <li>{" "}*{" "}
            {t('lorsque le site web recourt aux services de prestataires pour fournir l’assistance utilisateurs, la publicité et les services de paiement. Ces prestataires disposent d’un accès limité aux données de l’utilisateur, dans le cadre de l’exécution de ces prestations, et ont une obligation contractuelle de les utiliser en conformité avec les dispositions de la réglementation applicable en matière de protection des données à caractère personnel ;')}
          </li>
        </ul>
        <ul>
          <li>{" "}*{" "}
            {t('si la loi l’exige, le site web peut effectuer la transmission de données pour donner suite aux réclamations présentées contre le site web et se conformer aux procédures administratives et judiciaires;')}
          </li>
          <li>{" "}*{" "}
            {t('si le site web est impliqué dans une opération de fusion, acquisition, cession d’actifs ou procédure de redressement judiciaire, elle pourra être amenée à céder ou partager tout ou partie de ses actifs, y compris les données à caractère personnel. Dans ce cas, les utilisateurs seraient informés, avant que les données à caractère personnel ne soient transférées à une tierce partie')}
          </li>
        </ul> <br/>
        <p><strong>{t('Sécurité et confidentialité')}</strong></p>
        <p>
          {t('Le site web met en œuvre des mesures organisationnelles, techniques, logicielles et physiques en matière de sécurité du numérique pour protéger les données personnelles contre les altérations, destructions et accès non autorisés. Toutefois, il est à signaler qu’internet n’est pas un environnement complètement sécurisé et le site web ne peut pas garantir la sécurité de la transmission ou du stockage des informations sur internet.')}
        </p>
        <p>{t('Mise en œuvre des droits des utilisateurs')}</p>
        <p>
          {t('En application de la réglementation applicable aux données à caractère personnel, les utilisateurs disposent des droits suivants, qu’ils peuvent exercer en faisant leur demande à l’adresse suivante  info@my-craft-solutions.be')}
        </p>
        <ul>
          <li>{" "}*{" "}
            {t('le droit d’accès  ils peuvent exercer leur droit d’accès, pour connaître les données personnelles les concernant. Dans ce cas, avant la mise en œuvre de ce droit, le site web peut demander une preuve de l’identité de l’Utilisateur en vue d’en vérifier l’exactitude.')}
          </li>
        </ul>
        <ul>
          <li>{" "}*{" "}
            {t('le droit de rectification  si les données à caractère personnel détenues par le site web sont inexactes, ils peuvent demander la mise à jour des informations.')}
          </li>
        </ul>
        <ul>
          <li>{" "}*{" "}
            {t('le droit de suppression des données  les utilisateurs peuvent demander la suppression de leurs données à caractère personnel, conformément aux hypothèses prévues par le RGPD.')}
          </li>
        </ul>
        <ul>
          <li>{" "}*{" "}
            {t('le droit à la limitation du traitement  les utilisateurs peuvent demander au site web de limiter le traitement des données personnelles conformément aux hypothèses prévues par le RGPD.')}
          </li>
        </ul>
        <ul>
          <li>{" "}*{" "}
            {t('le droit de s’opposer au traitement des données  les utilisateurs peuvent s’opposer à ce que ces données soient traitées conformément aux hypothèses prévues par le RGPD.')}
          </li>
        </ul>
        <ul>
          <li>{" "}*{" "}
            {t('le droit à la portabilité  ils peuvent réclamer que le site web leur remette les données personnelles qui lui sont fournies pour les transmettre à un nouveau site web.')}
          </li>
        </ul>
        <br/>
        <p><strong>{t('Évolution de la présente clause')}</strong></p>
        <p>
          {t('Le site web se réserve le droit d’apporter toute modification à la présente clause relative à la protection des données à caractère personnel à tout moment. Si une modification est apportée à la présente clause de protection des données à caractère personnel, le site web s’engage à publier la nouvelle version sur son site. My-craft-solution informera également les utilisateurs de la modification par messagerie électronique, dans un délai minimum de 15 jours avant la date d’effet. Si l’utilisateur n’est pas d’accord avec les termes de la nouvelle rédaction de la clause de protection des données à caractère personnel, il a la possibilité de supprimer son compte.')}
        </p>
        <p><br/>
          <strong>{t('Article 8 – Cookies')}</strong>
        </p>
        <p>
          {t('Le site My-craft-solution peut collecter automatiquement des informations standards. Toutes les informations collectées indirectement ne seront utilisées que pour suivre le volume, le type et la configuration du trafic en utilisant ce site pour en développer la conception et l’agencement et à d’autres fins administratives et de planification et plus généralement pour améliorer le service que nous vous offrons.')}
        </p>
        <p><br/>
          <strong>{t('Article 9 – Loi applicable')}</strong>
        </p>
        <p>
          {t('Les présentes conditions générales d’utilisation sont soumises à l’application du droit belge .Si les parties n’arrivent pas à résoudre un litige à l’amiable, le litige sera soumis à la compétence des tribunaux belges.')}
        </p>
      </div>
    </div>
  </div>
</div>

          </p>
        </div></Container>
    </HomeLayout>
  );
};
export default withNamespaces()(ConditionsDUtilisation);
