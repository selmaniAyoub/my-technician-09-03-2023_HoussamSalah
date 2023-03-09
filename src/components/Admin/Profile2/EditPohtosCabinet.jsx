import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AddMediaFiles from '../Profile/AddMediaFiles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import axios from 'axios';
import { withSnackbar } from 'notistack';



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

const PhotosContainer = styled('div')`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 20px 0;
    width: 100%;
    @media only screen and (max-width: 600px){
        justify-content: center;
    }
`

const PhotoComponent = styled('div')`
    position: relative;
    margin-top: 20px;
`

const ImgThumbnail = styled('div')`
    height: 200px;
    width: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 15px 0 0;
    border-radius: 5px;
`

const StyledIconButton = styled(IconButton)`
    position: absolute;
    right: 10px;
    top: -14px;
    background-color: #fff !important;
    box-shadow: 0px 0px 9px -1px #b7b7b7;
    &:hover{
            background-color: #fff;
    }
    .eVMIxE.Mui-disabled:{
        background-color: #c1c1c1;
        color: rgb(143 143 143);
    }
`

const ActionBtnContainer = styled('div')`
    width: 100%;
    display: flex;
    justify-content: end;
    margin: 30px 0 0 0;
`

const SaveBtn = styled(LoadingButton)`
    font-weight: bold;
    letter-spacing: 1px;
`

const EmptyContainer = styled('div')`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
`

const EmptyText = styled(Typography)`
    font-size: 16px;
    color: #4c4c4c;
`

const getFiles = (photos) => {
    return photos.filter(p => typeof p !== "string")
}

const getUrls = (photos) => {
    return photos.filter(p => typeof p === "string")
}

const url = `http://192.168.1.113:5000/bilel-moussa/upload`;

const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append(
            "upload_preset",
            "btuw2go3"
        );
        fetch(url, {
            method: "post",
            body: formData,
        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

const saveImages = async (files) => {
    const urls = await Promise.all(
        files.map(async (file) => {
            const res = await uploadImage(file);
            return res.url;
        })
    )
    return urls;
}

function EditPohtosCabinet(props) {
    const [Photos, setPhotos] = useState([]);
    const [disabled, setDisable] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const role = props.user?.roles[0]?.role || null;

    const action = key => (
        <Button style={{ color: "#FFF" }} onClick={() => { props.closeSnackbar(key) }}>
            Fermer
        </Button>
    );

    useEffect(() => {
        const photoCabinet = props?.user?.photoCabinet || [];
        setPhotos(photoCabinet)
    }, [props])

    const onFilesAdded = (files) => {
        setPhotos(Photos.concat(files));
    }

    const handeleDeleteFile = (target) => () => {
        if (typeof target === 'string') {
            setPhotos(Photos.filter(item => item !== target));
        }
        if (typeof target === 'object' && target.id) {
            setPhotos(Photos.filter(item => item.id !== target.id));
        }
    }

    const handleChange = (event) => {
        setExpanded(!expanded);
    };

    const onSavePhotosCabinet = async () => {
        try {
            setDisable(true)
            const data = {
                photoCabinet: []
            };
            const filesToUpload = getFiles(Photos);
            const filesUploaded = getUrls(Photos);

            if (filesUploaded.length > 0) {
                filesUploaded.forEach((file) => {
                    data.photoCabinet.push(file);
                })
            }

            if (filesToUpload.length > 0) {
                const urls = await saveImages(filesToUpload);
                urls.forEach((url) => {
                    data.photoCabinet.push(url)
                })
            }

            if (data.photoCabinet !== props?.user?.photoCabinet) {
                const res = await axios.put('http://192.168.1.113:5000/users/edit/photocabinet', data)

                if (res.data) {
                    props.enqueueSnackbar("Mise à jour effectué !", { variant: "success", action: action });
                    setDisable(false)
                }
            }

        } catch (err) {
            console.log(err)
            props.enqueueSnackbar("Server Error !", { variant: "error", action: action });
            setDisable(false)
        }
    }


    if (role) {
        if (role !== "client" && role !== "pharmacie") {
            return (
                <StyledAccordion expanded={expanded} onChange={handleChange} elevation={0}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <BioTypo color={"primary"}>Photos de cabinet</BioTypo>
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            Photos.length > 0 ?
                                <PhotosContainer>
                                    {
                                        Photos.map((p, i) => (
                                            <PhotoComponent key={i}>
                                                {
                                                    typeof p === 'string' ?
                                                        <ImgThumbnail
                                                            style={{
                                                                backgroundImage: `url("${p}")`
                                                            }}
                                                        />
                                                        :
                                                        <ImgThumbnail
                                                            style={{
                                                                backgroundImage: `url("${URL.createObjectURL(p)}")`
                                                            }}
                                                        />
                                                }
                                                <StyledIconButton disabled={disabled} onClick={handeleDeleteFile(p)} color="error" aria-label="delete picture" size="small">
                                                    <DeleteIcon fontSize="small" />
                                                </StyledIconButton>
                                            </PhotoComponent>
                                        ))
                                    }
                                </PhotosContainer>
                                :
                                <EmptyContainer>
                                    <EmptyText variant="body1">Ajouter vos photos de cabinet</EmptyText>
                                </EmptyContainer>
                        }
                        <AddMediaFiles
                            files={Photos}
                            onFilesAdded={onFilesAdded}
                            handeleDeleteFile={handeleDeleteFile}
                            disabled={disabled}
                        />
                        <ActionBtnContainer>
                            <SaveBtn loading={disabled} onClick={onSavePhotosCabinet} variant="contained">
                                sauver
                            </SaveBtn>
                        </ActionBtnContainer>
                    </AccordionDetails>
                </StyledAccordion>
            )
        }
        return null
    }
    return null
}

export default withSnackbar(EditPohtosCabinet);