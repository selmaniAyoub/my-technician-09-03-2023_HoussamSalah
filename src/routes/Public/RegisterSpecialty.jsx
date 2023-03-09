import React,{useEffect} from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import RegisterTechnician from '../../components/Public/RegisterSpecialty/RegisterTechnician'
import RegisterDentist from '../../components/Public/RegisterSpecialty/RegisterDentist'
import RegisterPhysiotherapist from '../../components/Public/RegisterSpecialty/RegisterPhysiotherapist'
import RegisterPsychologist from '../../components/Public/RegisterSpecialty/RegisterPsychologist'
import RegisterVeterinary from '../../components/Public/RegisterSpecialty/RegisterVeterinary'
import RegisterPharmacy from '../../components/Public/RegisterSpecialty/RegisterPharmacy'
import RegisterVeterinary1 from '../../components/Public/RegisterSpecialty/RegisterVetilation'
import RegisterVeterinary2 from '../../components/Public/RegisterSpecialty/RegisterVeterinary2'


import { useLocation } from "react-router";


export default function RegisterSpecialty(category) {
    const location = useLocation();
   
    
    if (category) {
        
        return (
            <HomeLayout>
                <RegisterTechnician category={category} />
            </HomeLayout>
        )
    }

    if (location.pathname === "/register-dentist") {
        return (
            <HomeLayout>
                <RegisterDentist />
            </HomeLayout>
        )
    }

    if (location.pathname === "/register-physiotherapist") {
        return (
            <HomeLayout>
                <RegisterPhysiotherapist />
            </HomeLayout>
        )
    }

    if (location.pathname === "/register-psychologist") {
        return (
            <HomeLayout>
                <RegisterPsychologist />
            </HomeLayout>
        )
    }

    if (location.pathname === "/register-veterinary") {
        return (
            <HomeLayout>
                <RegisterVeterinary />
            </HomeLayout>
        )
    }
    if (location.pathname === "/register-veterinary") {
        return (
            <HomeLayout>
                <RegisterVeterinary1 />
            </HomeLayout>
        )
    }
    if (location.pathname === "/register-veterinary") {
        return (
            <HomeLayout>
                <RegisterVeterinary2 />
            </HomeLayout>
        )
    }

    if (location.pathname === "/register-pharmacy") {
        return (
            <HomeLayout>
                <RegisterPharmacy />
            </HomeLayout>
        )
    }

    else {
        return null;
    }
}
