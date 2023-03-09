import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from "react-router-dom"


const Container = styled('div')`
    display: flex;
    width: 100%;
    justify-content: center;
    max-height: calc(100vh - 64px);
    @media only screen and (max-width: 600px){
        max-height: calc(100vh - 56px)
    }
`

const Card = styled(Paper)`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    max-width: 800px;
    overflow-y: auto;
    padding-bottom: 10px;
    min-width: 400px;
    margin: 15px 0 2px 0;
    @media only screen and (max-width: 900px){
        width: 60%;
    }
    @media only screen and (max-width: 500px){
        width: 100%;
        margin: 10px;
        min-width: 250px;
    }
`

const NotificationTitle = styled(Typography)`
    font-size: 2em;
    font-weight: bold;
    color: #3c3c3c;
    letter-spacing: 0.5px;
    margin: 20px;
`

const StyledList = styled(List)`
    width: 100%;
`

const StyledListItemText = styled(ListItemText)`
    margin: 0;
    .MuiListItemText-primary{
        font-size: 18px;
        margin: 0;
        font-weight: bold;
    }
    .MuiListItemText-secondary{
        margin-top: 8px;
        color: #1975d2;
        font-size: 12px;
        font-weight: bold;
    }
`

const StyledListItemContent = styled(ListItemText)`
    margin: 0;
    .MuiListItemText-secondary{
        margin: 0;
    }
`

const ContentList = styled('div')`
    display: flex;
    flex-direction: column;
`

const StyledListItem = styled(ListItem)`
    @media only screen and (max-width: 500px){
        padding: 10px 0;
    }
`

const LoadingContainer = styled('div')`
    display: flex;
    min-height: 100px;
    min-width: 250px;
    align-items: center;
    justify-content: center;
    height: 100%;
`

const ReturnDate = ({ createdAt }) => {
    const daysAgo = moment(createdAt, "DD/MM/yyyy HH:mm:ss").fromNow();

    if (daysAgo) {
        return daysAgo;
    }

    return createdAt;
}

function Notifications(props) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const { user } = props.system;

        if (user) {
            axios.get(`http://192.168.1.113:5000/notifications/${user.id}/0/10`)
                .then(res => {
                    setNotifications(res.data)
                    setloading(false)
                })
                .catch(err => {
                    console.log(err)
                    setloading(false)
                })
        } else {
            setloading(false)
        }
    }, [props])

    return (
        <Container>
            <Card>
                <NotificationTitle>Notifications</NotificationTitle>
                {
                    loading ?
                        <LoadingContainer>
                            <CircularProgress />
                        </LoadingContainer>
                        :
                        <StyledList sx={{ bgcolor: 'background.paper' }}>
                            {
                                notifications.map((notif, i) => (
                                    <StyledListItem component={NavLink} to={`/dashboard/appointments/${notif.idRdv}`} alignItems="center" button key={i}>
                                        <ListItemAvatar style={{ marginRight: 5, padding: 8 }}>
                                            <Avatar sx={{ width: 60, height: 60 }} alt="Remy Sharp" src={notif.photoUrl} />
                                        </ListItemAvatar>
                                        <ContentList>
                                            <StyledListItemText
                                                primary={notif.title}
                                            />
                                            <StyledListItemContent secondary={notif.content} />
                                            <StyledListItemText
                                                secondary={<ReturnDate createdAt={notif.createdAt} />}
                                            />
                                        </ContentList>
                                    </StyledListItem>
                                ))
                            }
                        </StyledList>
                }
            </Card>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(Notifications);