import React from 'react'
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';


const Img = styled('img')`
    width: 100%;
    height: auto;
    max-width: 500px;
`

const StyledIconBtn = styled(IconButton)`
    position: absolute;
    top: 0;
    right: 0;
`

export default function PhotosDialog(props) {
    const { onClose, selectedValue, open, selectedPhoto } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleBtnClose = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <div style={{ backgroundColor: "#fff", height: "40px", width: "100%" }}>
                <StyledIconBtn onClick={handleBtnClose} >
                    <CancelIcon />
                </StyledIconBtn>
            </div>
            <Img
                src={selectedPhoto}
            />
        </Dialog>
    )
}
