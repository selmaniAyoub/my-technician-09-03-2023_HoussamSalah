import React, { Component } from 'react';
import Dropzone from '../Dropzone';
import { v4 as uuidv4 } from 'uuid';
import { withSnackbar } from 'notistack';
import Button from '@mui/material/Button';


class AddMediaFiles extends Component {

    action = key => (
        <Button style={{ color: "#FFF" }} onClick={() => { this.props.closeSnackbar(key) }}>
            Fermer
        </Button>
    );

    onFilesAdded = (files) => {
        let FilesNmb = files.length + this.props.files.length;
        let maxFileUploads = false;
        let FileToDelete = [];

        if (FilesNmb > 8) {
            maxFileUploads = true;
            this.props.enqueueSnackbar("Maximum number of files is 8", { variant: "error", action: this.action });
            return;
        }

        if (!maxFileUploads) {
            files.forEach((file, i) => {
                file.id = uuidv4();
                const filetypes = /jpeg|jpg|png|gif|tif|tiff|bmp|pdf|doc|docx|odt|rtf|wpd|pps|ppt|pptx|odp|svg/;;
                const name = filetypes.test(file.name.toLowerCase());
                const type = filetypes.test(file.type.toLowerCase());

                if (!name && !type) {
                    this.props.enqueueSnackbar("The file format is not supported", { variant: "error", action: this.action });
                    FileToDelete.push(file);
                    return;
                }

                if (file.size > 27000000) {
                    FileToDelete.push(file);
                    this.props.enqueueSnackbar("The file size may be too large !", { variant: "error", action: this.action });
                    return;
                }

                this.props.files.forEach((f) => {
                    if (file.name === f.name && file.lastModified === f.lastModified && file.size === f.size && file.type === f.type) {
                        FileToDelete.push(file);
                        this.props.enqueueSnackbar("File aleardy exists !", { variant: "error", action: this.action });
                    }
                })
            });


            if (FileToDelete.length > 0) {
                FileToDelete.forEach((F) => {
                    let index = files.indexOf(F)
                    files.splice(index, 1);
                })
            }

            if (this.props.onFilesAdded) {
                this.props.onFilesAdded(files);
            }

        }
    }


    render() {
        const { disabled } = this.props;

        return (
            <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={disabled}
            />
        )
    }
}


export default withSnackbar(AddMediaFiles)