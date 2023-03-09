import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { styled } from '@mui/material/styles';
import Moment from 'moment';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import { connect } from "react-redux";

import CircularProgress from '@mui/material/CircularProgress';
import { ListItemText } from '@mui/material';

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
const getIfToday = (startTime, endtime) => {
    const iscurrentDate = Moment(endtime).isSame(startTime, "day");
    if (iscurrentDate) {
        return startTime
    } else {
        return null
    }
}
const Div = styled(ListItemText)`
    .MuiTypography-root{
        font-size: 25px;
        font-weight: 600;
    }
`
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
           console.log("id user connected : ", id);
     
            if (id) {
                const { data } = await axios.get(`192.168.1.113:5000/rendezvous/schedule/78`)
                console.log("data: ",data);
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

   

    render() {
        const { start, end, title, events, loading, disabled } = this.state;

        if (loading) {
            return (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            )
        }
        const onPanelChange = (value, mode) => {
            console.log(value.format('YYYY-MM-DD'), mode);
          };
        return (
            <Container>         
                <Div>Appointments Calendar</Div>
                {/*Calendar*/}
                <div style={{padding:"2rem"}}>
                 <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    events={events}
                    loading={disabled}
                    locale="fr"
                   allDayText='Heure'
                />
                </div>
                   {/*Calendar*/}

            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(withSnackbar(AddSchedule))
