import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Moment from 'moment';
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { useTranslation } from 'react-i18next';
import { translate } from 'react-i18next';
import { compose } from "recompose";




const ExperienceSection = styled(Paper)`
    width: 100%;
    margin-top: 30px;
    border: 1px solid #f1f1f1;
    padding: 1em;
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

const EmptyTypography = styled(Typography)`
    font-size: 18px;
    line-height: 1.8em;
`

const RenderDateAndComp = ({ experience }) => {
    const start = Moment(experience.startExperience).format("MMMM YYYY");
    const end = Moment(experience.endExperience).format("MMMM YYYY");

    return <ItemInfo> {start} - {end} | {experience.company ? experience.company : ""}</ItemInfo>;
}

 function EditExperience({ user,t }) {
    const role = user?.roles[0]?.role || null;

    if (role) {
        if (role !== "client" && role !== "pharmacie") {
            return (
                <ExperienceSection elevation={0}>
                    <ListHeader>
                        <BioTypo color={"primary"}>{t("Expériences")}</BioTypo>
                    </ListHeader>
                    <ListExperience>
                        {
                            user.experiences.length === 0 ?
                                <EmptyTypography variant="body1">
                                    {t("Pas de expériences disponible")}
                                </EmptyTypography>
                                :
                                user.experiences.map((experience, index) => (
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
                                    </ListItem>
                                ))
                        }
                    </ListExperience>
                </ExperienceSection>
            )
        }
        return null;
    }
    return null;
}
export default withNamespaces()(EditExperience);