import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./thunks";
import setAuthToken from "./setAuthToken";
import { store } from "./appStore";
import "./App.css";
import { useEffect } from "react";
//Public Routes
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import PrivateAdminRoute from "./routes/PrivateAdminRoute";

import Home from "./routes/Public/Home";
import Login from "./routes/Public/Login";
import Register from "./routes/Public/Register";
import RegisterTechnician from "./routes/Public/RegisterTechnician";
import Plan from "./routes/Public/Plan";

import RegisterSpecialty from "./routes/Public/RegisterSpecialty";
import SearchPage from "./routes/Public/SearchPage";
import Contact from "./routes/Public/Contact";
import Faq from "./routes/Public/Faq";
import OurPartners from "./routes/Public/OurPartners";
import AboutUs from "./routes/Public/AboutUs";
import Dashboard from "./routes/Admin/Dashboard";
import Personnel from "./routes/Public/Personnel";
import SinglePersonnel from "./routes/Public/SinglePersonnel";
import EditProfile from "./routes/Admin/EditProfile";
import DashboardComponent from "./components/Admin/Dashboard/Dashboard";
import Forum from "./routes/Admin/Forum";
import AddSchedule from "./routes/Admin/AddSchedule";
import AddScheduleUser from "./routes/Admin/AddScheduleUser";

import SeeSchedule from "./routes/Admin/Shedules";

import MyClients from "./routes/Admin/MyClients";
import Profile from "./routes/Admin/Profile";
import ProfileDetails from "./routes/Admin/ProfileDetails";
import Settings from "./routes/Admin/Settings";
import MyTechnicians from "./routes/Admin/MyTechnicians";
import EditPassword from "./routes/Admin/EditPassword";
import Users from "./routes/Admin/Users";
import Technicians from "./routes/Admin/Technicians";
import Techniciens from "./routes/Admin/Technicians";
import Notifications from "./routes/Admin/Notifications";
import PersonnelForum from "./routes/Admin/PersonnelForum";
import Specialties from "./truesSpecialties";
import Forums from "./routes/Admin/Forums";
import ForumsComponent from "./components/Admin/Forum/Forums";
import Clients from "./routes/Admin/Clients";
import SingleClient from "./routes/Admin/SingleClient";
import Praticiens from "./routes/Admin/Praticiens";
import SinglePraticien from "./routes/Admin/SinglePraticien";
//import AppointmentsDash from "./routes/Appointments/AppointmentsDash";

//import SingleAppointment from "./routes/Appointments/SingleAppointment";
import specialties from "./truesSpecialties";
//404 route
import NotFound from "./routes/NotFound/NotFound";
import AdminNotFound from "./routes/NotFound/AdminNotFound";
import Services from "./components/Public/Services/Services";
import ServicesList from "./components/Public/ServicesList/ServicesList";
import TechniciensList from "./components/Public/ServicesList/TechniciensList";
import { withNamespaces } from "react-i18next";
import HomeLayout from "./layouts/HomeLayout";
import Appointments from "./components/Admin/Appointments/Appointments";
import SingleAppointment from "./components/Admin/SingleAppointment/SingleAppointment";

import Concept from "./routes/Public/Concept";
import ConditionsDUtilisation from "./routes/Public/ConditionsDUtilisation";
import PolitiqueDeConfidentialite from "./routes/Public/PolitiqueDeConfidentialite";
import Particulier from "./routes/Public/Particulier";
import Technicien from "./routes/Public/Technicien";
import LoginUserNamePage from "./routes/Public/LoginUserNamePage";

function decodeToken(token) {
  let decoded = {};
  try {
    decoded = jwt_decode(token);
  } catch (err) {
    store.dispatch(logoutUser());
  }
  return decoded;
}

if (localStorage.jwtToken) {
  const decoded = decodeToken(localStorage.jwtToken);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime || !localStorage.user) {
    store.dispatch(logoutUser());
  } else {
    setAuthToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(JSON.parse(localStorage.user)));
  }
}

