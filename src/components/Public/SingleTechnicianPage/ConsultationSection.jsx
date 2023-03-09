import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ListItemText from '@mui/material/ListItemText';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Calendar from 'react-calendar';
//import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import 'react-calendar/dist/Calendar.css';
import '../../../react-calendar.css';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import DialogLogin from '../../../components/Dialog/Dialog';
import Badge from '@mui/material/Badge';

import consultImg from "./tech.jpg"
//import { DatePicker } from 'antd';
import { DateTimePicker } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { useTranslation } from 'react-i18next';
import { translate } from 'react-i18next';
import { compose } from "recompose";

const CtnAction = styled(Paper)`
    display: flex; 
    flex-direction: column;
    padding: 1em;
    border: 1px solid #f1f1f1;
    margin-top: 30px;
    justify-content: center;
    align-items: start;
    @media only screen and (max-width: 600px){
        padding: 0.5em;
    }
`

const CalendarHeader = styled(ListItemText)`
    .MuiTypography-root{
        font-size: 25px;
        font-weight: 600;
    }
`

const TimeContainer = styled('div')`
    display: flex; 
    flex-direction: column;
    align-items: start;
    margin-bottom: 1em;
    justify-content: start;
    margin: 2em 0;
    @media only screen and (max-width: 900px){
        margin: 1em 0;
    }
`

const FormContainer = styled('div')`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-evenly;
    @media only screen and (max-width: 900px){
        flex-direction: column;
        align-items: center;
    }
`

const MessageForms = styled('div')`
    min-width: 400px;
    width: 49%;
    margin-top: 20px;
    @media only screen and (max-width: 900px){
        width: 100%;
        margin-top: 30px;
        max-width: 600px;
        min-width: 100px;
    }
`

const StyledFormControll = styled(FormControl)`
    width: 100%;
`

const AppointementBtn = styled(Button)`
    margin: 30px auto;
    font-weight: 700;
`

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -5,
        top: -3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const getIfToday = (startTime, endtime) => {
    const iscurrentDate = moment(endtime).isSame(startTime, "day");

    if (iscurrentDate) {
        return startTime
    } else {
        return null
    }
}

const RenderOrderSessions = ({ bookingDate, orderSessions, selectedTimeSlot, handleTimeChange, disable }) => {
    return (
        <ToggleButtonGroup
            value={selectedTimeSlot}
            exclusive
            onChange={handleTimeChange}
            orientation="horizontal"
            className="timeContainer"
            disabled={disable}
        >
            {
                orderSessions.length > 0 ?
                    orderSessions.map((date, i) => {
                        const res = getIfToday(moment(date.startDate, "DD/MM/yyyy HH:mm:ss").format(), moment(bookingDate).format())

                        const label = `${moment(date.startDate, "DD/MM/yyyy HH:mm:ss").format("HH:mm")} - ${moment(date.endDate, "DD/MM/yyyy HH:mm:ss").format("HH:mm")}`

                        if (res) {
                            return (
                                <ToggleButton
                                    key={i}
                                    color={date.nbRdvs > 0 ? "warning" : "primary"}
                                    value={date}
                                    size="medium"
                                    fullWidth
                                    className='timeBtn'
                                    disabled={date.status === "pending" || date.status === "open" ? false : true}
                                >
                                    {
                                        date.nbRdvs > 0 ?
                                            <StyledBadge color="success" badgeContent={date.nbRdvs}>
                                                {label}
                                            </StyledBadge>
                                            :
                                            label
                                    }
                                </ToggleButton>
                            )
                        } else {
                            return null
                        }
                    })
                    :
                    null
            }
        </ToggleButtonGroup>
    )
}

class ConsultationSection extends Component {
    constructor(props) {
        super(props)
        console.log("props: " , props)
        this.state = {
            bookingDate: new Date(),
            selectedTimeSlot: null,
            orderSessions: [],
            date:null,startDate:null,endDate:null,
            message: "",
            subject: "",
            disable: false,
            open: false,
        }
    }

    async componentDidMount() {
        try {
            const { docId } = this.props;

            if (docId) {
                this.setState({ disable: true })

                const { data } = await axios.get(`http://192.168.1.113:5000/search/schedule/${docId}`);

                if (data) {
                    this.setState({
                        orderSessions: data
                    })
                }

                this.setState({ disable: false })
            }
        } catch (err) {
            console.log(err);
            console.log(err.response.data);
            this.setState({ disable: false });
        }
    }

    action = key => (
        <Button style={{ color: "#FFF" }} onClick={() => { this.props.closeSnackbar(key) }}>
            Fermer
        </Button>
    );

    onDateChange = (val) => {
        console.log("val : ", val);
        this.setState({
            bookingDate: val,
            selectedTimeSlot: null
        })
    };

    handleTimeChange = (event, newAlignment) => {
        this.setState({ selectedTimeSlot: newAlignment })
        console.log(" t : " ,newAlignment);
    };

