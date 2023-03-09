import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, createSearchParams } from "react-router-dom"

//data
import specialties from '../../../truesSpecialties'
import belgiqueVilles from '../../../BelgiqueVilles'
import langues from '../../../Langues'
import specificSpecialties from '../../../SpecificSpecialties'

import en from '../../../translation/en.json'
import fr from '../../../translation/fr.json'
import { withNamespaces } from 'react-i18next';
import i18n from '../../../translation/i18n'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    anchorOrigin: {
        vertical: "top",
        horizontal: "center"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "center"
    },
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
            width: 230,
        },
    },
};


const MainContainer = styled(Container)`
    @media only screen and (max-width: 900px){
        padding: 32px 16px !important;
    }import { setLanguage } from 'react-switch-lang';

    z-index: 1;
`

const CardBox = styled(Card)`
    padding: 1em 3em;
    background-color: #FFFFFF;
    z-index: 2;
    max-width: 1000px;
    margin: -70px auto 0 auto;
    border-radius:50px;
`

const StyledFormControll = styled(FormControl)`
    margin: 8px;
    min-width: 150px;
    max-width: 200px;
    width: 18%;
    @media only screen and (max-width: 900px){
        width: 100%;
        max-width: 250px;
    }
`

const StyledSearchBtn = styled(Button)`
    font-weight: 600;
    margin: 5px auto 0 auto;
    border-radius: 100px;
    box-shadow: none;
    padding: 10px 20px;
    letter-spacing: 0.5px;
`

 function SearchBar({t}) {






    function TabPanel(props) {
        const { children, value, index, ...other } = props;
    
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }
    
    
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    
    
    function SelectVariants({ handleChange, val, value }) {
        
            return (
                
                <StyledFormControll variant="standard" >
                    <InputLabel id="demo-simple-select-standard-label">{t('Spécialités')}</InputLabel>
                    <Select
                        id="demo-simple-select-standard"
                        value={val}
                        onChange={handleChange}
                        label="Spécialités"
                        MenuProps={MenuProps}
                    >
                        <MenuItem value={""}>{t("Tous")}</MenuItem>
                        {
                            specialties.map((ville, i) => (
                                <MenuItem key={i} value={ville.category}>{t(ville.label)}</MenuItem>
                            ))
                        }
                    </Select>
                </StyledFormControll>
            );
        
    
        return null;
    }
    
    function SelectVariantsVilles({ handleChange, val }) {
    
        return (
            <StyledFormControll variant="standard">
                <InputLabel id="demo-simple-select-standard-label-1">
                    {t('Ville')}
                </InputLabel>
                <Select
                    id="demo-simple-select-standard-1"
                    value={val}
                    onChange={handleChange}
                    label={t('Ville')}
                    MenuProps={MenuProps}
                >
                    <MenuItem value={""}>{t("Tous")}</MenuItem>
                    {
                        belgiqueVilles.map((ville, i) => (
                            <MenuItem key={i} value={ville}>{t(ville)}</MenuItem>
                        ))
                    }
                </Select>
            </StyledFormControll>
        );
    }
    
    
    function CodePostalForm({ handleChange, val }) {
    
        return (
            <StyledFormControll variant="standard">
                <TextField
                    type="number"
                    inputProps={{
                        max: "9999",
                        min: "1000"
                    }}
                    value={val}
                    onChange={handleChange}
                    id="standard-basic"
                    label={t("Code Postal")}
                    variant="standard"
                />
            </StyledFormControll>
        )
    }
    
    
    function SelectVariantsLang({ handleChange, val }) {
    
        return (
            <StyledFormControll variant="standard">
                <InputLabel id="demo-simple-select-filled-label-2">
                    {t('Langue')}
                </InputLabel>
                <Select
                    id="demo-simple-select-filled-2"
                    value={val}
                    onChange={handleChange}
                    label={t('Langue')}
                    multiple
                >
                    <MenuItem value={"Tous les langues"}>{t("Tous")}</MenuItem>
                    {
                        langues.map((Language, i) => (
                            <MenuItem key={i} value={Language}>{Language}</MenuItem>
                        ))
                    }
                </Select>
            </StyledFormControll>
        );
    }
    
    function SearchBtn({ loading }) {
    
        return (
            <StyledFormControll variant="standard" sx={{ margin: "10px" }}>
                <StyledSearchBtn loading={ loading } type="submit" variant="contained" endIcon={<SearchIcon />}>
                    {t('Rechercher')}
                </StyledSearchBtn>
            </StyledFormControll>
        )
    }
    

  

    const SearchForm = ({ value }) => {
        
        const [category, setCategory] = React.useState("");
        const [ville, setVille] = React.useState("");
        const [codepostal, setCodepostal] = React.useState("");
        const [langue, setLangue] = React.useState([]);
        const [searchData, setSearchData] = React.useState({});
        const navigate = useNavigate();
      useEffect(() => {
        const data = JSON.parse(localStorage.getItem("searchData"))
     
        if (data) {
            setCategory(data.category);
            setVille(data.ville);
            setCodepostal(data.codepostal);
            setLangue(data.langue);
          
        }
      }, []);
    
        const handleChangeCategory = (event) => {
            setCategory(
                event.target.value,
            )
        };
    
        const handleChangeVilles = (event) => {
            setVille(
                event.target.value,
            )
        };
    
    
        const handleChangeCodePostal = (event) => {
            setCodepostal(
                event.target.value,
            )
        };
    
        const handleChangeLangue = (event) => {
            const {
                target: { value },
            } = event;
    
            let vals;
    
            value.forEach((l) => {
                if (l === "Tous les langues") {
                    vals = [];
                }
            })
    
            const langues = vals ? vals : value;
    
            const val = typeof langues === 'string' ? langues.split(',') : langues;
    
            setLangue(
                val,
            )
        }
    
        function handleSubmit(event) {
            event.preventDefault();
            const data={
               
                ville,
                codepostal,
                langue,
                category
            }
            localStorage.setItem("searchData", JSON.stringify(data));
            navigate({
                pathname: '/find-a-technician',
                search: `?${createSearchParams(data)}`,
              
            });
            window.location.reload()
        };
    
        return (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-around" }}>
                <SelectVariants handleChange={handleChangeCategory} val={category} value={value} />
                <SelectVariantsVilles handleChange={handleChangeVilles} val={ville} />
                <CodePostalForm handleChange={handleChangeCodePostal} val={codepostal} />
             {/*    <SelectVariantsLang handleChange={handleChangeLangue} val={langue} /> */}
                <SearchBtn />
            </form>
        )
    }
    








    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainContainer maxWidth="lg" style={{ flexGrow: 1 }}>
            <CardBox sx={{ minWidth: 275 }}>
              
                {
                    specialties.map((val, i) => (
                        <TabPanel key={i} value={value} index={i}>
                             
                            <SearchForm value={specialties[value]} />
                        </TabPanel>
                    ))
                }
            </CardBox>
        </MainContainer>
    )
}
export default withNamespaces( ) (SearchBar)