import React, { Component } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import UserIcon from "../../assets/user-login.png";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import belgiqueVilles from "../../BelgiqueVilles";
import Languages from "../../Langues";
import Specialties from "../../SpecificSpecialties";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { withSnackbar } from "notistack";
import UploadProfileImg from "./UploadProfileImg";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";

//Thunk
import { setCurrentUser } from "../../thunks";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 230,
    },
  },
};

const Container = styled("div")`
  padding: 24px;
  @media only screen and (max-width: 600px) {
    padding: 8px;
  }
`;

const Header = styled(Typography)`
  font-size: 40px;
  font-weight: 600;
  color: #373737;
  margin-top: 20px;
  margin-bottom: 20px;
  @media only screen and (max-width: 900px) {
    font-size: 30px;
  }
`;

const SubHeader = styled(Typography)`
  font-size: 25px;
  font-weight: 600;
  color: #373737;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SectionsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 2em 0;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImgSide = styled(Paper)`
  display: flex;
  width: 25%;
  min-width: 250px;
  max-width: 350px;
  margin: 0 10px auto 0;
  flex-direction: column;
  border: 1px solid #f1f1f1;
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

const Img = styled("img")`
  display: flex;
  width: 100%;
  padding: 1em;
  max-width: 300px;
  height: auto;
  margin: 0 auto;
`;

const FormsSide = styled(Paper)`
    width: 70%;
    max-width: 900px;
    border: 1px solid #f1f1f1;

    @media only screen and (max-width: 900px){
        width: 100%;   
        margin-top 40px;
    }
`;

const FormContainer = styled("form")`
  padding: 0 1em 1em 1em;
`;

const SubHeaderContainer = styled("div")`
  padding: 1em 0 0 1em;
`;

const FieldsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

const SideFormControll = styled(FormControl)`
  margin: 20px 5px;
  width: 47%;
  max-width: 500px;
  @media only screen and (max-width: 900px) {
    display: flex;
    width: 100%;
    margin: 20px auto;
  }
`;

const FullFormControll = styled(FormControl)`
  margin: 10px 5px;
  width: 99%;
`;

const BtnContainer = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 40px auto;
`;

const SaveBtn = styled(Button)`
  margin-top: 10px;
  padding: 10px 16px;
  width: 90%;
  max-width: 500px;
  font-weight: 600;
`;

const LoadingContainer = styled("div")`
  display: flex;
  height: 80vh;
  min-height: 500px;
  align-items: center;
  justify-content: center;
