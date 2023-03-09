import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import PhotosDialog from './PhotosDialog';
import FileImage from '../../../assets/file.png';


const ImagePaper = styled(Paper)`
    height: 120px;
    width: 120px;
    background-color: #F5F5F5;
    box-shadow: none;
    background-position: center;
    background-origin: border-box;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 5px;
    @media only screen and (max-width: 1000px){
        height: 80px;
        width: 80px;
    }
`

const MyImgThumbnail = styled('div')`
    width: 250px;
    display: flex;
    margin: 3px 0 0 0;
    border-radius: 5px;
    height: 250px;
    background-position: center;
    background-origin: border-box;
    background-repeat: no-repeat;
    background-size: cover;
    @media only screen and (max-width: 1000px){
        height: 150px;
        width: 150px;
    }
`

const FlexContent = styled('div')`
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
`

const OthersFlexContent = styled('div')`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
`

const AnchorFile = styled('a')`
    display: flex;
    flex-direction: column;
    width: 100%;
    display: flex;
    margin: 3px 0 0 0;
    border-radius: 5px;
    max-width: 100%;
    height: 120px;
    width: 120px;
    @media only screen and (max-width: 1000px){
        height: 80px;
        width: 80px;
    }
`

const FileImagePaper = styled(Paper)`
    height: 100%;
    box-shadow: none;
    background-position: center;
    background-origin: border-box;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 5px;
    padding: 8px;
`

function get_url_extension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

function IsImageFormat(img) {
    const format = get_url_extension(img);
    const filetypes = /jpeg|jpg|png|gif|tif|tiff|bmp|svg/;
    return filetypes.test(format.toLowerCase());
}

const RenderFile = ({ img }) => {
    if (!img) {
        return (
            <AnchorFile>
            </AnchorFile>
        );
    }

    if (img) {
        const isImg = IsImageFormat(img);

        if (!isImg) {
            return (
                <AnchorFile href={`${img}`}>
                    <FileImagePaper
                        style={{
                            backgroundImage: `url(${FileImage})`
                        }}
                    />
                </AnchorFile>
            )
        }

        return (
            <MyImgThumbnail
                style={{
                    backgroundImage: `url(${img})`
                }}
            />
        );
    }

    return null;
}

const RenderFilePaper = ({ img }) => {
    if (!img) {
        return (
            <AnchorFile>
            </AnchorFile>
        );
    }

    if (img) {
        const isImg = IsImageFormat(img)

        if (!isImg) {
            return (
                <AnchorFile href={`${img}`}>
                    <FileImagePaper
                        style={{
                            backgroundImage: `url(${FileImage})`
                        }}
                    />
                </AnchorFile>
            )
        }

        return (
            <ImagePaper
                style={{
                    backgroundImage: `url(${img})`
                }}
            />
        );
    }

    return null;
}

const ImagesList = ({ images }) => {
    const [open, setOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState({});

    const handleClickOpen = (img) => {
        const isImg = IsImageFormat(img);

        if (isImg) {
            setSelectedPhoto(img)
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <FlexContent spacing={1}>
            {images.map((image, index) => (
                <div key={index}>
                    <ButtonBase onClick={() => handleClickOpen(image)}>
                        <RenderFilePaper img={image} />
                    </ButtonBase>
                    <PhotosDialog
                        open={open}
                        onClose={handleClose}
                        selectedPhoto={selectedPhoto}
                    />
                </div>
            ))}
        </FlexContent>
    )
}


const OthersImagesList = ({ images }) => {
    const [open, setOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState({});

    const handleClickOpen = (img) => {
        const isImg = IsImageFormat(img);

        if (isImg) {
            setSelectedPhoto(img)
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <OthersFlexContent spacing={1}>
            {images.map((image, index) => (
                <div key={index}>
                    <ButtonBase onClick={() => handleClickOpen(image)}>
                        <RenderFilePaper img={image} />
                    </ButtonBase>
                    <PhotosDialog
                        open={open}
                        onClose={handleClose}
                        selectedPhoto={selectedPhoto}
                    />
                </div>
            ))}
        </OthersFlexContent>
    )
}

const RenderMyImages = ({ images }) => {
    const [open, setOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState({});

    const handleClickOpen = (img) => {
        const isImg = IsImageFormat(img)

        if (isImg) {
            setSelectedPhoto(img)
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (images.length === 1) {
        return images.map((img, i) => (
            <div key={i}>
                <ButtonBase onClick={() => handleClickOpen(img)}>
                    <RenderFile img={img} />
                </ButtonBase>
                <PhotosDialog
                    open={open}
                    onClose={handleClose}
                    selectedPhoto={selectedPhoto}
                />
            </div>
        ))
    } else {
        return <ImagesList images={images} />
    }
}


const RenderOtersImages = ({ images }) => {
    const [open, setOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState({});

    const handleClickOpen = (img) => {
        const isImg = IsImageFormat(img);

        if (isImg) {
            setSelectedPhoto(img)
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (images.length === 1) {
        return images.map((img, i) => (
            <div key={i}>
                <ButtonBase onClick={() => handleClickOpen(img)}>
                    <RenderFile img={img} />
                </ButtonBase>
                <PhotosDialog
                    open={open}
                    onClose={handleClose}
                    selectedPhoto={selectedPhoto}
                />
            </div>
        ))
    } else {
        return <OthersImagesList images={images} />
    }
}


export default function PhotoMessage({ owner, images }) {
    if (owner === "me") {
        return (
            <RenderMyImages images={images} />
        )
    } else {
        return (
            <RenderOtersImages images={images} />
        )
    }
}




