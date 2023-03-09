import React, { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { withSnackbar } from 'notistack';



const StyledText = styled(TextField)`
    width: 500px;
    margin-top: 10px;
    @media only screen and (max-width: 600px){
        width: 300px;
    }
    @media only screen and (max-width: 400px){
        width: 100%;
    }
`

const DescriptionTitle = ({ description }) => {
    if (description) {
        return <DialogTitle>Edit description</DialogTitle>
    }
    return <DialogTitle>Add description</DialogTitle>
}

function DialogDescription(props) {
    const { onClose, open, description } = props;
    const [localDescription, setLocalDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const action = key => (
        <Button style={{ color: "#FFF" }} onClick={() => { props.closeSnackbar(key) }}>
            Fermer
        </Button>
    );

    useEffect(() => {
        if (description) {
            setLocalDescription(description)
        }
    }, [description, open])

    const handleClose = () => {
        setLocalDescription("")
        onClose();
    };

    const handleChange = (event) => {
        setLocalDescription(event.target.value);
    }

    const handleSave = () => {
        setLoading(true)
        const data = {
            description: localDescription
        }

        axios.put('http://192.168.1.113:5000/profile/update/description', data)
            .then((res) => {
                setLoading(false);
                props.enqueueSnackbar("Mise à jour effectué !", { variant: "success", action: action });
                onClose(data);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                props.enqueueSnackbar("Server Error !", { variant: "error", action: action });
            })
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DescriptionTitle description={localDescription} />
            <DialogContent>
                <StyledText
                    value={localDescription}
                    id="filled-description"
                    label="Description"
                    variant="filled"
                    onChange={handleChange}
                    multiline
                    rows={5}
                    disabled={loading}
                />
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={loading} onClick={handleSave}>Save</LoadingButton>
                <Button disabled={loading} onClick={handleClose} >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withSnackbar(DialogDescription) 