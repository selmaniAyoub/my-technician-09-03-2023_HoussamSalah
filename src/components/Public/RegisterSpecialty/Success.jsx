import React, { Component } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import UserLoginImg from '../../../assets/user-login.png';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';
import RegisterSideImg from '../../../assets/register.jpg';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import languages from '../../../Langues';
import belgiqueVilles from '../../../BelgiqueVilles';
import specialties from '../../../SpecificSpecialties';
import { withSnackbar } from 'notistack';
import "./Success.css";

let source;


const Success =()=> {




        return (
            <div>
<div className="card " style={{marginTop:"50px", marginBottom:"50px"}} >
  <div style={{borderRadius: 200, height: 200, width: 200, background: '#F8FAF5', margin: '0 auto'}}>
    <i className="checkmark">✓</i>
  </div>
  <h1>Success !</h1> 
  <p>We received your purchase request;<br /> we'll be in touch shortly!</p>
</div>
</div>
        )
    
}

export default withSnackbar(Success);