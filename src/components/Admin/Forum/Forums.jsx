import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Specialties from '../../../truesSpecialties';
import { useNavigate } from 'react-router-dom';



const Container = styled('div')`
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 70vh;
    justify-content: center;
    align-items: center;
    padding: 24px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    } 
`

const Card = styled(Paper)`
    padding: 24px;
`

const FormTitle = styled(Typography)`
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
`

export default function Forums() {
    let navigate = useNavigate();
    const [forum, setForum] = useState('');

    const handleChange = (event) => {
        setForum(event.target.value);
        if (event.target.value) {
            navigate(`/dashboard/forums/forum-${event.target.value}s`);
        }
    };

    return (
        <Container>
            <Card>
                <FormTitle>Veuillez choisir quel forum voulez-vous superviser</FormTitle>
                <FormControl variant="standard" sx={{ m: 1, mt: 2, minWidth: 120, width: "100%" }}>
                    <InputLabel id="demo-simple-select-standard-label">Forum</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={forum}
                        onChange={handleChange}
                        label="Forum"
                        style={{ width: "100%" }}
                    >
                        <MenuItem value="">
                            <em></em>
                        </MenuItem>
                        {
                            Specialties.map((s, i) =>
                                <MenuItem key={i} value={s.category}>Forum {s.category}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Card>
        </Container>
    );
}
