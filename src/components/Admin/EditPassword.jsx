import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import axios from 'axios';
import { withSnackbar } from 'notistack';

let source;

const Container = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 24px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    }  
`

const Form = styled(Paper)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    max-width: 500px;
    min-width: 400px;
    padding: 2em;
    margin-top: 50px;
    @media only screen and (max-width: 500px){
        width: 100%;
        min-width: 100%;
        margin-top: 20px;
    }
`

const ResetPasswordHeader = styled(Typography)`
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
`

const StyledFormControl = styled(FormControl)`
    width: 100%;
    margin: 10px 0;
`

const StyledBtn = styled(LoadingButton)`
    margin: 20px 0 0 0;
    font-weight: bold;
    letter-spacing: 0.5px;
`

function EditPassword(props) {
    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [disable, setDisable] = useState(false)

    source = axios.CancelToken.source();

    const action = key => (
        <Button style={{ color: "#FFF" }} onClick={() => { props.closeSnackbar(key) }}>
            Fermer
        </Button>
    );

    function handleSubmit(event) {
        event.preventDefault();

        let validate = true;

        if (password.trim().length < 8) {
            validate = false
            props.enqueueSnackbar("Mot de passe doit être d'au moins 8 caractères", { variant: "error", action: action });
            return;
        }

        if (password.trim().length > 15) {
            validate = false
            props.enqueueSnackbar("Le mot de passe doit contenir au maximum 15 caractères", { variant: "error", action: action });
            return;
        }

        if (password !== passwordConfirmation) {
            validate = false;
            props.enqueueSnackbar("Les mots de passe ne correspondent pas", { variant: "error", action: action });
            return;
        }

        if (validate) {
            const data = {
                oldPassword,
                password,
                passwordConfirmation
            }

            setDisable(true)
            axios.put('http://192.168.1.113:5000/users/changepassword', data, {
                cancelToken: source.token
            })
                .then(res => {
                    setDisable(false)
                    setOldPassword('')
                    setPassword('')
                    setPasswordConfirmation('')
                    props.enqueueSnackbar("Le mot de passe a enregistré avec succès", { variant: "success", action: action });
                })
                .catch(err => {
                    setDisable(false)
                    console.log(err)
                    console.log(err.response.data);
                    if (err.response.data.message === "Old password incorrect !") {
                        props.enqueueSnackbar("Ancien mot de passe incorrect !", { variant: "error", action: action });
                    } else {
                        props.enqueueSnackbar("server error", { variant: "error", action: action });
                    }
                })
        }
    }

    return (
        <Container>
            <Form
                component={'form'}
                onSubmit={handleSubmit}
                elevation={0}
            >
                <ResetPasswordHeader variant="h1">
                    Modifiez votre mot de passe
                </ResetPasswordHeader>
                <StyledFormControl variant="filled" required>
                    <TextField
                        type="password"
                        onChange={(event) => setOldPassword(event.target.value)}
                        id="standard-basic-psw"
                        label="Ancien mot de passe"
                        variant="filled"
                        minLength="8"
                        required
                        value={oldPassword}
                        disabled={disable}
                    />
                </StyledFormControl>
                <StyledFormControl variant="filled" required>
                    <TextField
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                        id="standard-basic-psw-1"
                        label="Nouveau mot de passe"
                        variant="filled"
                        minLength="8"
                        required
                        value={password}
                        disabled={disable}
                    />
                </StyledFormControl>
                <StyledFormControl variant="filled" required>
                    <TextField
                        type="password"
                        onChange={(event) => setPasswordConfirmation(event.target.value)}
                        id="standard-basic-psw-2"
                        label="Confirmez mot de passe"
                        variant="filled"
                        minLength="8"
                        required
                        value={passwordConfirmation}
                        disabled={disable}
                    />
                </StyledFormControl>
                <StyledBtn loading={disable} type="submit" variant={"contained"}>
                    sauvegarder
                </StyledBtn>
            </Form>
        </Container>
    )
}


export default withSnackbar(EditPassword)