function App({ t }) {

	useEffect(() => {
		if (document) {
		  const stylesheet = document.createElement("link");
		  stylesheet.rel = "stylesheet";
		  stylesheet.href = "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";
	
		  document.head.appendChild(stylesheet);
		}
	  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/loginusername" element={<PublicRoute />}>
            
          <Route path="/loginusername" element={<LoginUserNamePage />} />   
                    
        </Route>
      
          <Route path="/technicien" element={<Technicien />} />
      
        
          <Route path="/particulier" element={<Particulier />} />
          <Route path="/conditionsdutilisation" element={<ConditionsDUtilisation />} />
          <Route path="/politiquedeconfidentialite" element={<PolitiqueDeConfidentialite />} />
          <Route path="/concept" element={<Concept />} />
       
        <Route path="/services" element={<PublicRoute />}>
          <Route
            path="/services"
            element={
              <HomeLayout>
                <ServicesList />
              </HomeLayout>
            }
          />
        </Route>
        <Route path="/List" element={<PublicRoute />}>
          <Route path="/List" element={<TechniciensList />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/find-a-technician" element={<SearchPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<Faq />} />
        <Route path="/our-partners" element={<OurPartners />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardComponent />} />
            <Route path="/dashboard/edit-profile" element={<EditProfile />} />
            <Route path="/dashboard/add-schedule" element={<AddSchedule />} />
            <Route
              path="/dashboard/add-schedule-user"
              element={<AddScheduleUser />}
            />
            <Route path="/dashboard/see-schedule" element={<SeeSchedule />} />

            <Route path="/dashboard/my-clients" element={<MyClients />} />
            <Route
              path="/dashboard/my-technicians"
              element={<MyTechnicians />}
            />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/profile2" element={<ProfileDetails />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/edit-password" element={<EditPassword />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/technicians" element={<Technicians />} />
            <Route
              path="/dashboard/techniciensNonConfirmer"
              element={<Techniciens />}
            />
            <Route path="/dashboard/appointments" element={<Appointments />} />
            <Route
              path="/dashboard/notifications"
              element={<Notifications />}
            />

            <Route path="/dashboard/praticien" element={<Praticiens />}>
              <Route index element={<AdminNotFound />} />
              <Route path=":praticienId" element={<SinglePraticien />} />
            </Route>

            <Route path="/dashboard/client" element={<Clients />}>
              <Route index element={<AdminNotFound />} />
              <Route path=":clientId" element={<SingleClient />} />
            </Route>

            <Route path="/dashboard/forums" element={<PrivateAdminRoute />}>
              <Route path="/dashboard/forums" element={<Forums />}>
                <Route index element={<ForumsComponent />} />
                {Specialties.map((d, i) => (
                  <Route
                    key={i}
                    path={`/dashboard/forums/forum-${d.category}`}
                    element={<PersonnelForum room={d.category} />}
                  />
                ))}
              </Route>
            </Route>


            
                
                  <Route
                    
                    path={`/dashboard/forum`}
                    element={<Forum  />}
                  />
               
             
            



            <Route path="/dashboard/404" element={<AdminNotFound />} />
            <Route
              path="/dashboard/*"
              element={<Navigate to="/dashboard/404" />}
            />
          </Route>
        </Route>

        <Route path="/register-technicians" element={<PublicRoute />}>
          <Route
            path="/register-technicians"
            element={<RegisterTechnician />}
          />
        </Route>
        <Route path="/register-plans" element={<PublicRoute />}>
          <Route path="/register-plans" element={<Plan />} />
        </Route>
        <Route path="/personnel" element={<Personnel />}>
          <Route index element={<Navigate to="/find-a-technician" />} />
          <Route path=":personnelId" element={<SinglePersonnel />} />
        </Route>

        {specialties.map((data, i) => (
          <Route
            key={i}
            path={`/register-${data.category}`}
            element={<PublicRoute />}
          >
            <Route
              path={`/register-${data.category}`}
              element={<RegisterSpecialty category={data.category} />}
            />
          </Route>
        ))}

        <Route path="/404" element={<NotFound />} />
        <Route path="" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
