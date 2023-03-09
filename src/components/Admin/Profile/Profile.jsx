import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import AdvancedSection from "./AdvancedSection";
import { Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
//images
import TechnicianThumbnail from '../../../assets/doctor-thumbnail.png'
import TechnicianFemaleThumbnail from '../../../assets/doctor-female-thumbnail.png'
import VeterinaryThumbnail from '../../../assets/veterinary-thumbnail.png'
import PsychologistThumbnail from '../../../assets/psychologist-thumbnail.png'
import DentistThumbnail from '../../../assets/dentist-thumbnail.png'
import PharmacieThumbnail from '../../../assets/pharmacies-image.png'
import TechnicianImg from '../../../assets/carpenter.png';
import PlumberImg from '../../../assets/plumber.png';
import welderImg from '../../../assets/welder.png';
import ElectricianImg from '../../../assets/electrician.png';
import OrchardImg from '../../../assets/orchard.png';
import BrickworkImg from '../../../assets/brickwork.png';
import PeintreImg from '../../../assets/peintre.png';
import EntretienImg from '../../../assets/entretien.png';
import LockImg from '../../../assets/locksmith.png';


import defaultImage from '../../../assets/defaultImage.jpg';
import techavatar from '../../../assets/techavatar.png';

import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { translate } from 'react-i18next';
import { compose } from "recompose";

const Container = styled("div")`
  margin: 50px 0;
  width: 100%;
  @media only screen and (max-width: 900px) {
    margin-top: 10px;
  }
  padding: 24px;
  @media only screen and (max-width: 600px) {
    padding: 8px;
  }
`;

const HeaderContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileImg = styled(Paper)`
  display: flex;
  width: 25%;
  margin: 0 15px 0 0;
  border: 1px solid #f1f1f1;
  border-radius: 10px;
  flex-direction: column;
  min-width: 250px;
  max-width: 350px;
  @media only screen and (max-width: 900px) {
    width: 100%;
    max-width: 500px;
    margin: 0;
    margin-bottom: 30px;
  }
`;

const Img = styled("img")`
  display: flex;
  width: 100%;
  max-width: 300px;
  height: auto;
  margin: 0 auto;
`;

const ProfileName = styled(Typography)`
  font-size: 22px;
  text-align: center;
  font-weight: bold;
  text-transform: capitalize;
  margin: 10px 0 0 0;
`;

const ProfileRole = styled(Typography)`
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  text-transform: capitalize;
  margin: 5px 0;
`;

const LoadingContainer = styled("div")`
  display: flex;
  height: 80vh;
  min-height: 500px;
  align-items: center;
  justify-content: center;
`;

const Speciality = styled("span")`
  color: #5e5e5e;
  font-size: 14px;
`;

const BasicInfo = styled(Paper)`
  display: flex;
  width: 70%;
  min-width: 250px;
  border: 1px solid #f1f1f1;
  border-radius: 10px;
  flex-direction: column;
  padding: 1em;
  max-width: 900px;
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

const BioTypo = styled(Typography)`
  font-size: 22px;
  font-weight: bold;
  text-transform: capitalize;
`;

const BioColumns = styled("div")`
  display: flex;
  flex-direction: row;
  margin: 20px 0 0 0;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const BioItem = styled("div")`
    width: 33%;
    display flex;
    flex-direction: column;
    padding: 0.5em;
    align-items: start;
    @media only screen and (max-width: 600px){
        width: 100%;
        align-items: center;
    }
`;

const BioItemLabel = styled(Typography)`
  font-size: 18px;
  color: #666;
  text-transform: capitalize;
`;

const BioItemVal = styled(Typography)`
  font-size: 18px;
  color: #222;
  margin-top: 10px;
  font-weight: bold;
  word-break: break-word;
  @media only screen and (max-width: 600px) {
    text-align: center;
  }
`;

const BioAction = styled("div")`
  margin: 20px 0;
  padding: 0.5em;
  padding-top: 10px;
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
  }
`;

const EditBtn = styled(Button)`
  box-shadow: none;
  font-weight: bold;
  letter-spacing: 1px;
`;

const RenderProfileName = ({ user ,t }) => {
  if (user.speciality) {
    return (
      <ProfileRole>
        {user?.roles[0]?.role}
        <Speciality> ({t(user.speciality)})</Speciality>
      </ProfileRole>
    );
  } else {
    return <ProfileRole>{t(user?.roles[0]?.role)}</ProfileRole>;
  }
};

const RenderName = ({ user }) => {
  const role = user?.roles[0]?.role;

  if (role === "pharmacie") {
    return <ProfileName color={"primary"}>{user.name}</ProfileName>;
  } else {
    return (
      <ProfileName color={"primary"}>
        {user.firstName} {user.lastName}
      </ProfileName>
    );
  }
};
// const ProfileImg = ({ data }) => {
//   const { role } = data.roles[0];
//  console.log("role =  " , role)
//  if (role === "client") {
//   return (
//       <Img src={data.photoUrl || techavatar} />
//   )
// }
//  if (role === "admin") {
//   return (
//       <Img src={data.photoUrl || defaultImage} />
//   )
// }
//   if (role === "menuisier") {
//       return (
//           <Img src={data.photoUrl || TechnicianImg} />
//       )
//   }

//   if (role === "plombier") {
//       return (
//           <Img src={data.photoUrl || PlumberImg} />
//       )
//   }

//   if (role  === "soudeur") {
//       return (
//           <Img src={data.photoUrl || welderImg} />
//       )
//   }

//   if (role  === "electricien") {
//       return (
//           <Img src={data.photoUrl || ElectricianImg} />
//       )
//   }

//   if (role === "paysagiste") {
//       return (
//           <Img src={data.photoUrl || OrchardImg} />
//       )
//   }

//   if (role  === "peintre") {
//       return (
//           <Img src={data.photoUrl || BrickworkImg} />
//       )
//   }
//   if (data.label === "carreleur") {
//       return (
//           <Img src={data.photoUrl || BrickworkImg} />
//       )
//   }


//   return null;
// }
const ExperienceNumber = ({ user,t }) => {
  const role = user?.roles[0]?.role || null;
  if (role) {
    if (role !== "client" && role !== "admin") {
      return (
        <BioItem>
          <BioItemLabel>{t('nombre dexpérience')}</BioItemLabel>
          <BioItemVal>{user.experienceNumber}</BioItemVal>
        </BioItem>
      );
    }
    return null;
  }
  return null;
};

function Profile({ system ,props,  t  }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { user: userSy } = system;
  const role = userSy.roles[0]?.role;

  const getUserData = async ({ userSy }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/search/user/${userSy.id}/`
      );
      if (data) {
        setUser(data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const { user: userSy } = system;

    setLoading(true);

    if (userSy.id) {
      getUserData({ userSy });
    }
  }, [system]);

  // if (role === "admin") {
  //   return <Navigate to="/dashboard/404" />
  //}

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : user.id ? (
        <>
          <HeaderContainer>
            
            <ProfileImg elevation={0}>
              {user.photoUrl ? (
                <Img src={user.photoUrl} />
              ) : (
                <div 
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    flexWrap: "wrap",
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundImage: user.role === "admin" 
                    ? `url(${defaultImage})`
                    : user.role === "client"
                    ? `url(${techavatar})`
                    : user.role === "menuisier"
                    ? `url(${TechnicianImg})`
                    : user.role === "plombier"
                    ? `url(${PlumberImg})`
                    : user.role === "soudeur"
                    ? `url(${welderImg})`
                    : user.role === "electricien"
                    ? `url(${ElectricianImg})`
                    : user.role === "paysagiste"
                    ? `url(${OrchardImg})`
                    : user.role === "peintre"
                    ? `url(${PeintreImg})`
                    : user.role === "carreleur"
                    ? `url(${BrickworkImg})`
                    : user.role === "chauffagiste"
                    ? `url(${EntretienImg})`
                    : user.role === "locksmiths"
                    ? `url(${LockImg})`
                    : `url(${defaultImage})`,
                    
}} 

></div>
)}
<RenderName user={user} />
<RenderProfileName user={user} t={t}/>
</ProfileImg>

{/* <ProfileImg elevation={0}>
                  <Avatar alt={RenderName({ user: user })} src={user.imageUrl}>
              {
                  user.firstName({ user: user })[0].toUpperCase()
              }
          </Avatar>
                      <Img
                          src={user.photoUrl}
                           
                      />
                      <RenderName user={user} />
                      <RenderProfileName user={user} />
                  </ProfileImg> */}
<BasicInfo elevation={0}>
<BioTypo color={"primary"}>{t('coordonnées')}</BioTypo>
<BioColumns>
  <BioItem>
    <BioItemLabel>{t('Ville')}</BioItemLabel>
    <BioItemVal>{user.ville}</BioItemVal>
  </BioItem>
  <BioItem>
    <BioItemLabel>{t('Adresse')}</BioItemLabel>
    <BioItemVal>{user.address}</BioItemVal>
  </BioItem>
  <BioItem>
    <BioItemLabel>{t('Code postale')}</BioItemLabel>
    <BioItemVal>{user.postalCode}</BioItemVal>
  </BioItem>
</BioColumns>
<BioColumns>
  <BioItem>
    <BioItemLabel>{t('E-mail')}</BioItemLabel>
    <BioItemVal>{user.email}</BioItemVal>
  </BioItem>
  <BioItem>
    <BioItemLabel>{t('Numéro de téléphone')}</BioItemLabel>
    <BioItemVal>{user.phoneNumber}</BioItemVal>
  </BioItem>
  <ExperienceNumber user={user} t={t}/>
</BioColumns>
<BioAction>
  <EditBtn
    component={NavLink}
    to="/dashboard/edit-profile"
    variant="contained"
  >
    {t('Editer mon Profil')}
  </EditBtn>
</BioAction>
</BasicInfo>
</HeaderContainer>
<AdvancedSection user={user} />
</>
) : null}
</Container>
);
}

const mapStateToProps = (state) => ({
  system: state.system,
});

export default compose (withNamespaces(),connect(mapStateToProps))(Profile);
