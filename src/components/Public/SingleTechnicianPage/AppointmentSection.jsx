import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ListItemText from '@mui/material/ListItemText';
import 'react-calendar/dist/Calendar.css';
import '../../../react-calendar.css';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import DialogLogin from '../../../components/Dialog/Dialog';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

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

class AppointmentSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookingDate: new Date(),
            selectedTimeSlot: null,
            orderSessions: [],
            date:null,startDate:null,endDate:null,
            message: "",
            subject: "",
            disable: false,
            open: false,
            start: new Date(),
            end: new Date(),
            title: "",
            events: [],
            disabled: false,
            loading: true
        }
    }
  
  source = axios.CancelToken.source();
   
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
        const { loggedIn, user } = this.props.system;
        const { user: doc } = this.props;
        const { message, subject , date, startDate, endDate} = this.state;
         
        if (!loggedIn) {
            this.setState({ open: true })
            return;
        }
        
        else {
             if (!date) {
                 this.props.enqueueSnackbar("vous devez sélectionner la date de rendez-vous", { variant: "error", action: this.action });
            return;
             }
             if (!endDate) {
                this.props.enqueueSnackbar("vous devez sélectionner la date de rendez-vous", { variant: "error", action: this.action });
           return;
            }
            if (!startDate) {
                this.props.enqueueSnackbar("vous devez sélectionner la date de rendez-vous", { variant: "error", action: this.action });
           return;
            }


            if (doc.id && user.id && date && startDate && endDate) {
                this.setState({ disable: true })

                const data = {
                    date : date,
                    startDate: startDate,
                    endDate: endDate,
                    text: message,
                    subject,
                }
                  console.log("data : ",data )
                axios.post(`http://192.168.1.113:5000/rendezvous/add/${user.id}/${doc.id}`, data)
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
        const {date, startDate, endDate, open,disabled, events } = this.state;
        const { user } = this.props.system;
        const roles = user.roles;
       console.log(" date ",  date);
       console.log(" start date ",  startDate);
       console.log(" enddate ",  endDate);
        if (!roles) {
            return null;
        }

        if (roles) {
            const role = roles[0]?.role;

            if (!role || role !== "client") {
                return null;
            }
        }

        return (
            <CtnAction elevation={0}>
                <List>
                    <ListItem disablePadding>
                        <ListItemIcon style={{ minWidth: 20, marginRight: 10 }}>
                            <DateRangeIcon style={{ color: "#58a5ff", fontSize: 60, marignRight: 10 }} />
                        </ListItemIcon>
                        <CalendarHeader>
                         Aganda
                        </CalendarHeader>
                    </ListItem>
                </List>
           
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    events={events}
                    loading={disabled}
                    locale="fr"
                   allDayText='Heure'
                /> 
            
               
            </CtnAction>
        );
    }
}

export default withSnackbar(AppointmentSection);