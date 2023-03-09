import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import IconButton from '@mui/material/IconButton';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import { withSnackbar } from 'notistack';


const StyledInput = styled('input')`
    display: none;
`

function AddFile(props) {
    const { disabled, listOfFiles, onPhotosAdded } = props;
    const fileInputRef = useRef(null)

    const action = key => (
        <Button style={{ color: "#FFF" }} onClick={() => { props.closeSnackbar(key) }}>
            Fermer
        </Button>
    );

    const fileListToArray = (list) => {
        const array = [];
        for (let i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    }

    const openFileDialog = () => {
        if (disabled) return;
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const onFilesAdded = (evt) => {
        const filesList = evt.target.files;
        const files = fileListToArray(filesList);
        let FilesNmb = files.length + listOfFiles.length;
        let maxFileUploads = false;
        let FileToDelete = [];

        if (FilesNmb > 10) {
            maxFileUploads = true;
            props.enqueueSnackbar("Maximum number of files is 10", { variant: "error", action: action });
            return false;
        }

        if (!maxFileUploads) {
            files.forEach((file, i) => {
                file.id = uuidv4();
                const filetypes = /jpeg|jpg|png|gif|tif|tiff|bmp|svg/;
                const name = filetypes.test(file.name.toLowerCase());
                const type = filetypes.test(file.type.toLowerCase());

                if (!name && !type) {
                    props.enqueueSnackbar("File format is not supported", { variant: "error", action: action });
                    FileToDelete.push(file);
                }

                if (file.size > 27000000) {
                    props.enqueueSnackbar("File size may be too large !", { variant: "error", action: action });
                    FileToDelete.push(file);
                }

                listOfFiles.forEach((f) => {
                    if (file.name === f.name && file.lastModified === f.lastModified && file.size === f.size && file.type === f.type) {
                        FileToDelete.push(file);
                        props.enqueueSnackbar("File aleardy exist !", { variant: "error", action: action });
                    }
                })
            });

            if (FileToDelete.length > 0) {
                FileToDelete.forEach((F) => {
                    let index = files.indexOf(F)
                    files.splice(index, 1);
                })
            }

            onPhotosAdded(files)
        }
    }

    return (
        <IconButton disabled={disabled} onClick={openFileDialog} sx={{ p: '10px' }} aria-label="insert photos">
            <InsertPhotoIcon />
            <StyledInput
                onChange={onFilesAdded}
                className="FileInput"
                ref={fileInputRef}
                value={""}
                type="file"
                multiple
                accept="image/*"
            />
        </IconButton>
    )
}

export default withSnackbar(AddFile);