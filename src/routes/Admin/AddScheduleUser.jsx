
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { connect } from "react-redux";
import Typography from '@mui/material/Typography';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
//import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { CircularProgress } from '@mui/material';

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
/*const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});*/
const LoadingContainer = styled('div')`
    display: flex;
    min-height: 500px;
    width: 100%;
    align-items: center;
    justify-content: center;
`
const events = [
	{
		title: "",
		allDay: true,
		start: null,
		end:null ,
	},
];
function ScheduleUser ({system}) {

      const [allEvents, setAllEvents] = useState(events);
	  const [loading, setLoading] = useState(true);
	useEffect(() => {
		const getAllColl = async () => {
			const id  = system.user.id;
		    console.log("id user connected : ", id);
			await axios
				.get(`http://192.168.1.113:5000/search/schedule/${id}`)
				.then((res) => {
					console.log(" Get All : ", res.data[0]);
					const data=res.data[0].session;
			            	if (data) {
				                const newData = data.map((d) => {
					              return {  
									title: d.title,  allDay: true ,
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

	if (loading) {
		return (
			<LoadingContainer>
				<CircularProgress />
			</LoadingContainer>
		)
	}
    return (
        <Container>
            <Header variant="h1">Agenda</Header>
		
	
        </Container>
		
    )
}
const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(ScheduleUser);