    handleAppointement = () => {
        const { loggedIn } = this.props.system;
        const user= this.props.user;
        const { user: doc } = this.props;
        const { selectedTimeSlot, message, subject , date, startDate, endDate} = this.state;
        console.log("\*** selectedTimeSlot*** /: ", selectedTimeSlot);
 
        if (!loggedIn) {
            this.setState({ open: true })
            return;
        }
        
        else {
        
             if (!endDate) {
                this.props.enqueueSnackbar("vous devez sélectionner la date de fin de rendez-vous", { variant: "error", action: this.action });
           return;
            }
            if (!startDate) {
                this.props.enqueueSnackbar("vous devez sélectionner la date debut de rendez-vous", { variant: "error", action: this.action });
           return;
            }


            if (doc.id && user.id  && startDate && endDate) {
                this.setState({ disable: true })

                const data = {
                    date : startDate,
                    startDate: startDate,
                    endDate: endDate,
                    text: message,
                    subject,
                }
                  console.log("data : ",data )
                axios.post(`http://192.168.1.113:5000/rendezvous/add/${doc.id}`, data)
                    .then((res) => {
                        this.setState({ disable: false })
                        this.props.enqueueSnackbar(`${res.data}`, { variant: "success", action: this.action });
                        this.setState({ message: "", subject: "", selectedTimeSlot: null })
                    })
                    .catch(err => {
                        console.log(err.message)
                        this.setState({ disable: false })
                        this.props.enqueueSnackbar("server error", { variant: "error", action: this.action });
                        this.setState({ message: "", subject: "", selectedTimeSlot: null })
                    })
            }
        }
    }

    handleChange = (name) => (event) => {
        
        this.setState({ [name]: event.target.value })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    render() {
        const {t}=this.props;  
        const { orderSessions, bookingDate, disable,date, startDate, endDate, subject, message, open } = this.state;
        const { user } = this.props;
        console.log("this.props.system =",user)
        const roles = user.roles;
       console.log(" date ",  date);
       console.log(" start date ",  startDate);
       console.log(" enddate ",  endDate);
    

        return (
            <> 
            <CtnAction elevation={0}>
                <List>
                    <ListItem disablePadding>
                        <ListItemIcon style={{ minWidth: 50, marginRight: 10 }}>
                            <DateRangeIcon style={{ color: "#58a5ff", fontSize: 60, marignRight: 10 }} />
                        </ListItemIcon>
                        <CalendarHeader>
                            {t("Rendez-vous")}
                        </CalendarHeader>
                    </ListItem>
                </List>
               
                <FormContainer>
                  
                    <MessageForms>
                      
                        <StyledFormControll style={{ marginBottom: 20 }}  variant="outlined" required>
                            <TextField
                                id="standard-basic"
                                type="datetime-local"
                                variant="outlined"
                                value={startDate}
                                name="startDate"
                                //label="End Date"
                                onChange={this.handleChange("startDate")}
                                required
                                disabled={disable}
                            /> 
                            
                             </StyledFormControll>
                                
                        <StyledFormControll style={{ marginBottom: 20 }}  variant="outlined" required>
                            <TextField
                                id="standard-basic"
                                type="datetime-local"
                                variant="outlined"
                                value={endDate}
                                name="endDate"
                                placeholder="Enter a custom placeholder here"
                                onChange={this.handleChange("endDate")}
                                required
                                disabled={disable}
                            /> 
                            
                             </StyledFormControll>
                        <StyledFormControll style={{ marginBottom: 20 }}   variant="outlined" required>
                            <TextField
                                id="standard-basic"
                                type="text"
                                variant="outlined"
                                value={subject}
                                name="sujet"
                                label={t("Sujet")}
                                onChange={this.handleChange("subject")}
                                required
                                disabled={disable}
                            />
                        </StyledFormControll>
                        <StyledFormControll   variant="outlined" required>
                            <TextField
                                id="standard-basic"
                                type="text"
                                variant="outlined"
                                value={message}
                                name="message"
                                label={t("Message")}
                                rows={9}
                                onChange={this.handleChange("message")}
                                multiline
                                required
                                disabled={disable}
                            />
                        </StyledFormControll>
                        <AppointementBtn disabled={disable} onClick={this.handleAppointement} size={"large"} startIcon={<ScheduleSendIcon />} variant="contained">
                    {t("Envoyer")}
                </AppointementBtn>
                    </MessageForms>
                </FormContainer>
               
                <DialogLogin
                    open={open}
                    onClose={this.handleClose}
                />
      
           
            </CtnAction>

<RenderOrderSessions bookingDate={this.state.bookingDate} orderSessions={this.state.orderSessions} selectedTimeSlot={this.state.selectedTimeSlot} handleTimeChange={this.handleTimeChange} disable={this.state.disable}  />
     

            </>
        );
    }
}

export default compose (withNamespaces(),withSnackbar)(ConsultationSection);