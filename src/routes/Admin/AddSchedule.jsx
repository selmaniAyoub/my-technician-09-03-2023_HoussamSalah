import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { connect } from "react-redux";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { CircularProgress, TextField } from '@mui/material';
import {  LoadingButton } from '@mui/lab';
import Moment from 'moment';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import { DateTimePicker } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'






const locales = {
	"en-US": require("date-fns/locale/en-US"),
};

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

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});
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


const events = [
	{
		title: "",
		allDay: true,
		start: null,
		end:null ,
	},
];
function Schedules ({system}) {
      const [allEvents, setAllEvents] = useState(events);
	  const [loading, setLoading] = useState(true);


      
const [event, setEvent] = useState({
    "title": "",
    "allDay": true,
    "start": null,
    "end":null ,
})

console.log(event)
;

      const  handleChange = name => e => {
        setEvent({...event, [name]: e.target.value });
        console.log(" eventttttt ===",event.target.value)
    }
  const  handleChangeTime = name => value => {
    setEvent({...event, [name]: value });
    console.log(" time ===",event)
    }

	useEffect(() => {
		const getAllColl = async () => {
			const id  = system.user.id;
		    console.log("id user connected : ", id);
           
			await axios
				.get(`http://192.168.1.113:5000/rendezvous/schedule/${id}`)
				.then((res) => {
					console.log(" Get All : ", res.data[0]);
					const data=res.data[0].session;
			            	if (data) {
				                const newData = data.map((d) => {
					              return {  
									title: d.title +" à " +d.startDate.substring(d.startDate.indexOf(" ")+1),  allDay: true ,
				                    start:new Date(d.startDate),
					                end: new Date(d.endDate)
					                }
					              })		
						        console.log("newData: ",newData  );
				                setAllEvents(newData)
					        }
					setLoading(false);
				})
				.catch((err) => {
					console.log(err.message);
					setLoading(false);
				});
		};
		getAllColl();
	}, [system.user.id]);



    const handleSubmit = (e) => {
     
        e.preventDefault();
        const  user  = system.user;
      
        const data = {
            startDate: Moment(event.start).format("MM/DD/yyyy HH:mm:ss"),
            endDate: Moment(event.end).format("MM/DD/yyyy HH:mm:ss"),
            title: event.title
        }
       console.log("data = ", data);
        if (user.id) {
          
            axios.post(`http://192.168.1.113:5000/schedule/add/${user.id}`, data, {
             
            })
                .then(res => {
             console.log("res.data = ", res);
             console.log("session ajouté");
                    if (res.data) {
                       allEvents.push({
                                start: Moment(res.data.start).format(),
                                end: Moment(res.data.end).format(),
                                title: res.data.title,
                                allDay: false
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ disabled: false })
                })
        }
    }  


    const getIfToday = (startTime, endtime) => {
        const iscurrentDate = Moment(endtime).isSame(startTime, "day");
        if (iscurrentDate) {
            return startTime
        } else {
            return null
        }
    }
	
	if (loading) {
		return (
			<LoadingContainer>
				<CircularProgress />
			</LoadingContainer>
		)
	}
    const eventPropGetter = (event) => {
        let newStyle = {
          backgroundColor: event.start < new Date() ? 'grey' : '',
          textDecoration: event.start < new Date() ?'line-through' : "",
          color: 'white',
          borderRadius: "5px",
          border: "none"
        };
    
        return {
          className: "",
          style: newStyle
        };
      };
    
    return (
        <Container>
        <SessionContainer onSubmit={e=>{handleSubmit(e)}}>
            <FieldContainer>
                <TextField
                    value={event.title}
                    id="outlined-basic"
                    label="Nom de la session"
                    variant="outlined"
                    onChange={handleChange("title")}
                    required
                  
                />
            </FieldContainer>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FieldContainer>
                    <DateTimePicker
                        minDate={new Date()}
                        minTime={getIfToday(new Date(), )}
                        label="start time"
                        value={event.start}
                       onChange={handleChangeTime("start")}
                        renderInput={(params) => <TextField {...params} />}
                      
                    />
                </FieldContainer>
                <FieldContainer>
                    <DateTimePicker
                        label="end time"
                        value={event.end}
                        onChange={handleChangeTime("end")}
                        renderInput={(params) => <TextField {...params} />}
                        
                    />
                </FieldContainer>
                <FieldContainer>
                    <AddBtn  type="submit" variant="contained">
                        Prendre un rendez-vous
                    </AddBtn>
                </FieldContainer>
            </LocalizationProvider>
        </SessionContainer>
		<Calendar
				     localizer={localizer}
				     events={allEvents}
				     startAccessor="start"
				     endAccessor="end"
				     style={{ height: 500, margin: "30px" }}
                     eventPropGetter={eventPropGetter}
		/>
	
        </Container>
		
    )
}
const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(Schedules);
