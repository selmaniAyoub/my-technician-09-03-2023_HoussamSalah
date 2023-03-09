import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DialogDescription from './DialogDescription';


const BioTypo = styled(Typography)`
    font-size: 22px;
    font-weight: bold;
    text-transform: capitalize;
`

const DescriptionContainer = styled('div')`
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 0.5em 1em;
    margin-top: 20px;
`

const DescriptionText = styled(Typography)`
    color: #222;
    font-size: 17px;
    line-height: 2em;
    @media only screen and (max-width: 900px){
        line-height: 1.7em;
        font-size: 16px;
    }
`

const ListHeader = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const EmptyContainer = styled('div')`
    padding: 8px;
`

const EmptyText = styled(Typography)`
    font-size: 16px;
    color: #4c4c4c;
`

const AddOrEditDialog = ({ description, handleClickOpen }) => {
    if (description) {
        return (
            <IconButton onClick={handleClickOpen} color="primary" aria-label="edit description" component="span">
                <EditIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
        )
    }
    return (
        <IconButton onClick={handleClickOpen} color="primary" aria-label="add description" component="span">
            <AddCircleIcon sx={{ width: 30, height: 30 }} />
        </IconButton>
    )
}

export default function EditDescription({ user }) {
    const [open, setOpen] = useState(false);
    const [localDescription, setLocalDescription] = useState("");
    const role = user?.roles[0]?.role || null;

    useEffect(() => {
        const description = user?.description || "";

        if (description) {
            setLocalDescription(description)
        }
    }, [user])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (data) => {
        if (data) {
            setLocalDescription(data?.description || "");
        }
        setOpen(false);
    };


    if (role) {
        if (role !== "client" && role !== "pharmacie") {
            return (
                <Paper style={{ padding: "1.5em 1em" }} elevation={0}>
                    <ListHeader>
                        <BioTypo color={"primary"}>description</BioTypo>
                        <AddOrEditDialog handleClickOpen={handleClickOpen} description={localDescription} />
                    </ListHeader>
                    {
                        localDescription ?
                            <>
                                <DescriptionContainer>
                                    <DescriptionText>
                                        {localDescription}
                                    </DescriptionText>
                                </DescriptionContainer>
                            </>
                            :
                            <EmptyContainer>
                                <EmptyText variant="body1">Ajouter votre description</EmptyText>
                            </EmptyContainer>
                    }
                    <DialogDescription
                        open={open}
                        onClose={handleClose}
                        description={localDescription}
                    />
                </Paper>
            )
        }
        return null;
    }
    return null;
}
