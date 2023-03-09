import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import { useSearchParams } from "react-router-dom"
import LoadingButton from '@mui/lab/LoadingButton';


//data
import specialties from '../../../truesSpecialties'
import belgiqueVilles from '../../../BelgiqueVilles'
import langues from '../../../Langues'
import truesSpecialties from '../../../truesSpecialties'



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


const StyledFormControll = styled(FormControl)`
    margin: 8px;
    min-width: 150px;
    max-width: 300px;
    width: 18%;
    @media only screen and (max-width: 900px){
        width: 100%;
        max-width: 250px;
    }
`

const CardBox = styled(Card)`
    padding: 1em 1em;
    background-color: #FFFFFF;
    z-index: 2;
    max-width: 1400px;
    margin: 70px auto 150px auto;
`

const StyledSearchBtn = styled(LoadingButton)`
    font-weight: 600;
    margin: 5px auto 0 auto;
    border-radius: 100px;
    box-shadow: none;
    padding: 10px 20px;
    letter-spacing: 0.5px;
`

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

function SelectVariants({ handleChange, val, value, loading }) {

    if (value.value ) {
        return (
            <StyledFormControll variant="standard" disabled={loading}>
                <InputLabel id="demo-simple-select-standard-label">
                    Spécialités
                </InputLabel>
                <Select
                    id="demo-simple-select-standard"
                    value={val}
                    onChange={handleChange}
                    label="Spécialités"
                    MenuProps={MenuProps}
                >
                    <MenuItem value={""}>{"Tous les spécialités"}</MenuItem>
                    {
                        truesSpecialties.map((specialty, i) => (
                            <MenuItem key={i} value={specialty.category}>{specialty.category}</MenuItem>
                        ))
                    }
                </Select>
            </StyledFormControll>
        );
    }

    return null;
}

function SelectVariantsVilles({ handleChange, val, loading }) {

    return (
        <StyledFormControll variant="standard" disabled={loading}>
            <InputLabel id="demo-simple-select-standard-label-1">
                Ville
            </InputLabel>
            <Select
                id="demo-simple-select-standard-1"
                value={val}
                onChange={handleChange}
                label="Ville"
                MenuProps={MenuProps}
            >
                <MenuItem value={""}>{"Tous les villes"}</MenuItem>
                {
                    belgiqueVilles.map((ville, i) => (
                        <MenuItem key={i} value={ville}>{ville}</MenuItem>
                    ))
                }
            </Select>
        </StyledFormControll>
    );
}


function CodePostalForm({ handleChange, val, loading }) {

    return (
        <StyledFormControll variant="standard" disabled={loading}>
            <TextField
                value={val}
                type="number"
                inputProps={{
                    max: "9999",
                    min: "1000"
                }}
                onChange={handleChange}
                id="standard-basic"
                label="Code Postal"
                variant="standard"
                disabled={loading}
            />
        </StyledFormControll>
    )
}
function DateForm({ handleChange, val, loading }) {

    return (
        <StyledFormControll variant="standard" disabled={loading}>
            <TextField
                value={val}
                type="number"
                inputProps={{
                    max: "9999",
                    min: "1000"
                }}
                onChange={handleChange}
                id="standard-basic"
                label="Date"
                variant="standard"
                disabled={loading}
            />
        </StyledFormControll>
    )
}



function SelectVariantsLang({ handleChange, val, loading }) {

    return (
        <StyledFormControll variant="standard" disabled={loading}>
            <InputLabel id="demo-simple-select-filled-label-2">
                Langue
            </InputLabel>
            <Select
                id="demo-simple-select-filled-2"
                value={val}
                onChange={handleChange}
                label="Langue"
                multiple
            >
                <MenuItem value={"Tous les langues"}>{"Tous les langues"}</MenuItem>
                {
                    langues.map((Language, i) => (
                        <MenuItem key={i} value={Language}>{Language}</MenuItem>
                    ))
                }
            </Select>
        </StyledFormControll>
    );
}
function SearchBtn2({ loading }) {

    return (
        <StyledFormControll variant="standard" sx={{ margin: "10px", }}>
            <StyledSearchBtn loading={loading} type="submit" variant="contained">
                Calendar
            </StyledSearchBtn>
        </StyledFormControll>
    )
}
function SearchBtn({ loading }) {

    return (
        <StyledFormControll variant="standard" sx={{ margin: "10px", }}>
            <StyledSearchBtn loading={loading} type="submit" variant="contained" endIcon={<SearchIcon />}>
                Rechercher
            </StyledSearchBtn>
        </StyledFormControll>
    )
}

const SearchForm = (props) => {
    let [searchParams] = useSearchParams();

    const [category, setCategory] = React.useState("");
    const [ville, setVille] = React.useState("");
    const [codepostal, setCodepostal] = React.useState("");
    const [langue, setLangue] = React.useState([]);
    const [date, setDate] = React.useState("");
    const _category = searchParams.get("category");
    const _codepostal = Number(searchParams.get("codepostal"));
    const _langue = searchParams.getAll("langue");
    const _ville = searchParams.get("ville");
    const _speciality = searchParams.get("speciality");


    useEffect(() => {
        if (_category) {
            if (_codepostal && _codepostal !== codepostal) {
                setCodepostal(_codepostal)
            }
            if (_langue && _langue !== langue) {
                setLangue(_langue)
            }
            if (_ville && _ville !== ville) {
                setVille(_ville)
            }
            if (category && category !== category) {
                setCategory(_category)
            }
        }
    }, [])


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
    const handleChangeDate = (event) => {
        setDate(
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

        props.handleSubmit({ 
           ville: ville, 
             langue: langue, 
              codepostal: codepostal,
            category: category,
           
          
          
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-around" }}>
            <SelectVariants loading={props.loading} value={props.value} handleChange={handleChangeCategory} val={category} />
            <SelectVariantsVilles loading={props.loading} handleChange={handleChangeVilles} val={ville} />
            <CodePostalForm loading={props.loading} handleChange={handleChangeCodePostal} val={codepostal} />
           {/*  <SelectVariantsLang loading={props.loading} handleChange={handleChangeLangue} val={langue} /> */}
            
            
            <SearchBtn loading={props.loading} />
            
        
        </form>
    )
}



export default function Search(props) {
    let [searchParams] = useSearchParams();
    const [value, setValue] = React.useState(0);

    const category = searchParams.get("category") || "";

    useEffect(() => {
        const catId = specialties.map((v) => v.value).indexOf(category);

        if (catId !== -1) {
            setValue(catId)
        }
    }, [category])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const data = {
            speciality: "",
            ville: "",
            codepostal: "",
            langue: [],
        }
        props.handleSubmit({ data, category: specialties[newValue].value })
    };

    const handleSubmit = (data) => {
        if (data) {
            props.handleSubmit({ data, category: specialties[value].value })
        }
    }

    return (
        <CardBox sx={{ minWidth: 275 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ overflowX: "auto" }}>
                    {
                        specialties.map((val, i) => (
                            <Tab style={{ fontWeight: 600 }} key={i} label={val.label} {...a11yProps(i)} />
                        ))
                    }
                </Tabs>
            </Box>
            {
                specialties.map((val, i) => (
                    <TabPanel key={i} value={value} index={i}>
                        <SearchForm
                            value={specialties[value]}
                            handleSubmit={handleSubmit}
                            loading={props.loading}
                        />
                    </TabPanel>
                ))
            }
        </CardBox>
    )
}
