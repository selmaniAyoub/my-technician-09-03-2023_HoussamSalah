import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import Moment from 'moment';
import DialogCertification from './DialogCertification';
import { withNamespaces } from "react-i18next";
import { translate } from 'react-i18next';
import { compose } from "recompose";




const StyledAccordion = styled(Accordion)`
    border-top: 0;
    max-width: 1270px;
    margin: 30px auto !important;
    &::before{
        display: none;
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
    justify-content: end;
    width: 100%;
    align-items: space-between;
    @media only screen and (max-width: 500px){
        flex-direction: column-reverse;
        align-items: end;
    }
`

const ListDiplome = styled('div')`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
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

const ActionContainer = styled('div')`
    display: flex;
    flex-direction: row;
    margin: 20px auto;
    justify-content: space-evenly;
`

const ItemInfo = styled(Typography)`
    font-size: 14px;
    color: #7d7d7d;
    @media only screen and (max-width: 500px){
        text-align: center
    }
`

const EmptyContainer = styled('div')`
    width: 100%;
    padding: 8px;
`

const EmptyText = styled(Typography)`
    font-size: 16px;
    color: #4c4c4c;
`

const RenderDateAndComp = ({ certification }) => {
    const start = Moment(certification.startDiplome).format("MMMM YYYY");
    const end = Moment(certification.endDiplome).format("MMMM YYYY");

    return <ItemInfo> {start} - {end} | {certification.university} </ItemInfo>;
}

 function EditCertification({ user,t }) {
    const [open, setOpen] = useState(false);
    const [localCertification, setLocalCertification] = useState([]);
    const [certification, setCertification] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(true);

    const role = user?.roles[0]?.role || null;

    useEffect(() => {
        const diplomes = user?.diplomes || [];

        if (diplomes) {
            const _diplomes = diplomes.filter((diplome) => diplome.type === "certification");
            setLocalCertification(_diplomes);
        }
    }, [user])

    const handleChange = (event) => {
        setExpanded(!expanded);
    };

    const handleClickOpen = () => {
        setCertification(null)
        setOpen(true);
    };

    const handleClose = (data) => {
        if (data) {
            if (data.id) {
                const indexOfData = localCertification.map((d) => d.id).indexOf(data.id);
                if (indexOfData !== -1) {
                    localCertification[indexOfData] = data
                    setLocalCertification(localCertification);
                }
                setOpen(false);
                return;
            }
            setLocalCertification(localCertification.concat(data))
        }
        setOpen(false);
    };

    const handleEditCertification = (certification) => () => {
        setCertification(certification)
        setOpen(true);
    }

    const handleDeleteCertification = (certification) => () => {
        setLoading(true)
        axios.delete(`http://localhost:5000/profile/delete/diplome/${certification.id}`)
            .then((res) => {
                setLoading(false)
                const newArr = localCertification.filter(e => e.id !== certification.id)
                setLocalCertification(newArr)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }


    if (role) {
        if (role !== "client" && role !== "admin") {
            return (
                <StyledAccordion expanded={expanded} onChange={handleChange} elevation={0}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <BioTypo color={"primary"}>{t('Certifications')}</BioTypo>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListHeader>
                            {
                                localCertification.length > 0 ?
                                    <ListDiplome>
                                        {
                                            localCertification.map((certification, index) => (
                                                <ListItem key={index}>
                                                    <ItemAvatar>
                                                        <Avatar alt="Remy Sharp" src={certification.attachmentUrl ? certification.attachmentUrl[0] : ""} sx={{ width: 80, height: 80 }}>
                                                            {certification.title[0]}
                                                        </Avatar>
                                                    </ItemAvatar>
                                                    <ItemContent>
                                                        <ItemTitle>{certification.title}</ItemTitle>
                                                        <ItemText>{certification.description}</ItemText>
                                                        <RenderDateAndComp certification={certification} />
                                                        <Divider />
                                                    </ItemContent>
                                                    <ActionContainer>
                                                        <Tooltip title="delete certification">
                                                            <IconButton disabled={loading} onClick={handleDeleteCertification(certification)} color="primary" aria-label="delete certification" component="span">
                                                                <RemoveCircleIcon sx={{ width: 24, height: 24 }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="edit diplome">
                                                            <IconButton disabled={loading} onClick={handleEditCertification(certification)} color="primary" aria-label="edit diplome" component="span">
                                                                <EditIcon sx={{ width: 24, height: 24 }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </ActionContainer>
                                                </ListItem>
                                            ))
                                        }
                                    </ListDiplome>
                                    :
                                    <EmptyContainer>
                                        <EmptyText variant="body1">{t('Ajouter vos certifications')}</EmptyText>
                                    </EmptyContainer>
                            }

                            <Tooltip title="add diplôme">
                                <IconButton disabled={loading} onClick={handleClickOpen} color="primary" aria-label="add diplômes" component="span">
                                    <AddCircleIcon sx={{ width: 30, height: 30 }} />
                                </IconButton>
                            </Tooltip>
                        </ListHeader>

                    </AccordionDetails>
                    <DialogCertification
                        open={open}
                        onClose={handleClose}
                        certification={certification}
                    />
                </StyledAccordion>
            )
        }
        return null;
    }
    return null;
}
export default compose (withNamespaces())(EditCertification);








// EditCertification
