import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { useTranslation } from 'react-i18next';
import { translate } from 'react-i18next';
import { compose } from "recompose";




const Container = styled(Paper)`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 30px; 
`

const PhotoHeader = styled('div')`
    padding: 2em 1em;
`

const CalendarHeader = styled(ListItemText)`
    .MuiTypography-root{
        font-size: 25px;
        font-weight: 600;
    }
`

const ImagesContainer = styled('div')`
    display: flex;
    flex-direction: rows;
    flex-wrap: wrap;
    align-items: start;
    margin-top: 10px;
    padding: 1em;
    justify-content: start;
    @media only screen and (max-width: 900px){
        flex-direction: column;
        align-items: center;
        padding: 2em 0.5em;
    }
`

const SingleImg = styled('img')`
    display: flex;
    width: 48%;
    max-width: 200px;
    margin: 10px;
    @media only screen and (max-width: 900px){
        width: 90%;
        max-width: 500px;
    }
`

const EmptyTypography = styled(Typography)`
    font-size: 18px;
    line-height: 1.8em;
`

 function PhotosCabinet({ user,t }) {

    return (
        <Container elevation={0}>
            <PhotoHeader>
                <List>
                    <ListItem disablePadding>
                        <ListItemIcon style={{ minWidth: 50, marginRight: 10 }}>
                            <PhotoLibraryIcon style={{ color: "#58a5ff", fontSize: 40, marignRight: 10 }} />
                        </ListItemIcon>
                        <CalendarHeader>
                            {t("Photos de cabinet")}
                        </CalendarHeader>
                    </ListItem>
                </List>
            </PhotoHeader>
            <ImagesContainer>
                {
                    user?.photoCabinet?.length === 0 ?
                        <EmptyTypography variant="body1">
                            {t("Pas de photos de cabinet disponible")}
                        </EmptyTypography>
                        :
                        user?.photoCabinet?.map((imgSrc, i) => (
                            <SingleImg key={i} src={imgSrc} />
                        ))
                }
            </ImagesContainer>
        </Container>
    );
}
export default withNamespaces() (PhotosCabinet);