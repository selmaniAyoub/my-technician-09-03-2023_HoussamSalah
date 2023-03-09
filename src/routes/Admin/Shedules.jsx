import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { connect } from "react-redux";
import Typography from '@mui/material/Typography';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

//import "react-big-calendar/lib/css/react-big-calendar.css";
//import "react-datepicker/dist/react-datepicker.css";
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';
import moment from "moment";

//const localizerr = Calendar.momentLocalizer(moment);



const locales = {
	"en-US": require("date-fns/locale/en-US"),
};
const Container = styled('div')`
    margin: 20px 0;
    @media only screen and (max-width: 900px){
        margin-top: 10px;
    }
    padding: 20px;
    @media only screen and (max-width: 600px){
        padding: 8px;
    }  
`
const Header = styled(Typography)`
    font-size: 40px;
    font-weight: 600;
    color: #373737;
    margin-top: 20px;
    margin-bottom: 20px;
    @media only screen and (max-width: 900px){
        font-size: 30px;
    }
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


const DayEvents = ({ events }) => (
    <ul>
      {events.map(event => (
        <li key={event.id}>{event.title}</li>
      ))}
    </ul>
  );

const events = [
	{
		title: "",
		allDay: true,
		start: null,
		end:null ,
	},
];




function Schedules ({system}) {
	const navigate = useNavigate();
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);

/*     const handleEventClick = event => {
        console.log("event =",event)
      const selectedDate = moment(event.start).format("YYYY-MM-DD");
      const selectedDateEvents = allEvents.filter(
        e => moment(e.start).format("YYYY-MM-DD") === selectedDate 
        
      );
      console.log(" === " ,selectedDate);
      console.log(" ====== " ,events);
      setSelectedDateEvents(selectedDateEvents);
    }; */
  
	
	
	// const [allEvents, setAllEvents] = useState(events);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const { user: userSy } = system;
    //     console.log(system);
    //     const getAllSH= async () => {
    //             try {
    //                 const { id } = this.props?.system?.user;
    //                 console.log("id user connected : ", id);
                   
    //                     const { data } = await axios.get(`http://192.168.1.113:5000/rendezvous/schedule/${id}`);
    //                     console.log(data);
    //                     if (data) {
    //                         const newData = data.map((d) => {
    //                             return {
    //                                 start: Moment(d.startDate, "DD/MM/yyyy HH:mm:ss").format(),
    //                                 end: Moment(d.endDate, "DD/MM/yyyy HH:mm:ss").format(),
    //                                 title: d.title,
    //                                 allDay: false
    //                             }
    //                         })
        
    //                         this.setState({
    //                             loading: false,
    //                             events: [...this.state.events, ...newData]
    //                         })
    //                     }
               
    //             } catch (err) {
    //                 console.log(err)
    //                 this.setState({ loading: false })
    //             }
    //         }
    //         getAllSH()
    // }, [system])
	//const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
      const [allEvents, setAllEvents] = useState(events);
	  const [loading, setLoading] = useState(true);
	  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
      
      const eventPropGetter = (event) => {
        let newStyle = {
          backgroundColor: event.start < new Date() ? 'grey' : '',
          textDecoration: event.start < new Date() ?'line-through' : "",
          color: 'white',
          borderRadius: "5px",
          border: "none"
        }}
      
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
                    
                                title: d.title+" à " +d.startDate.substring(d.startDate.indexOf(" ")+1),  allDay: true ,
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
      useEffect(() => {

		getAllColl();
	}, [system.user.id]);
	// function handleAddEvent() {
	// 	setAllEvents([...allEvents, newEvent]);
	// }
	if (loading) {
		return (
			<LoadingContainer>
				<CircularProgress />
			</LoadingContainer>
		)
	}
    return (
        <Container>
            <Header variant="h1">Mon emploi du temps</Header>
            
     
      

			    <Calendar
				     localizer={localizer}
				     events={allEvents}
				     startAccessor="start"
				     endAccessor="end"
					// onSelectEvent={handleEventClick} 
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
