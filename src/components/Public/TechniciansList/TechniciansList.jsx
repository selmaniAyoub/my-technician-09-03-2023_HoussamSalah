import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { thunkGetHomeTechnicians } from '../../../thunks'
import { connect } from "react-redux"
import SingleTechnician from './SingleTechnician'
import CircularProgress from '@mui/material/CircularProgress';


const BgTechniciansList = styled('div')`
    width: 100%;
    margin-top: 100px;
    @media only screen and (max-width: 900px){
        margin-top: 25px;
        padding: 25px 0 0 0;
    }
`

const MainContainer = styled(Container)`
    @media only screen and (max-width: 900px){
        padding: 32px 16px !important;
    }
`

const TextContainer = styled('div')`
    display flex;
    max-width: 900px;
    margin-bottom: 50px;
    margin: 0 auto;
    flex-direction: column;
`

const Header = styled(Typography)`
    font-size: 50px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: capitalize;
    line-height: 1.2em;
    text-align: center;
    @media only screen and (max-width: 900px){
        font-size: 35px;
    }
    @media only screen and (max-width: 320px){
        font-size: 30px;
    }  
`

const SubHeader = styled(Typography)`
    font-size: 18px;
    letter-spacing: 0.5px;
    text-align: center;
    margin-top: 20px;
`

const GridContainer = styled('div')`
    margin-top: 50px;
    margin-bottom: 50px;
`

const LoadingContainer = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
`

function TechniciansList(props) {
    const [technicians, setTechnicians] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.thunkGetHomeTechnicians()
    }, [])

    useEffect(() => {
        if (props.homeTechnicians.technicians.length > 0) {
            setTechnicians(props.homeTechnicians.technicians);
            setLoading(false)
        }

    }, [props.homeTechnicians])

    return (
        <BgTechniciansList>
            <MainContainer>
                <TextContainer>
                    <Header variant="h2">les médecins les plus consultés</Header>
                    <SubHeader variant="body1">Découvrez quels sont les médecins les plus consultés en Belgique</SubHeader>
                </TextContainer>
                {
                    loading ?
                        <LoadingContainer>
                            <CircularProgress />
                        </LoadingContainer>
                        :
                        <GridContainer>
                            <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
                                {
                                    technicians.map((data, i) => (
                                        <SingleTechnician data={data} key={i} />
                                    ))
                                }
                            </Grid>
                        </GridContainer>
                }
            </MainContainer>
        </BgTechniciansList>
    )
}


const mapStateToProps = (state) => ({
    homeTechnicians: state.homeTechnicians
});

export default connect(mapStateToProps, { thunkGetHomeTechnicians })(TechniciansList)