`;

const RenderImg = ({ user, profilePhoto }) => {
  if (profilePhoto) {
    return <Img src={URL.createObjectURL(profilePhoto)} />;
  } else {
    if (user && user.photoUrl) {
      return <Img src={user.photoUrl} />;
    }
    return <Img src={UserIcon} />;
  }
};

const RenderLastName = ({ handleChange, user, value, disabled, t ,props}) => {
  if (user.roles[0].role !== "pharmacie") {
    return (
      <SideFormControll variant="filled" required>
        <TextField
          type="text"
          onChange={handleChange}
          id="standard-basic-lastName"
          label={t("Nom")}
          variant="filled"
          required
          value={value}
        />
      </SideFormControll>
    );
  }
  return null;
};

const RenderFirstName = ({ handleChange, user, value, disabled, t }) => {
  if (user.roles[0].role !== "pharmacie") {
    return (
      <SideFormControll variant="filled" required>
        <TextField
          type="text"
          onChange={handleChange}
          id="standard-basic-firstName"
          label={t("Prénom")}
          variant="filled"
          required
          value={value}
        />
      </SideFormControll>
    );
  }
  return null;
};

const RenderName = ({ handleChange, user, value, disabled, t }) => {
  if (user.roles[0].role === "pharmacie") {
    return (
      <FullFormControll variant="filled" required>
        <TextField
          type="text"
          onChange={handleChange}
          id="standard-basic-firstName"
          label={t("Nom")}
          variant="filled"
          required
          value={value}
        />
      </FullFormControll>
    );
  }
  return null;
};

const RenderPhoneNumber = ({ handleChange, value, disabled, t }) => {
  return (
    <SideFormControll variant="filled" required>
      <TextField
        type="tel"
        onChange={handleChange}
        id="standard-basic-phoneNumber"
        label={t("Numéro de téléphone")}
        variant="filled"
        required
        value={value}
      />
    </SideFormControll>
  );
};

const RenderVille = ({ handleChange, value, disabled,props,t }) => {
  return (
    <SideFormControll variant="filled" required>
      <InputLabel id="demo-simple-select-standard-label-1">{t('Ville')}</InputLabel>
      <Select
        id="demo-simple-select-standard-1"
        value={value}
        onChange={handleChange}
        label={t("Ville")}
        required
        MenuProps={MenuProps}
      >
        {belgiqueVilles.map((ville, i) => (
          <MenuItem key={i} value={ville}>
            {ville}
          </MenuItem>
        ))}
      </Select>
    </SideFormControll>
  );
};

const RenderAddress = ({ handleChange, value, disabled,t }) => {
  return (
    <SideFormControll variant="filled" required>
      <TextField
        type="text"
        onChange={handleChange}
        id="standard-basic-address"
        label={t("Adresse")}
        variant="filled"
        required
        value={value}
      />
    </SideFormControll>
  );
};

const RenderCodePostal = ({ handleChange, value, disabled, t }) => {
  return (
    <SideFormControll variant="filled" required>
      <TextField
        type="number"
        inputProps={{
          max: "9999",
          min: "1000",
        }}
        onChange={handleChange}
        id="standard-basic-codePostal"
        label={t("Code Postal")}
        variant="filled"
        required
        value={value}
      />
    </SideFormControll>
  );
};

const RenderLangue = ({ handleChange, value, disabled, user, t }) => {
  if (user.roles[0].role !== "admin"){
  return (
    <SideFormControll variant="filled" required>
      <InputLabel id="demo-simple-select-standard-label-2">{t('Langue')}</InputLabel>
      <Select
        id="demo-simple-select-standard-2"
        value={value}
        onChange={handleChange}
        label={t("Langue")}
        multiple
        required
      >
        {Languages.map((Language, i) => (
          <MenuItem key={i} value={Language}>
            {Language}
          </MenuItem>
        ))}
      </Select>
    </SideFormControll>
  );
        }
};

const RenderSpecialties = ({ user, handleChange, value, disabled, t }) => {
  console.log("user=",user);
  if (user.roles[0].role === "medecin") {
    return (
      <SideFormControll variant="filled" required>
        <InputLabel id="demo-simple-select-standard-label-1">
          {t('Spécialité')}
        </InputLabel>
        <Select
          id="demo-simple-select-standard-1"
          value={value}
          onChange={handleChange}
          label={t("Ville")}
          required
          MenuProps={MenuProps}
        >
          {Specialties.map((s, i) => (
            <MenuItem key={i} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </SideFormControll>
    );
  }
  return null;
};

const RenderExperienceNumber = ({ user, handleChange, value, disabled, t }) => {
  if (user?.roles[0]?.role !== "client" ) {
    return (
      <SideFormControll variant="filled" required>
        <TextField
          type="number"
          onChange={handleChange}
          id="standard-basic-experienceNumber"
          label={t("Nombre d'expérience")}
          variant="filled"
          required
          value={value}
        />
      </SideFormControll>
    );
  }
  return null;
};

const RenderInami = ({ user, handleChange, value, disabled }) => {
  if (user.roles[0].role === "medecin") {
    return (
      <SideFormControll variant="filled" required>
        <TextField
          type="number"
          onChange={handleChange}
          id="standard-basic-inami"
          label="Inami"
          variant="filled"
          required
          value={value}
        />
      </SideFormControll>
    );
  }
  return null;
};

const url = `https://api.cloudinary.com/v1_1/bilel-moussa/upload`;

