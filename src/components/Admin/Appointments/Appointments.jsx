import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { connect } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AppointmentsTable from "./AppointmentsTable";
import UserAppointmentsTable from "./UserAppointmentsTable";
import { translate } from 'react-i18next';
import { compose } from "recompose";
import { withNamespaces } from "react-i18next";


const Container = styled("div")`
  margin: 50px 0;
  @media only screen and (max-width: 900px) {
    margin-top: 10px;
  }
  padding: 24px;
  @media only screen and (max-width: 600px) {
    padding: 8px;
  }
`;

const LoadingContainer = styled("div")`
  display: flex;
  height: 80vh;
  min-height: 500px;
  align-items: center;
  justify-content: center;
`;

const Header = styled(Typography)`
  font-size: 40px;
  font-weight: 600;
  color: #373737;
  margin-top: 5px;
  margin-bottom: 20px;
  @media only screen and (max-width: 900px) {
    font-size: 30px;
  }
`;
function Appointments({ system,t }) {
  const [myAppointments, setMyAppointments] = useState();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  useEffect(() => {
    const { user: userSy } = system;
    console.log("dddd", userSy?.roles[0]?.role, "id: ", userSy.id);
    setRole(userSy?.roles[0]?.role || null);
    setLoading(true);
    if (userSy?.roles[0]?.role !== "client" && userSy.id) {
      //api all rendezvous compte Med
      axios
        .get(`http://192.168.1.113:5000/rendezvous/AllRdvPerso`)
        .then((res) => {
          if (res.data) {
            console.log("AllRdvClient : ", res.data);
            setMyAppointments(res.data);
             const { data }=res;
                for (let elem of res.data) {
                console.log(" elem.clientId : ",elem.clientId)
                axios
                .get(`http://192.168.1.113:5000/admin/single/client/${elem.clientId}`)
                 .then((res) => {
                  console.log(" Personnel Data : ", res.data);
                   const app={
                    id:   elem.id,
                     startTime:  elem.startTime,
                     endTime: elem.endTime,
                     status: elem.status,
                   subject: elem.subject,
                    text: elem.text,
                   name: res.data.firstName+" "+res.data.lastName,
                   ville: res.data.ville,
                   address : res.data.address,
                    email: res.data.email,
                   phoneNumber : res.data.phoneNumber
                  }
                  console.log("app : ",app);
                 setMyAppointments(app)
                  })
                 .catch((err) => {
                  console.log(err.message);
                  setLoading(false);
                 });
            
          }}

          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    } else {
      //api all rendezvous compte Med
      axios
        .get(`http://192.168.1.113:5000/rendezvous/AllRdvClient`)
        .then((res) => {
          if (res.data) {
            console.log("AllRdvClient : ", res.data);
            setMyAppointments(res.data);
             const { data }=res;
                for (let elem of data) {
                console.log(" elem.personnelId : ",elem.personnelId)
                
                .get(`http://192.168.1.113:5000/admin/single/client/${elem.personnelId}`)
                 .then((res) => {
                  console.log(" Personnel Data : ", res.data);
                   const app={
                    id:   elem.id,
                     startTime:  elem.startTime,
                     endTime: elem.endTime,
                     status: elem.status,
                   subject: elem.subject,
                    text: elem.text,
                   name: res.data.firstName+" "+res.data.lastName,
                   ville: res.data.ville,
                   address : res.data.address,
                    email: res.data.email,
                   phoneNumber : res.data.phoneNumber
                  }
                  console.log("app : ",app);
                 setMyAppointments(app)
                  })
                 .catch((err) => {
                  console.log(err.message);
                  setLoading(false);
                 });
            
          }}

          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    }
  }, [system]);

  return (
    <Container>
   
      <Header variant="h1">{t('Mes rendez-vous')}</Header>
      <Divider />
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : role === "client" ? (
        <UserAppointmentsTable appointments={myAppointments} />
      ) : (
        <AppointmentsTable appointments={myAppointments} />
      )}
    </Container>
  );
}
const mapStateToProps = (state) => ({
  system: state.system,
});

export default compose (withNamespaces(),connect(mapStateToProps))(Appointments);
