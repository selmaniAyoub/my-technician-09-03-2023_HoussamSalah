import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const ErrorAlert = ({ handleClose, message }) => (
    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
    </Alert>
)


const SuccessAlert = ({ handleClose, message }) => (
    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
    </Alert>
)


const WarningAlert = ({ handleClose, message }) => (
    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        {message}
    </Alert>
)


const InfoAlert = ({ handleClose, message }) => (
    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        {message}
    </Alert>
)


const RenderAlert = ({ type, handleClose, message }) => {
    if (type === "error") {
        return (
            <ErrorAlert
                message={message}
                handleClose={handleClose}
            />
        )
    }
    if (type === "success") {
        return (
            <SuccessAlert
                message={message}
                handleClose={handleClose}
            />
        )
    }
    if (type === "success") {
        return (
            <WarningAlert
                message={message}
                handleClose={handleClose}
            />
        )
    }
    if (type === "info") {
        return (
            <InfoAlert
                message={message}
                handleClose={handleClose}
            />
        )
    }
    return null
}

function AlertsSnack({ setOpen, open, message, type }) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <RenderAlert
                type={"error"}
                message={"wtf please"}
                handleClose={handleClose}
            />
        </Snackbar>
    )
}

export default AlertsSnack;