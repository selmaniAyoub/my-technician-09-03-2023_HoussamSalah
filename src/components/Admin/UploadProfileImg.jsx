import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';


const Cotnainer = styled('div')`
    display flex;
    justify-content: center;
    align-center: center;
    width: 100%;
    margin: 20px 0;
`

const StyledInput = styled('input')`
    display: none;
`

const AddBtn = styled(LoadingButton)`
    font-weight: bold;
    letter-spacing: 0.5px;
`


export default function UploadProfileImg({ loading, profilePhoto, onPhotoAdded }) {
    const fileInputRef = useRef(null)

    const fileListToArray = (list) => {
        const array = [];
        for (let i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    }

    const openFileDialog = () => {
        if (loading) return;
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const onFilesAdded = (evt) => {
        const filesList = evt.target.files;
        const files = fileListToArray(filesList);
        const file = files[0];

        const filetypes = /jpeg|jpg|png|gif|bmp/;
        const name = filetypes.test(file.name.toLowerCase());
        const type = filetypes.test(file.type.toLowerCase());

        if (!name && !type) {
            console.log("Images Only !")
            return;
        }

        if (file.size > 27000000) {
            console.log("Height Size File !")
            return;
        }

        if (profilePhoto) {
            if (file.name === profilePhoto.name && file.lastModified === profilePhoto.lastModified && file.size === profilePhoto.size && file.type === profilePhoto.type) {
                console.log("Same File")
                return
            }
        }

        onPhotoAdded(file)
    }


    return (
        <Cotnainer>
            <AddBtn loading={loading} onClick={openFileDialog} variant="contained">
                <StyledInput
                    onChange={onFilesAdded}
                    className="FileInput"
                    ref={fileInputRef}
                    value={""}
                    type="file"
                    accept="image/*"
                />
                Upload your image
            </AddBtn>
        </Cotnainer>
    )
}
