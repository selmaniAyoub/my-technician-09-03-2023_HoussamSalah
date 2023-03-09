import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { connect } from "react-redux";
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import InsertPhoto from '../../AddImages/AddImages';
import InsertFiles from '../../AddFiles/AddFiles';
import DeleteIcon from '@mui/icons-material/Delete';
import FileImg from '../../../assets/file.png';
import Picker from 'emoji-picker-react';
import Menu from '@mui/material/Menu';
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { compose } from "recompose";


const StyledPaper = styled(Paper)`
    padding: 10px 6px;
    display: flex;
    alignItems: center;
    width: 100%;
    background-color: #f1f1f1;
    flex-wrap: wrap;
    align-items: center;
    @media only screen and (max-width: 997px){
        flex-direction: column;
    }
`

const AvatarTextCotnainer = styled('div')`
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    @media only screen and (max-width: 997px){
        width: 100%;
        align-items: center;
    }
    @media only screen and (max-width: 450px){
        flex-direction: column;
    }
`

const ItemsCotnainer = styled('div')`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const StyledBtn = styled(LoadingButton)`
    margin: 10px 0 10px 10px;
    font-weight: bold;
    letter-spacing: 1px;   
    @media only screen and (max-width: 450px){
        margin: 20px 0 20px 10px;
        width: 100%;
    }
`

const BottomContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 20px 0;
`

const ImgContainer = styled('div')`
    display: flex;
    flex-direction: row;
    max-width: 100%;
    overflow: auto;
    padding: 20px 0;
`

const ImgThumbnail = styled('div')`
    height: 100px;
    width: 100px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 15px 0 0;
    border-radius: 5px;
`

const SingleImg = styled('div')`
    position: relative;
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

const StyledTextInput = styled(InputBase)`
    margin-left: 8px;
    flex: 1;
    flex-grow: 1;
    @media only screen and (max-width: 450px){
        width: 100%;
    }
`

const FileImgContainer = styled('div')`
    display: flex;
    flex-direction: row;
    padding: 8px;
    margin: 0 15px 0 0;
    max-width: 250px;
    overflow: hidden;
    background-color: #f1f1f1;
    align-items: center;
    height: 100px;
`

const FileImage = styled('img')`
    width: auto;
    height: 100%;
`

const FileName = styled('p')`
    font-size: 12px;
    color: #000;
    word-break: break-word;
    color: #555;
`

const url = `https://api.cloudinary.com/v1_1/bilel-moussa/upload`;

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
            if (res.error) {
                throw new Error(res.error.message);
            }
            return res.url;
        })
    )
    return urls;
}

function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
}

const RenderImgThumbnail = ({ file }) => {

    if (!isFileImage(file)) {
        return (
            <FileImgContainer>
                <FileImage src={FileImg} />
                <FileName>{file.name}</FileName>
            </FileImgContainer>
        )
    }

    return (
        <ImgThumbnail
            style={{
                backgroundImage: `url("${URL.createObjectURL(file)}")`
            }}
        />
    )
}

function ChatAction({ handleSendMsg, connected, setLoading, loading, system, t }) {
    const [message, setMessage] = useState("");
    const [files, setFiles] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const openEmoji = Boolean(anchorEl);

    const handleChange = event => {
        setMessage(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (files.length === 0 && message.trim().length === 0) {
            return;
        }

        if (files.length > 0 && message.trim().length === 0) {
            setLoading(true)
            const urls = await saveImages(files);

            if (urls) {
                handleSendMsg({ message: "", photoUrls: urls, type: "photos" })
            }
        }

        if (files.length > 0 && message.trim().length !== 0) {
            setLoading(true)
            const urls = await saveImages(files);
            handleSendMsg({ message: message, photoUrls: urls, type: "text/photos" })
        }

        if (files.length === 0 && message.trim().length !== 0) {
            setLoading(true)
            handleSendMsg({ message: message, photoUrls: [], type: "text" })
        }

    }

    const onPhotosAdded = (NewPhotos) => {
        setFiles(files.concat(NewPhotos))
    }

    const onFilesAdded = (NewFiles) => {
        setFiles(files.concat(NewFiles))
    }

    const handeleDeleteFile = (target) => () => {
        setFiles(files.filter(item => item.id !== target.id));
    }

    useEffect(() => {
        if (!loading && (files.length > 0 || message.trim().length > 0)) {
            setFiles([])
            setMessage("")
        }
    }, [loading])

    const onEmojiClick = (event, emojiObject) => {
        const newMsg = message.concat(emojiObject.emoji);
        setMessage(newMsg)
    }

    const openMenuEmoji = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <BottomContainer>
            <ImgContainer>
                {
                    files.map((p, i) => (
                        <SingleImg key={i}>
                            <RenderImgThumbnail file={p} />
                            <StyledIconButton disabled={!connected || loading} onClick={handeleDeleteFile(p)} color="error" aria-label="delete picture" size="small">
                                <DeleteIcon fontSize="small" />
                            </StyledIconButton>
                        </SingleImg>
                    ))
                }
            </ImgContainer>

            <StyledPaper
                component={'form'}
                onSubmit={handleSubmit}
            >
                <AvatarTextCotnainer>
                    <Avatar style={{ marginRight: "auto" }} alt="Remy Sharp" src={`${system.user.imageUrl}`} />
                    <StyledTextInput
                        placeholder={t("Votre message...")}
                        inputProps={{ 'aria-label': 'search google maps' }}
                        multiline
                        maxRows={"5"}
                        value={message}
                        onChange={handleChange}
                        disabled={!connected || loading}
                    />
                </AvatarTextCotnainer>
                <ItemsCotnainer>
                    <IconButton disabled={!connected || loading} onClick={openMenuEmoji} sx={{ p: '10px' }} aria-label="emoji">
                        <EmojiEmotionsIcon />
                    </IconButton>
                    <InsertPhoto listOfFiles={files} disabled={!connected || loading} onPhotosAdded={onPhotosAdded} />
                    <InsertFiles listOfFiles={files} disabled={!connected || loading} onPhotosAdded={onFilesAdded} />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <StyledBtn loading={loading} disabled={!connected} type="submit" variant="contained" startIcon={<SendIcon />}>
                        {t('envoyer')}
                    </StyledBtn>
                </ItemsCotnainer>
            </StyledPaper>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={openEmoji}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Picker onEmojiClick={onEmojiClick} disableSearchBar disableSkinTonePicker />
            </Menu>
        </BottomContainer>
    )
}

const mapStateToProps = (state) => ({
    system: state.system
});

export default compose (connect(mapStateToProps),withNamespaces()) (ChatAction);