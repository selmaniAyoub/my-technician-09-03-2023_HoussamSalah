import React, { Component } from 'react';
import SockJsClient from 'react-stomp';
import { connect } from "react-redux";
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Menu from '@mui/material/Menu';
import moment from 'moment';
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';


const LoadingContainer = styled('div')`
    display: flex;
    min-height: 100px;
    min-width: 250px;
    align-items: center;
    justify-content: center;
`

const EmptyContent = styled('div')`
    min-width: 250px;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
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

const StyledList = styled(List)`
    width: 100%;
    max-width: 400px;
`

const SeeMoreContainer = styled('div')`
    display: flex;
    justify-content: end;
    padding: 0 16px;
    margin: 0;
`

const SeeMore = styled(Button)`
    text-decoration: none;
`

const ReturnDate = ({ createdAt }) => {
    const daysAgo = moment(createdAt, "DD/MM/yyyy HH:mm:ss").fromNow();

    if (daysAgo) {
        return daysAgo;
    }

    return createdAt;
}

const ListNotification = ({ notifications, handleCloseNotification }) => {
    if (notifications && notifications.length === 0) {
        return (
            <EmptyContent>
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    No Notifications found
                </Typography>
            </EmptyContent>
        )
    }

    return (
        <StyledList sx={{ bgcolor: 'background.paper' }}>
            <SeeMoreContainer>
                <SeeMore onClick={() => handleCloseNotification()} variant="text" color="primary" component={NavLink} to="/dashboard/notifications">See all</SeeMore>
            </SeeMoreContainer>
            {
                notifications.map((notif, i) => (
                    <ListItem onClick={() => handleCloseNotification()} component={NavLink} to={`/dashboard/appointments/${notif.idRdv}`} alignItems="center" button key={i}>
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
                    </ListItem>
                ))
            }
        </StyledList>
    )
}

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            loading: true,
        }
    }

    async componentDidMount() {
        const { user } = this.props.system

        if (user) {
            try {
                this.setState({ loading: true })
                const { data } = await axios.get(`http://192.168.1.113:5000/notifications/${user.id}/0/5`);
                if (data) {
                    this.props.addNotifications(data)
                }
                this.setState({ loading: false })
            } catch (err) {
                console.log(err)
                this.setState({ loading: false })
            }
        }
    }

    onNotificationReceive = (notif, topic) => {
        this.props.addNotifications(notif)
    }

    render() {
        const { loading } = this.state;
        const { anchorElNotification, openNotification, handleCloseNotification, notifications } = this.props;
        const { user } = this.props.system;

        return (
            <>
                {/* <SockJsClient
                    url='http://192.168.1.113:5000/notification'
                    topics={[`/topic/notifications/${user.username}`]}
                    onMessage={this.onNotificationReceive}
                    ref={(client) => { this.clientRef = client }}
                    onConnect={() => { this.setState({ connected: true }) }}
                    onDisconnect={() => { this.setState({ connected: false }) }}
                    onConnectFailure={(err) => console.log(err)}
                    debug={false}
                /> */}
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorElNotification}
                    keepMounted={false}
                    open={openNotification}
                    onClose={handleCloseNotification}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        style: {
                            transform: 'translateY(40px)',
                        }
                    }}
                >
                    {
                        loading ?
                            <LoadingContainer>
                                <CircularProgress />
                            </LoadingContainer>
                            :
                            <ListNotification handleCloseNotification={handleCloseNotification} notifications={notifications} />
                    }
                </Menu>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(Notification);
