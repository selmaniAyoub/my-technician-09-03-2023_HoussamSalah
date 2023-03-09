import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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
    padding: 1em;
    margin-top: 30px;
    border: 1px solid #f1f1f1;
    justify-content: center;
    align-items: start;
    @media only screen and (max-width: 600px){
        padding: 0.5em;
    }
`

const Header = styled(Typography)`
    font-size: 22px;
    font-weight: bold;
    text-transform: capitalize;
    margin-bottom: 20px;
`

const DescriptionTypography = styled(Typography)`
    font-size: 18px;
    line-height: 1.8em;
`

 function DescriptionSection({ user,t }) {
    return (
        <Container elevation={0}>
            <Header variant="h2" color="primary">
                {t("Description")}
            </Header>
            {
                user.description ?
                    <DescriptionTypography variant="body1">
                        {
                            user.description
                        }
                    </DescriptionTypography>
                    :
                    <DescriptionTypography variant="body1">
                        {t("Pas de description disponible")}
                    </DescriptionTypography>
            }

        </Container>
    )
}
    export default withNamespaces()(DescriptionSection);