const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "btuw2go3");
    fetch(url, {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

class EditProfile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      ville: "",
      address: "",
      codePostal: "",
      langue: [],
      speciality: "",
      experienceNumber: "",
      inami: "",
      disabled: false,
      loading: true,
      profilePhoto: null,
      user: {},
    };
  }

  action = (key) => (
    <Button
      style={{ color: "#FFF" }}
      onClick={() => {
        this.props.closeSnackbar(key);
      }}
    >
      Fermer
    </Button>
  );

  onPhotoAdded = (NewPhoto) => {
    this.setState({
      profilePhoto: NewPhoto,
    });
  };

  async componentDidMount() {
    const { user: _user } = this.props.system;
    if (_user.id) {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/search/user/${_user.id}`
        );

        if (data) {
          this.setState({
            user: data,
            name: data?.name || "",
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            phoneNumber: data?.phoneNumber,
            ville: data?.ville,
            address: data?.address,
            codePostal: data?.postalCode,
            langue: data?.language || "",
            speciality: data?.speciality || "",
            experienceNumber: data?.experienceNumber || "",
            inami: data?.inami || "",
          });
        }

        this.setState({ loading: false });
      } catch (err) {
        console.log(err);
        this.setState({ loading: false });
      }
    }
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleLangueChange = (event) => {
    const {
      target: { value },
    } = event;

    const val = typeof value === "string" ? value.split(",") : value;

    this.setState({
      langue: val,
    });
  };

  EditPatiantAccount = async () => {
    try {
      this.setState({ disabled: true });
      const {
        firstName,
        lastName,
        phoneNumber,
        ville,
        address,
        codePostal,
        langue,
        user,
        profilePhoto,
      } = this.state;

      if (
        firstName !== user.firstName ||
        lastName !== user.lastName ||
        phoneNumber !== user.phoneNumber ||
        ville !== user.ville ||
        address !== user.address ||
        codePostal !== user.postalCode ||
        langue !== user.language ||
        profilePhoto
      ) {
        const data = {
          email: user.email,
          firstName,
          lastName,
          phoneNumber,
          ville,
          address,
          postalCode: codePostal,
          language: langue,
        };

        if (profilePhoto) {
          const resImg = await uploadImage(profilePhoto);
          if (resImg.url) {
            data.photoUrl = resImg.url;
          }
        }

        const res = await axios.put(
          "http://localhost:5000/search/user/${_user.id}",
          data
        );

        if (res.data) {
          this.setState({ disabled: false });
          // this.props.setCurrentUser(res.data)
          this.props.enqueueSnackbar("Mise à jour effectué !", {
            variant: "success",
            action: this.action,
          });
        }
      }
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      this.props.enqueueSnackbar("server error", {
        variant: "error",
        action: this.action,
      });
      this.setState({ disabled: false });
    }
  };

  // EditDoctorAccount = async () => {
  //   try {
  //     this.setState({ disabled: true });
  //     const {
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //       ville,
  //       address,
  //       codePostal,
  //       langue,
  //       inami,
  //       experienceNumber,
  //       speciality,
  //       user,
  //       profilePhoto,
  //     } = this.state;

  //     if (
  //       firstName !== user.firstName ||
  //       lastName !== user.lastName ||
  //       phoneNumber !== user.phoneNumber ||
  //       ville !== user.ville ||
  //       address !== user.address ||
  //       codePostal !== user.postalCode ||
  //       langue !== user.language ||
  //       inami !== user.inami ||
  //       experienceNumber !== user.experienceNumber ||
  //       speciality !== user.speciality ||
  //       profilePhoto
  //     ) {
  //       const data = {
  //         email: user.email,
  //         firstName,
  //         lastName,
  //         phoneNumber,
  //         ville,
  //         address,
  //         postalCode: codePostal,
  //         language: langue,
  //         inami,
  //         experienceNumber,
  //         speciality,
  //       };

  //       if (profilePhoto) {
  //         const resImg = await uploadImage(profilePhoto);
  //         if (resImg.url) {
  //           data.photoUrl = resImg.url;
  //         }
  //       }

  //       const res = await axios.put(
  //         "http://localhost:5000/users/edit${role}",
  //         data
  //       );

  //       if (res.data) {
  //         // this.props.setCurrentUser(res.data)
  //         this.setState({ disabled: false });
  //         this.props.enqueueSnackbar("Mise à jour effectué !", {
  //           variant: "success",
  //           action: this.action,
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     console.log(err.response.data);
  //     this.setState({ disabled: false });
  //     this.props.enqueueSnackbar("server error", {
  //       variant: "error",
  //       action: this.action,
  //     });
  //   }
  // };

  // EditPharmacieAccount = async () => {
  //   try {
  //     this.setState({ disabled: true });
  //     const {
  //       name,
  //       phoneNumber,
  //       ville,
  //       address,
  //       codePostal,
  //       langue,
  //       experienceNumber,
  //       user,
  //       profilePhoto,
  //     } = this.state;

  //     if (
  //       name !== user.name ||
  //       phoneNumber !== user.phoneNumber ||
  //       ville !== user.ville ||
  //       address !== user.address ||
  //       codePostal !== user.postalCode ||
  //       langue !== user.language ||
  //       experienceNumber !== user.experienceNumber ||
  //       profilePhoto
  //     ) {
  //       const data = {
  //         email: user.email,
  //         name,
  //         phoneNumber,
  //         ville,
  //         address,
  //         postalCode: codePostal,
  //         language: langue,
  //         experienceNumber,
  //       };

  //       if (profilePhoto) {
  //         const resImg = await uploadImage(profilePhoto);
  //         if (resImg.url) {
  //           data.photoUrl = resImg.url;
  //         }
  //       }

  //       const res = await axios.put(
  //         "http://localhost:5000/users/edit${role}",
  //         data
  //       );

  //       if (res.data) {
  //         // this.props.setCurrentUser(res.data)
  //         this.props.enqueueSnackbar("Mise à jour effectué !", {
  //           variant: "success",
  //           action: this.action,
  //         });
  //         this.setState({ disabled: false });
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     console.log(err.response.data);
  //     this.props.enqueueSnackbar("server error", {
  //       variant: "error",
  //       action: this.action,
  //     });
  //     this.setState({ disabled: false });
  //   }
  // };
  EditadminAccount = async () => {
    try {
      this.setState({ disabled: true });
      const {
        
        firstName,
        lastName,
        phoneNumber,
        ville,
        address,
        codePostal,
        langue,
        inami,
        
        user,
        profilePhoto,
      } = this.state;

      if (
        firstName !== user.firstName ||
        lastName !== user.lastName ||
        phoneNumber !== user.phoneNumber ||
        ville !== user.ville ||
        address !== user.address ||
        codePostal !== user.postalCode ||
        langue !== user.language ||
        inami !== user.inami ||
        profilePhoto
      ) {
        const role = user?.roles[0]?.role;

        const data = {
          email: user.email,
          firstName,
          lastName,
          phoneNumber,
          ville,
          address,
          postalCode: codePostal,
          language: langue || [],
          inami,
          speciality: null,
        };

        if (this.state.profilePhoto) {
          const resImg = await uploadImage(this.state.profilePhoto);
          if (resImg.url) {
            data.photoUrl = resImg.url;
          }
        }

        const res = await axios.put(
          `http://localhost:5000/users/editadmin`,
          data
        );

        if (res.data) {
          // this.props.setCurrentUser(res.data)
          this.props.enqueueSnackbar("Mise à jour effectué !", {
            variant: "success",
            action: this.action,
          });
          this.setState({ disabled: false });
        }
      }
    } catch (err) {
      console.log(err);
      this.props.enqueueSnackbar("server error", {
        variant: "error",
        action: this.action,
      });
      this.setState({ disabled: false });
    }
  };

  EditOthersAccount = async () => {
    try {
      this.setState({ disabled: true });
      const {
        firstName,
        lastName,
        phoneNumber,
        ville,
        address,
        codePostal,
        langue,
        inami,
        experienceNumber,
        user,
        profilePhoto,
      } = this.state;

      if (
        firstName !== user.firstName ||
        lastName !== user.lastName ||
        phoneNumber !== user.phoneNumber ||
        ville !== user.ville ||
        address !== user.address ||
        codePostal !== user.postalCode ||
        langue !== user.language ||
        inami !== user.inami ||
        experienceNumber !== user.experienceNumber ||
        profilePhoto
      ) {
        const role = user?.roles[0]?.role;

        const data = {
          email: user.email,
          firstName,
          lastName,
          phoneNumber,
          ville,
          address,
          postalCode: codePostal,
          language: langue,
          inami,
          experienceNumber,
          speciality: null,
        };

        if (this.state.profilePhoto) {
          const resImg = await uploadImage(this.state.profilePhoto);
          if (resImg.url) {
            data.photoUrl = resImg.url;
          }
        }

        const res = await axios.put(
          `http://localhost:5000/users/edit${role}`,
          data
        );

        if (res.data) {
          // this.props.setCurrentUser(res.data)
          this.props.enqueueSnackbar("Mise à jour effectué !", {
            variant: "success",
            action: this.action,
          });
          this.setState({ disabled: false });
        }
      }
    } catch (err) {
      console.log(err);
      this.props.enqueueSnackbar("server error", {
        variant: "error",
        action: this.action,
      });
      this.setState({ disabled: false });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { user } = this.state;
    const { role = null } = user?.roles[0];

    if (user && role === "patient") {
      this.EditPatiantAccount();
      return;
    }

    if (user && role === "admin") {
      this.EditadminAccount();
      return;
    }
    if (user && role === "pharmacie") {
      this.EditPharmacieAccount();
      return;
    } else {
      this.EditOthersAccount();
    }
  };

  render() {
    const { t } = this.props;
    const {
      firstName,
      name,
      lastName,
      phoneNumber,
      ville,
      address,
      codePostal,
      langue,
      loading,
      speciality,
      inami,
      experienceNumber,
      user,
      profilePhoto,
    } = this.state;

    return (
      <Container>
        <Header variant="h1">{t('Editer votre profile')}</Header>
        <Divider />
        {loading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : user.id ? (
          <SectionsContainer>
            <ImgSide elevation={0}>
              <RenderImg profilePhoto={profilePhoto} user={user} />
              <UploadProfileImg
                onPhotoAdded={this.onPhotoAdded}
                profilePhoto={profilePhoto}
                loading={loading}
              />
            </ImgSide>
            <FormsSide elevation={0}>
              <SubHeaderContainer>
                <SubHeader>{t('Mes informations')}:</SubHeader>
              </SubHeaderContainer>
              <FormContainer onSubmit={this.handleSubmit}>
                <Divider />
                <FieldsContainer>
                  <RenderName
                    handleChange={this.handleChange("name")}
                    value={name}
                    user={user}
                    t={t}
                  />
                  <RenderFirstName
                    handleChange={this.handleChange("firstName")}
                    value={firstName}
                    user={user}
                    t={t}
                  />
                  <RenderLastName
                    handleChange={this.handleChange("lastName")}
                    value={lastName}
                    user={user}
                    t={t}
                  />
                  <RenderPhoneNumber
                    handleChange={this.handleChange("phoneNumber")}
                    value={phoneNumber}
                    user={user}
                    t={t}
                  />
                  <RenderVille
                    handleChange={this.handleChange("ville")}
                    value={ville}
                    user={user}
                    t={t}
                  />
                  <RenderAddress
                    handleChange={this.handleChange("address")}
                    value={address}
                    user={user}
                    t={t}
                  />
                  <RenderCodePostal
                    handleChange={this.handleChange("codePostal")}
                    value={codePostal}
                    user={user}
                    t={t}
                  />
                  <RenderSpecialties
                    handleChange={this.handleChange("speciality")}
                    value={speciality}
                    user={user}
                    t={t}
                  />
                  <RenderLangue
                    handleChange={this.handleChange("langue")}
                    value={langue}
                    user={user}
                    t={t}
                  />
                  

                  <RenderExperienceNumber
                    handleChange={this.handleChange("experienceNumber")}
                    value={experienceNumber}
                    user={user}
                    t={t}
                  />
            
                  <RenderInami
                    handleChange={this.handleChange("inami")}
                    value={inami}
                    user={user}
                    t={t}
                  />
                </FieldsContainer>
                <BtnContainer>
                  <SaveBtn type="submit" variant="contained"  t={t}>{t('sauvegarder')}</SaveBtn>
                </BtnContainer>
              </FormContainer>
            </FormsSide>
          </SectionsContainer>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  system: state.system,
});



export default compose(withNamespaces(),connect(mapStateToProps, { setCurrentUser }),withSnackbar)(EditProfile);
