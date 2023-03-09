import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Moment from 'moment';
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { useTranslation } from 'react-i18next';
import { translate } from 'react-i18next';
import { compose } from "recompose";




const StyledAccordion = styled(Accordion)`
    border-top: 0;
    width: 100%;
    margin: 30px auto 0 auto !important;
    &::before{import withNamespaces from './../../../routes/Public/Concept';

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
    justify-content: start;
    width: 100%;
    align-items: start;
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

const ItemInfo = styled(Typography)`
    font-size: 14px;
    color: #7d7d7d;
    @media only screen and (max-width: 500px){
        text-align: center
    }
`

const EmptyTypography = styled(Typography)`
    font-size: 18px;
    line-height: 1.8em;
`

const RenderDateAndComp = ({ certification }) => {
    const start = Moment(certification.startDiplome).format("MMMM YYYY");
    const end = Moment(certification.endDiplome).format("MMMM YYYY");

    return <ItemInfo> {start} - {end} | {certification.university} </ItemInfo>;
}

 function EditCertification({ user,t }) {
    const [localCertification, setLocalCertification] = useState([]);
    const [expanded, setExpanded] = useState(true);
    const role = user?.roles[0]?.role || null;

    const handleChange = (event) => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const diplomes = user?.diplomes || [];

        if (diplomes) {
            const _diplomes = diplomes  // .filter((diplome) => diplome.type === "certification");
            setLocalCertification(_diplomes);
        }
    }, [user])

    if (role) {
        if (role !== "client" && role !== "pharmacie") {
            return (
                <StyledAccordion expanded={expanded} onChange={handleChange} elevation={0}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <BioTypo color={"primary"}>{t("Certifications")}</BioTypo>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListHeader>
                            {
                                localCertification.length === 0 ?
                                    <EmptyTypography variant="body1">
                                        {t("Pas de certifications disponible")}
                                    </EmptyTypography>
                                    :
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
                                                </ListItem>
                                            ))
                                        }
                                    </ListDiplome>
                            }
                        </ListHeader>
                    </AccordionDetails>
                </StyledAccordion>
            )
        }
        return null;
    }
    return null;
}
export default withNamespaces() (EditCertification);
