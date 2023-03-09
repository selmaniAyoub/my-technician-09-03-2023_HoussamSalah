import React from 'react';
import { styled } from '@mui/material/styles';
import HeartbeatPng from '../../../assets/heartbeat.png';
import Typography from '@mui/material/Typography';


const Container = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 24px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    }
`

const Img = styled('img')`
    display: flex;
    width: 90%;
    max-width: 200px;
    height: auto;
`

const Header = styled(Typography)`
    margin: 30px 0;
    @media only screen and (max-width: 600px){
        margin: 15px 0;
    }
`

export default function AdminNotFound() {
    return (
        <Container>
            <Img
                src={HeartbeatPng}
            />
            <Header variant="h2">404</Header>
            <Typography textAlign={"center"} variant="h5">La page que vous avez demandée n'a pas été trouvée.</Typography>
        </Container>
    );
}
