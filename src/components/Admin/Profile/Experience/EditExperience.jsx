import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DialogExperience from './DialogExperience';
import Moment from 'moment';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { withNamespaces } from "react-i18next";
import { translate } from 'react-i18next';
import { compose } from "recompose";


const ExperienceSection = styled(Paper)`
    width: 100%;
    margin-top: 30px;
    padding: 1.5em 1em;
`

const ListExperience = styled('div')`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`

const ListItem = styled('div')`
    display: flex;
    flex-direction: row;
    margin: 10px 0; 
    align-items: center;
    flex-wrap: wrap;
    @media only screen and (max-width: 500px){
        flex-direction: column;
    }
`

const ItemAvatar = styled('div')`
    width: 30%;
    max-width: 100px;
    min-width: 90px;
    @media only screen and (max-width: 500px){
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 5px;
    }
`

const ItemContent = styled('div')`
    width: 70%;
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 500px){
        width: 100%;
        align-items: center;
    }
`

const ItemTitle = styled(Typography)`
    font-weight: bold;
    text-transform: capitalize;
    font-size: 20px;
    @media only screen and (max-width: 500px){
        text-align: center
    }
`

const ItemText = styled(Typography)`
    font-size: 18px;
    color: #444;
    @media only screen and (max-width: 500px){
        text-align: center
    }
`

const ItemInfo = styled(Typography)`
    font-size: 14px;
    color: #7d7d7d;
    @media only screen and (max-width: 500px){
        text-align: center
    }
`

const BioTypo = styled(Typography)`
    font-size: 22px;
    font-weight: bold;
    text-transform: capitalize;
`

const ListHeader = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const ActionContainer = styled('div')`
    display: flex;
    flex-direction: row;
    margin: 20px auto;
    justify-content: space-evenly;
`

const EmptyContainer = styled('div')`
    padding: 8px;
`

const EmptyText = styled(Typography)`
    font-size: 16px;
    color: #4c4c4c;
`

const RenderDateAndComp = ({ experience }) => {
    const start = Moment(experience.startExperience).format("MMMM YYYY");
    const end = Moment(experience.endExperience).format("MMMM YYYY");

    return <ItemInfo> {start} - {end} | {experience.company ? experience.company : ""}</ItemInfo>;
}

 function EditExperience({ user,t }) {
    const [open, setOpen] = useState(false);
    const [localExperiences, setLocalExperiences] = useState([]);
    const [experience, setExperience] = useState(null);
    const [loading, setLoading] = useState(false);
    const role = user?.roles[0]?.role || null;

    useEffect(() => {
        const experiences = user?.experiences || [];

        if (experiences) {
            setLocalExperiences(experiences)
        }
    }, [user])

    const handleClickOpen = () => {
        setExperience(null)
        setOpen(true);
    };

    const handleClose = (data) => {
        if (data) {
            if (data.id) {
                const indexOfData = localExperiences.map((d) => d.id).indexOf(data.id);
                if (indexOfData !== -1) {
                    localExperiences[indexOfData] = data
                    setLocalExperiences(localExperiences);
                }
                setOpen(false);
                return;
            }
            setLocalExperiences(localExperiences.concat(data))
        }
        setOpen(false);
    };

    const handleEditExperience = (experience) => () => {
        setExperience(experience)
        setOpen(true);
    }

    const handleDeleteExperience = (experience) => () => {
        setLoading(true)
        axios.delete(`http://localhost:5000/profile/delete/experience/${experience.id}`)
            .then((res) => {
                setLoading(false)
                const newArr = localExperiences.filter(e => e.id !== experience.id)
                setLocalExperiences(newArr)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    if (role) {
        if (role !== "client" && role !== "admin") {
            return (
                <ExperienceSection elevation={0}>
                    <ListHeader>
                        <BioTypo color={"primary"}>{t('Expériences')}</BioTypo>
                        <Tooltip title="add experience">
                            <IconButton disabled={loading} onClick={handleClickOpen} color="primary" aria-label="add experiences" component="span">
                                <AddCircleIcon sx={{ width: 30, height: 30 }} />
                            </IconButton>
                        </Tooltip>
                    </ListHeader>
                    <ListExperience>
                        {
                            localExperiences.length > 0 ?

                                localExperiences.map((experience, index) => (
                                    <ListItem key={index}>
                                        <ItemAvatar>
                                            <Avatar alt="Remy Sharp" src={experience.attachmentUrl ? experience.attachmentUrl[0] : ""} sx={{ width: 80, height: 80 }}>
                                                {experience.title[0]}
                                            </Avatar>
                                        </ItemAvatar>
                                        <ItemContent>
                                            <ItemTitle>{experience.title}</ItemTitle>
                                            <ItemText>{experience.description}</ItemText>
                                            <RenderDateAndComp experience={experience} />
                                            <Divider />
                                        </ItemContent>
                                        <ActionContainer>
                                            <Tooltip title="delete experience">
                                                <IconButton disabled={loading} onClick={handleDeleteExperience(experience)} color="primary" aria-label="delete experience" component="span">
                                                    <RemoveCircleIcon sx={{ width: 24, height: 24 }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="edit experience">
                                                <IconButton disabled={loading} onClick={handleEditExperience(experience)} color="primary" aria-label="edit experiences" component="span">
                                                    <EditIcon sx={{ width: 24, height: 24 }} />
                                                </IconButton>
                                            </Tooltip>
                                        </ActionContainer>
                                    </ListItem>
                                ))
                                :
                                <EmptyContainer>
                                    <EmptyText variant="body1">{t('Ajouter votre expérience')}</EmptyText>
                                </EmptyContainer>
                        }
                    </ListExperience>
                    <DialogExperience
                        open={open}
                        onClose={handleClose}
                        experience={experience}
                    />
                </ExperienceSection>
            )
        }
        return null;
    }
    return null;
}
export default compose (withNamespaces())(EditExperience);