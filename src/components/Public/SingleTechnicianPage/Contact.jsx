import React, { useState } from "react";
import { useEffect } from "react";
import HomeLayout from "../../../layouts/HomeLayout";
import { styled } from '@mui/material/styles';
import consultImg from "./contact.jpg"
import axios from 'axios';
import en from '../../../translation/en'
import fr from '../../../translation/fr.json'
import { withNamespaces } from 'react-i18next';
import i18n from '../../../translation/i18n'
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const FORM_ENDPOINT = "https://public.herotofu.com/v1/EXAMPLE_FORM_ID";


//TODO - fill on the later step

const Img = styled('img')`
    display: flex;
    width: 90%;
    border-radius:10px;
    height: auto;
    margin: 10px  auto;
`
const form = styled('div')`
     width: 90%;
     margin: 0 auto;
     justify-content: center;
     align-items: center;
    margin-top:30%;
        text-decoration: none;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #999;
    border: inset 1px solid #333;
    @media only screen and (max-width: 900px){
        flex-direction: column;
        align-items: center;
    }
`

const MainContainer = styled('div')`

    margin-top: 100px;
    margin-bottom: 100px;
    @media only screen and (max-width: 900px){
        margin-top: 50px;
        margin-bottom: 50px;
    } 
`
const Container = styled('div')`
display: flex;
justify-content: center;
align-items: center;
background-color : white;
width: 25%;
margin: 0 0 0 15px ; 
border: 1px solid #f1f1f1;
border-radius: 10px;
flex-direction: column;
min-width: 250px;
max-width: 350px;
@media only screen and (max-width: 900px){
    width: 30%;
}
@media only screen and (max-width: 400px){
    width: 30%;
}
`
const Main = styled('div')`
    width: 90%;
    padding-top:20px;
    margin: auto;
    border-radius: 20px;
    max-width: 1500px;
    display: row;
    flex-direction: center;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 900px){
        width: 90%;
    }
    @media only screen and (max-width: 400px){
        width: 98%;
    }
`

const BioTypo = styled(Typography)`
display: flex;
margin-top: 15px;
justify-content: center;
align-items: center;
    font-size: 23px;
    font-weight: bold;
    text-transform: capitalize;
   
`

const Form = styled('form')`

`




const Contact = (props,{t}) => {

    const action = key => (
        <Button style={{ color: "#FFF" }} onClick={() => { closeSnackbar(key) }}>
            Close
        </Button>
    );
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    

    const [contactData, setContactData] = useState({  
        "name":"",
        "sender":"",
        "receiver":props.technician.email,
        "message":""
        })

        
        const handleChange = event => {
            setContactData({
              ...contactData,
              [event.target.name]: event.target.value,
            });
          };


    const handleSendEmail = async (event,data) => {
        event.preventDefault();
    console.log("contactData:  ",contactData);
        axios.post('http://192.168.1.113:5000/emails/send-email',data,{
           
        })
    
            .then((res) => {
                console.log("Email was sent successfully : ",data);
                
                setContactData({  
                    "name":"",
                    "sender":"",
                    "receiver":props.technician.email,
                    "message":""
                    })
                    
                    enqueueSnackbar("Email was sent successfully!", { variant: "warning", action });
            })
            .catch(err => {
                console.log(err)
              
            })
    }

    useEffect(() => {
        if (document) {
          const stylesheet = document.createElement("link");
          stylesheet.rel = "stylesheet";
          stylesheet.href = "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";
    
          document.head.appendChild(stylesheet);
        }
      }, []);
    
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
        <div className="text-2xl">{props.t("Thank you")}!</div>
        <div className="text-md">{props.t("We'll be in touch soon")}.</div>
      </>
    );
  }
    

    return (

        <Container>
         
         <BioTypo  color={"primary"}>Contact</BioTypo>
      
  <Main>
  <Form onSubmit={event=> handleSendEmail(event,contactData)  }>
      <div className="mb-3 pt-0">
        <input
          type="text"
          placeholder={props.t("Your name")}
          name="name"
          value={contactData.name}
          onChange={handleChange}
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <input
          type="email"
          placeholder="Email"
          name="sender"
          onChange={handleChange}
          value={contactData.sender}
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <textarea
          placeholder={props.t("Your message")}
          onChange={handleChange}
          name="message"
          value={contactData.message}
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <button
          className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="submit"
        >
          {props.t('Send a message')}
        </button>
      </div>
    
</Form>
      </Main>

   
     
    
    </Container>
    )
}
export default withNamespaces() (Contact);