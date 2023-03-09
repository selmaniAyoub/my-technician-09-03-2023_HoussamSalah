import React, { Component, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import LoadingButton from '@mui/lab/LoadingButton';
import Moment from 'moment';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import { connect } from "react-redux";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import CircularProgress from '@mui/material/CircularProgress';
import { Calendar } from 'react-calendar';
import { dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
const locales = {
	"en-US": require("date-fns/locale/en-US"),
};
let source;

const Container = styled('div')`
    width: 100%;
    margin: 20px 0;
    @media only screen and (max-width: 900px){
        margin-top: 0;
    }
    padding: 24px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    }  
`

const SessionContainer = styled('form')`
    display: flex;
    flex-direction: row;
    padding: 1em;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    @media only screen and (max-width: 900px){
        padding: 0;
        margin-bottom: 20px;
    }
`

const FieldContainer = styled('div')`
    margin: 10px;
`

const LoadingContainer = styled('div')`
    display: flex;
    min-height: 500px;
    width: 100%;
    align-items: center;
    justify-content: center;
`

const AddBtn = styled(LoadingButton)`
    font-weight: bold;
    letter-spacing: 1px;   
    min-width: 207px;
    padding: 10px 16px;
`
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

const getIfToday = (startTime, endtime) => {
    const iscurrentDate = Moment(endtime).isSame(startTime, "day");
    if (iscurrentDate) {
        return startTime
    } else {
        return null
    }
}

class AddSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            start: new Date(),
            end: new Date(),
            title: "",
            events: [],
            disabled: false,
            loading: true
        }
        source = axios.CancelToken.source();
    }

    async componentDidMount() {
        try {
            const { id } = this.props?.system?.user;

            if (id) {
                const { data } = await axios.get(`http://192.168.1.113:5000/search/schedule/${id}`);

                if (data) {
                    const newData = data.map((d) => {
                        return {
                            start: Moment(d.startDate, "DD/MM/yyyy HH:mm:ss").format(),
                            end: Moment(d.endDate, "DD/MM/yyyy HH:mm:ss").format(),
                            title: d.title,
                            allDay: false
                        }
                    })

                    this.setState({
                        loading: false,
                        events: [...this.state.events, ...newData]
                    })
                }
            }
        } catch (err) {
            console.log(err)
            this.setState({ loading: false })
        }
    }

    handleChangeTime = name => value => {
        this.setState({ [name]: value });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { user } = this.props.system;
        const data = {
            startDate: Moment(this.state.start).format("DD/MM/yyyy HH:mm:ss"),
            endDate: Moment(this.state.end).format("DD/MM/yyyy HH:mm:ss"),
            title: this.state.title
        }

        if (user.id) {
            this.setState({ disabled: true })
            axios.post(`http://192.168.1.113:5000/schedule/add/${user.id}`, data, {
                cancelToken: source.token
            })
                .then(res => {
                    this.setState({ disabled: false })
                    if (res.data) {
                        this.setState({
                            events: [...this.state.events, {
                                start: Moment(this.state.start).format(),
                                end: Moment(this.state.end).format(),
                                title: this.state.title,
                                allDay: false
                            }]
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ disabled: false })
                })
        }
    }

    render() {
        const { start, end, title, events, loading, disabled } = this.state;
        const allEvents=[]
        if (loading) {
            return (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            )
        }

        return (
            <Container>
                <SessionContainer onSubmit={this.handleSubmit}>
                    <FieldContainer>
                        <TextField
                            value={title}
                            id="outlined-basic"
                            label="Nom de la session"
                            variant="outlined"
                            onChange={this.handleChange("title")}
                            required
                            disabled={disabled}
                        />
                    </FieldContainer>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <FieldContainer>
                            <DateTimePicker
                                minDate={new Date()}
                                minTime={getIfToday(new Date(), start)}
                                label="start time"
                                value={start}
                                onChange={this.handleChangeTime("start")}
                                renderInput={(params) => <TextField {...params} />}
                                disabled={disabled}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <DateTimePicker
                                minDate={start}
                                minTime={getIfToday(start, end)}
                                label="end time"
                                value={end}
                                onChange={this.handleChangeTime("end")}
                                renderInput={(params) => <TextField {...params} />}
                                disabled={disabled}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <AddBtn loading={disabled} type="submit" variant="contained">
                                Prendre un rendez-vous
                            </AddBtn>
                        </FieldContainer>
                    </LocalizationProvider>
                </SessionContainer>
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    events={events}
                    loading={disabled}
                    locale="fr"
                    allDayText='Toute la journée'
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(withSnackbar(AddSchedule))
