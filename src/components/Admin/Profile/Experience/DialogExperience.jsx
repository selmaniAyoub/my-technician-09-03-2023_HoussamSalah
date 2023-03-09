import React, { Component } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AddPhotosCabinets from '../AddMediaFiles';
import AttachmentsList from '../AttachmentsList';


const StyledText = styled(TextField)`
    width: 100%;
    margin-top: 10px;
`

const UploadTitle = styled(Typography)`
    margin: 20px 0 20px 0;
    text-transform: capitalize;
`

const ExperienceTitle = ({ id }) => {
    if (id) {
        return <DialogTitle>Edit experience</DialogTitle>
    }
    return <DialogTitle>Add experience</DialogTitle>
}


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
            return res.url;
        })
    )
    return urls;
}

const getFiles = (photos) => {
    return photos.filter(p => typeof p !== "string")
}

const getUrls = (photos) => {
    return photos.filter(p => typeof p === "string")
}

class DialogExperience extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            title: "",
            description: "",
            company: "",
            startExperience: null,
            endExperience: null,
            attachmentUrl: [],
            loading: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.experience !== prevProps.experience) {
            if (this.props.experience) {
                const { id, title, description, startExperience, endExperience, attachmentUrl, company } = this.props.experience;
                this.setState({
                    id,
                    title,
                    description,
                    startExperience,
                    endExperience,
                    company,
                    attachmentUrl: attachmentUrl || []
                })
            }
            if (!this.props.experience) {
                this.setState({
                    id: null,
                    title: "",
                    description: "",
                    company: "",
                    startExperience: null,
                    endExperience: null,
                    attachmentUrl: []
                })
            }
        }
    }

    action = key => (
        <Button style={{ color: "#FFF" }} onClick={() => { this.props.closeSnackbar(key) }}>
            Fermer
        </Button>
    );

    handleClose = () => {
        if (this.props.experience) {
            const { id, title, description, startExperience, endExperience, attachmentUrl, company } = this.props.experience;
            this.setState({
                id,
                title,
                description,
                startExperience,
                endExperience,
                company,
                attachmentUrl: attachmentUrl || []
            })
        }

        if (!this.props.experience) {
            this.setState({
                id: null,
                title: "",
                description: "",
                company: "",
                startExperience: null,
                endExperience: null,
                attachmentUrl: []
            })
        }

        this.props.onClose();
    };

    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
    }

    handleStartChange = (value) => {
        this.setState({ startExperience: value });
    }

    handleEndChange = (value) => {
        this.setState({ endExperience: value });
    }

    onFilesAdded = (files) => {
        const { attachmentUrl } = this.state;
        this.setState({ attachmentUrl: attachmentUrl.concat(files) })
    }

    handeleDeleteFile = (target) => () => {
        const { attachmentUrl } = this.state;
        if (typeof target === 'string') {
            this.setState({ attachmentUrl: attachmentUrl.filter(item => item !== target) })
        }
        if (typeof target === 'object' && target.id) {
            this.setState({ attachmentUrl: attachmentUrl.filter(item => item.id !== target.id) })
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { title, description, startExperience, endExperience, attachmentUrl, id, company } = this.state;
        const data = {
            title,
            description,
            startExperience,
            endExperience,
            attachmentUrl: [],
            company
        }

        if (!id) {
            this.setState({ loading: true })
            try {
                if (attachmentUrl || attachmentUrl.length > 0) {
                    const urls = await saveImages(attachmentUrl);
                    data.attachmentUrl = urls;
                }
                await axios.post('http://localhost:5000/profile/add/experience', data)
                this.setState({ loading: false })
                this.props.enqueueSnackbar("experience added with success", { variant: "success", action: this.action });
                this.props.onClose(data);
            } catch (err) {
                console.log(err)
                this.setState({ loading: false })
                this.props.enqueueSnackbar("Server Error", { variant: "error", action: this.action });
            }
        }

        if (id) {
            const { title: _tile, description: _description, startExperience: _startExperience, endExperience: _endExperience, attachmentUrl: _attachmentUrl, company: _company } = this.props.experience;

            if (title !== _tile || description !== _description || startExperience !== _startExperience || endExperience !== _endExperience || attachmentUrl !== _attachmentUrl || company !== _company) {
                this.setState({ loading: true })
                try {
                    const filesToUpload = getFiles(attachmentUrl);
                    const filesUploaded = getUrls(attachmentUrl);
                    if (filesUploaded.length > 0) {
                        filesUploaded.forEach((file) => {
                            data.attachmentUrl.push(file);
                        })
                    }
                    if (filesToUpload.length > 0) {
                        const urls = await saveImages(filesToUpload);
                        urls.forEach((url) => {
                            data.attachmentUrl.push(url)
                        })
                    }
                    await axios.put(`http://localhost:5000/profile/update/experience/${id}`, data)
                    this.setState({ loading: false })
                    this.props.enqueueSnackbar("experience modified with success", { variant: "success", action: this.action });
                    data.id = id;
                    this.props.onClose(data);
                } catch (err) {
                    console.log(err)
                    this.setState({ loading: false })
                    this.props.enqueueSnackbar("Server Error", { variant: "error", action: this.action });
                }
            }
        }
    }

    render() {
        const { title, description, startExperience, endExperience, attachmentUrl, loading, id, company } = this.state;
        const { open } = this.props;

        return (
            <Dialog onClose={this.handleClose} open={open}>
                <ExperienceTitle id={id} />
                <form onSubmit={this.handleSubmit}>
                    <DialogContent>
                        <StyledText
                            value={title}
                            id="filled-title"
                            label="Title"
                            variant="filled"
                            onChange={this.handleChange("title")}
                            disabled={loading}
                            required
                        />
                        <StyledText
                            value={description}
                            id="filled-description"
                            label="Description"
                            variant="filled"
                            onChange={this.handleChange("description")}
                            multiline
                            rows={5}
                            disabled={loading}
                        />
                        <StyledText
                            value={company}
                            id="filled-company"
                            label="Company"
                            variant="filled"
                            onChange={this.handleChange("company")}
                            disabled={loading}
                            required
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                className="datepicker"
                                label="Start Date"
                                inputFormat="MM/dd/yyyy"
                                value={startExperience}
                                onChange={this.handleStartChange}
                                renderInput={(params) => <TextField required variant="filled" style={{ marginTop: 10, width: "100%" }} {...params} />}
                                disabled={loading}
                            />

                            <DesktopDatePicker
                                label="End Date"
                                inputFormat="MM/dd/yyyy"
                                value={endExperience}
                                onChange={this.handleEndChange}
                                renderInput={(params) => <TextField required variant="filled" style={{ marginTop: 10, width: "100%" }} {...params} />}
                                disabled={loading}
                            />
                        </LocalizationProvider>

                        <UploadTitle color="primary" variant="body1">Attach files</UploadTitle>

                        <AttachmentsList
                            photos={attachmentUrl}
                            loading={loading}
                            handeleDeleteFile={this.handeleDeleteFile}
                        />

                        <AddPhotosCabinets
                            files={attachmentUrl}
                            onFilesAdded={this.onFilesAdded}
                            handeleDeleteFile={this.handeleDeleteFile}
                        />

                    </DialogContent>
                    <DialogActions>
                        <LoadingButton type="submit" loading={loading}>Save</LoadingButton>
                        <Button disabled={loading} onClick={this.handleClose} >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }
}

export default withSnackbar(DialogExperience) 