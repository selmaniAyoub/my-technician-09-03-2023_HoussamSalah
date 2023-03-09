import React from 'react'
import HomeLayout from '../../../layouts/HomeLayout'
import LandPage from '../LandPage/LandPage'
import SearchBar from '../SearchBar/SearchBar'
import AboutUs from '../AboutUs/AboutUs'
import ServicesList from '../ServicesList/ServicesList'
import TechniciansList from '../TechniciansList/TechniciansList'

import WhyUsSection from '../WhyUsSection/WhyUsSection'
import 'animate.css';
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Animation } from 'react-animations';
import { useEffect } from "react";

export default function Home() {
 



      
    return (
        <HomeLayout>
           
            <LandPage  />
           <SearchBar/>
            <AboutUs />
            <ServicesList />
            <WhyUsSection />
        </HomeLayout>
    )
}
