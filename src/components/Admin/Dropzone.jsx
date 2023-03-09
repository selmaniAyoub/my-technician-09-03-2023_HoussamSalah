import React, { Component, createRef } from 'react';
import BackupIcon from '@mui/icons-material/Backup';
import { styled } from '@mui/material/styles';


const DropzoneContent = styled('div')`
    height: 200px;
    width:  100%;
    border: 2px dashed #bbbaba;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 16px;
    margin: 0 auto;
`

const StyledIcon = styled(BackupIcon)`
    opacity: 0.3;
    height: 64px;
    width: 64px;
`

const StyledInput = styled('input')`
    display: none;
`


export default class Dropzone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hightlight: false,
        }
    }

    fileInputRef = createRef();

    fileListToArray = (list) => {
        const array = [];
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    }

    openFileDialog = () => {
        if (this.props.disabled) return;
        if (this.fileInputRef.current) {
            this.fileInputRef.current.click();
        }
    }

    onFilesAdded = (evt) => {
        if (this.props.disabled) return;
        const files = evt.target.files;
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
    }

    onDragOver = (evt) => {
        evt.preventDefault();

        if (this.props.disabled) return;

        this.setState({ hightlight: true });
    }

    onDragLeave = () => {
        this.setState({ hightlight: false });
    }

    onDrop = (event) => {
        event.preventDefault();

        if (this.props.disabled) return;

        const files = event.dataTransfer.files;

        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }

        this.setState({ hightlight: false });
    }

    render() {
        const { hightlight } = this.state;

        return (
            <DropzoneContent
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                style={{
                    cursor: this.props.disabled ? "default" : "pointer",
                    backgroundColor: hightlight ? "#565656" : "inherit"
                }}
            >
                <StyledIcon />
                <StyledInput
                    onChange={this.onFilesAdded}
                    ref={this.fileInputRef}
                    value={""}
                    type="file"
                    multiple
                />
                <span>Drop Files</span>
            </DropzoneContent>
        )
    }
}
