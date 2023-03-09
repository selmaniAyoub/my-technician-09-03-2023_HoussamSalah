import React from 'react';
import { styled } from '@mui/material/styles';
import HeartbeatPng from '../../assets/heartbeat.png';
import Typography from '@mui/material/Typography';


const BgPage = styled('div')`
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 500px;
    padding: 24px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    }
`

const Img = styled('img')`
    display: flex;
    width: 100%;
    max-width: 200px;
    height: auto;
`

const Header = styled(Typography)`
    margin: 30px 0;
    @media only screen and (max-width: 600px){
        margin: 15px 0;
    }
`

export default function NotFound() {
    return (
        <BgPage>
            <Img
                src={HeartbeatPng}
            />
            <Header variant="h2">404</Header>
            <Typography textAlign={"center"} variant="h5">La page que vous avez demandée n'a pas été trouvée.</Typography>
        </BgPage>
    );
}
