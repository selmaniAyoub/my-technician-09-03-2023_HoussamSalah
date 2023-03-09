import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'


import SearchBar from '../SearchBar/SearchBar'
import { useSearchParams } from "react-router-dom"
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import TechnicienCard from './TechnicienCard'

const BgSearchTechnician = styled('div')`
    width: 100%;
  padding-top: 150px;
 
    background-color: #f9f9f9;

`

const MainContainer = styled(Container)`
    @media only screen and (max-width: 900px){
        padding: 32px 16px !important;
    }

    z-index: 1;
    margin-bottom: 150px
`

const GridContainer = styled('div')`
    margin-top: 50px;
    margin-bottom: 50px;
`

const LoadingContainer = styled('div')`
    display: flex;
    min-height: 400px;
    align-items: center;
    justify-content: center;
`



export default function TechniciensList() {
   
    const [loading, setLoading] = useState(false);

const categories = {
    "paysagistes": [
        {
            "id": 44,
            "email": "sami1995@gmail.com",
            "username": null,
            "roles": [
                {
                    "id": 5,
                    "role": "medecin"
                }
            ],
            "createdAt": "08/12/2022 23:55:32",
            "active": true,
            "banned": false,
            "deleted": false,
            "nbviews": 0,
            "ipUsers": null,
            "confirmationToken": null,
            "ville": "Bilzen",
            "phoneNumber": 96978951,
            "photoUrl": null,
            "jwt": null,
            "online": "offline",
            "description": null,
            "experienceNumber": 5,
            "accreditation": "Yes",
            "inami": "",
            "diplomes": [],
            "experiences": [],
            "rendezVous": null,
            "schedule": null,
            "forum": null,
            "notifications": null,
            "plan": {
                "id": 0,
                "title": "Basic",
                "description": null,
                "price": 100.0
            },
            "firstName": "mmmm",
            "lastName": "mmmm",
            "address": "mmm",
            "postalCode": 57,
            "language": null,
            "photoCabinet": null,
            "nbRdv": 5
        }
    ],
    "soudeurs": [
        {
            "id": 46,
            "email": "houssemsal0@gmail.com",
            "username": null,
            "roles": [
                {
                    "id": 5,
                    "role": "medecin"
                }
            ],
            "createdAt": "09/12/2022 01:06:45",
            "active": false,
            "banned": false,
            "deleted": true,
            "nbviews": 0,
            "ipUsers": null,
            "confirmationToken": null,
            "ville": null,
            "phoneNumber": 95729581,
            "photoUrl": "https://res.cloudinary.com/bilel-moussa/image/upload/v1644533163/user-icon-human-person-sign-vector-10206693_hs5pi9.png",
            "jwt": null,
            "online": "offline",
            "description": null,
            "experienceNumber": 8,
            "speciality": null,
            "accreditation": "No",
            "inami": null,
            "diplomes": [],
            "experiences": [],
            "rendezVous": null,
            "schedule": null,
            "forum": null,
            "notifications": null,
            "plan": {
                "id": 2,
                "title": "Premium",
                "description": null,
                "price": 300.0
            },
            "firstName": "fqbe<q",
            "lastName": "rzen",
            "address": "fdqqb",
            "postalCode": 555,
            "language": null,
            "photoCabinet": null,
            "nbRdv": 5
        },
        {
            "id": 58,
            "email": "test5@gmail.com",
            "username": null,
            "roles": [
                {
                    "id": 57,
                    "role": "soudeur"
                }
            ],
            "createdAt": "16/01/2023 13:17:59",
            "active": true,
            "banned": false,
            "deleted": false,
            "nbviews": 1,
            "ipUsers": null,
            "confirmationToken": null,
            "ville": "Alost",
            "phoneNumber": 50376933,
            "photoUrl": null,
            "jwt": null,
            "online": "offline",
            "description": null,
            "experienceNumber": 10,
            "speciality": "Cardiologie",
            "accreditation": null,
            "inami": "2",
            "diplomes": [],
            "experiences": [],
            "rendezVous": null,
            "schedule": null,
            "forum": null,
            "notifications": null,
            "plan": null,
            "firstName": "test",
            "lastName": "test",
            "address": "21st, rue sqdsqd",
            "postalCode": 2081,
            "language": [],
            "photoCabinet": [],
            "nbRdv": 0
        },
        {
            "id": 60,
            "email": "test6@gmail.com",
            "username": null,
            "roles": [
                {
                    "id": 57,
                    "role": "soudeur"
                }
            ],
            "createdAt": "16/01/2023 14:08:46",
            "active": false,
            "banned": false,
            "deleted": false,
            "nbviews": 1,
            "ipUsers": null,
            "confirmationToken": "517Tq14emXCUWCbgx8zKJxLFkgQwSf",
            "ville": "Alost",
            "phoneNumber": 50376933,
            "photoUrl": null,
            "jwt": null,
            "online": "offline",
            "description": null,
            "experienceNumber": 10,
            "speciality": "Cardiologie",
            "accreditation": null,
            "inami": "2",
            "diplomes": [],
            "experiences": [],
            "rendezVous": null,
            "schedule": null,
            "forum": null,
            "notifications": null,
            "plan": null,
            "firstName": "test",
            "lastName": "test",
            "address": "21st, rue sqdsqd",
            "postalCode": 2081,
            "language": [],
            "photoCabinet": [],
            "nbRdv": 0
        }
    ],
    "plombiers": [
        {
            "id": 50,
            "email": "mourad@gmail.com",
            "username": null,
            "roles": [
                {
                    "id": 5,
                    "role": "medecin"
                }
            ],
            "createdAt": "09/12/2022 14:08:46",
            "active": true,
            "banned": false,
            "deleted": false,
            "nbviews": 0,
            "ipUsers": null,
            "confirmationToken": null,
            "ville": "Anderlecht",
            "phoneNumber": 95729581,
            "photoUrl": "http://res.cloudinary.com/bilel-moussa/image/upload/v1670449752/afc61150bab7495cc5219c393e6b1745.jpg",
            "jwt": null,
            "online": "offline",
            "description": null,
            "experienceNumber": 8,
            "speciality": "Capenter",
            "accreditation": "No",
            "inami": "",
            "diplomes": [],
            "experiences": [],
            "rendezVous": null,
            "schedule": null,
            "forum": null,
            "notifications": null,
            "plan": {
                "id": 2,
                "title": "Premium",
                "description": null,
                "price": 300.0
            },
            "firstName": "hh",
            "lastName": "hh",
            "address": "hh",
            "postalCode": 55,
            "language": null,
            "photoCabinet": null,
            "nbRdv": null
        },
        {
            "id": 54,
            "email": "test2@gmail.com",
            "username": null,
            "roles": [
                {
                    "id": 53,
                    "role": "plombier"
                }
            ],
            "createdAt": "16/01/2023 12:52:21",
            "active": true,
            "banned": false,
            "deleted": false,
            "nbviews": 1,
            "ipUsers": null,
            "confirmationToken": null,
            "ville": "Alost",
            "phoneNumber": 50376933,
            "photoUrl": null,
            "jwt": null,
            "online": "offline",
            "description": null,
            "experienceNumber": 10,
            "speciality": "Cardiologie",
            "accreditation": null,
            "inami": "2",
            "diplomes": [],
            "experiences": [],
            "rendezVous": null,
            "schedule": null,
            "forum": null,
            "notifications": null,
            "plan": null,
            "firstName": "test",
            "lastName": "test",
            "address": "21st, rue sqdsqd",
            "postalCode": 2081,
            "language": [],
            "photoCabinet": [],
            "nbRdv": 0
        },
        {
            "id": 56,
            "email": "aaaaaa@gmail.com",
            "username": null,
            "roles": [
                {
                    "id": 53,
                    "role": "plombier"
                }
            ],
            "createdAt": "16/01/2023 12:59:17",
            "active": true,
            "banned": false,
            "deleted": false,
            "nbviews": 1,
            "ipUsers": null,
            "confirmationToken": null,
            "ville": "Bilzen",
            "phoneNumber": 95729581,
            "photoUrl": null,
            "jwt": null,
            "online": "offline",
            "description": null,
            "experienceNumber": 8,
            "speciality": "Electrician",
            "accreditation": "No",
            "inami": "",
            "diplomes": [],
            "experiences": [],
            "rendezVous": null,
            "schedule": null,
            "forum": null,
            "notifications": null,
            "plan": {
                "id": 1,
                "title": "Essential",
                "description": null,
                "price": 150.0
            },
            "firstName": "aaaaaaaa",
            "lastName": "aaaaaaaaaaaa",
            "address": "Bilzen,cvhd,10 ",
            "postalCode": 6000,
            "language": [
                "English"
            ],
            "photoCabinet": [],
            "nbRdv": 0
        }
    ],
    "veterinaires": [],
    "electriciens": [
        {
            "id": 62,
            "email": "abdo@gmail.com",
            "username": null,
            "roles": [
                {
                    "id": 61,
                    "role": "electricien"
                }
            ],
            "createdAt": "16/01/2023 14:11:01",
            "active": false,
            "banned": false,
            "deleted": false,
            "nbviews": 1,
            "ipUsers": null,
            "confirmationToken": "ozoTJQmjM8B1XvjZPb8FWr7KmT56sP",
            "ville": "Alost",
            "phoneNumber": 50376933,
            "photoUrl": null,
            "jwt": null,
            "online": "offline",
            "description": null,
            "experienceNumber": 10,
            "speciality": "Cardiologie",
            "accreditation": null,
            "inami": "2",
            "diplomes": [],
            "experiences": [],
            "rendezVous": null,
            "schedule": null,
            "forum": null,
            "notifications": null,
            "plan": null,
            "firstName": "test",
            "lastName": "test",
            "address": "21st, rue sqdsqd",
            "postalCode": 2081,
            "language": [],
            "photoCabinet": [],
            "nbRdv": 0
        },
        {
            "id": 88,
            "email": "mohamedaziz.dridi@esprit.com",
            "username": null,
            "roles": [],
            "createdAt": "25/07/2022 14:44:11",
            "active": true,
            "banned": false,
            "deleted": false,
            "nbviews": 0,
            "ipUsers": null,
            "confirmationToken": null,
            "ville": "Alost",
            "phoneNumber": 50376933,
            "photoUrl": null,
            "jwt": null,
            "online": "online",
            "description": null,
            "experienceNumber": null,
            "speciality": null,
            "accreditation": null,
            "inami": null,
            "diplomes": [],
            "experiences": [],
            "rendezVous": null,
            "schedule": null,
            "forum": null,
            "notifications": null,
            "plan": null,
            "firstName": "jjjj",
            "lastName": "jjjjjj",
            "address": "jjj",
            "postalCode": 555,
            "language": null,
            "photoCabinet": null,
            "nbRdv": 5
        }
    ],
    "menuisiers": [
        {
            "id": 52,
            "email": "jawherguedri@gmail.com",
            "username": null,
            "roles": [
                {
                    "id": 5,
                    "role": "medecin"
                }
            ],
            "createdAt": "09/12/2022 15:01:32",
            "active": true,
            "banned": false,
            "deleted": false,
            "nbviews": 0,
            "ipUsers": null,
            "confirmationToken": null,
            "ville": "Antwerp",
            "phoneNumber": 99999999,
            "photoUrl": null,
            "jwt": null,
            "online": "offline",
            "description": null,
            "experienceNumber": 6,
            "speciality": "Electrician",
            "accreditation": "No",
            "inami": "",
            "diplomes": [],
            "experiences": [],
            "rendezVous": null,
            "schedule": null,
            "forum": null,
            "notifications": null,
            "plan": {
                "id": 2,
                "title": "Premium",
                "description": null,
                "price": 300.0
            },
            "firstName": "nernryyrnq",
            "lastName": "ethesennyqe",
            "address": "rennre",
            "postalCode": 57,
            "language": null,
            "photoCabinet": null,
            "nbRdv": 5
        }
    ]
}
 

 
    return (
        <BgSearchTechnician>
            <MainContainer maxWidth="lg" style={{ flexGrow: 1 }}>
               
                {
                    loading ?
                        <LoadingContainer>
                            <CircularProgress />
                        </LoadingContainer>
                        :
                        categories.plombiers.length > 0 ?
                            <GridContainer>
                                <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
                                    {
                                        categories.plombiers.map((data, i) => {
                                            if (data.deleted || data.banned) {
                                                return null
                                            }
                                            return <TechnicienCard data={data} key={i} />
                                        })
                                    }
                                </Grid>
                            </GridContainer>
                            :
                            <Alert style={{marginTop:"100px"}} severity="warning">No Technician found</Alert>
                }

            </MainContainer>
        </BgSearchTechnician>
    )
}
