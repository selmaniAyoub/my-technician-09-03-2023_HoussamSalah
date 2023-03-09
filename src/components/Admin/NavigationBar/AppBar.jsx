import React, { useEffect, useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import { NavLink } from "react-router-dom"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Notification from '../Notification/Notification';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { translate } from 'react-i18next';
import { compose } from "recompose";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    boxShadow: "none",
    "& .MuiToolbar-root": {
        color: "#272727",
    },
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const RenderPathName = ({ location,t }) => {
    if (location.pathname === "/dashboard") {
       
        return t("Tableau de bord")
    }
    if (location.pathname === "/dashboard/appointments") {
        return t("Mes rendez-vous")
    }
    if (location.pathname === "/dashboard/forum") {
        return t("Forum")
    }
    if (location.pathname === "/dashboard/add-schedule") {
        return t("Ajouter à l'agenda")
    }
    if (location.pathname === "/dashboard/see-schedule") {
        return <tbody></tbody>("Schedules")
    }
    if (location.pathname === "/dashboard/profile") {
        return t("Profile")
    }
    if (location.pathname === "/dashboard/settings") {
        return t("Paramètres")
    }
    if (location.pathname === "/dashboard/edit-profile") {
        return t("Editer profile")
    }
    if (location.pathname === "/dashboard/edit-password") {
        return t("Changer mote de passe")
    }
    if (location.pathname === "/dashboard/add-schedule-user") {
        return t("Agenda")
    }
    
    return null;
}

const RenderName = ({ user }) => {
    const role = user?.roles[0]?.role || null;
    if (role === "pharmacie") {
        return user.name
    }

    return `${user.firstName} ${user.lastName}`;
}

const GreenCircle = styled('span')`
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 8px;
    background-color: #44b700;
    margin-right: 10px;
    position: absolute;
    right: -1px;
    top: 10px;
`

function AppBarNav(props, { t }) {
    const {
        open,
        handleDrawerOpen,
        location,
        theme,
        user,
        logoutUser,
        role,
        system
    } = props;
    const [notifications, setNotifications] = useState([]);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNotification, setAnchorElNotification] = useState(null);
    const openNotification = Boolean(anchorElNotification);
    const [loading, setLoading] = React.useState(true);

    const handleClickNotification = (event) => {
        setAnchorElNotification(event.currentTarget);
    };

    const handleCloseNotification = () => {
        setAnchorElNotification(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const addNotifications = (notif) => {
        if (Array.isArray(notif)) {
            setNotifications(notifications.concat(notif));
        } else {
            setNotifications(notifications.push(notif))
        }
    }

    const handleLogout = () => {
        handleCloseUserMenu()
        setLoading(true);
        logoutUser();
    }

    useEffect(() => {
        if (!system.loggedIn) {
            setLoading(false);
        }
        if (system.error || system.loggedIn) {
            setLoading(false);
        }
    }, [system])

    return (
        <AppBar position="fixed" open={open} enableColorOnDark>
            <Toolbar>
                <IconButton
                    color="primary"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                        [theme.breakpoints.down('sm')]: {
                            marginRight: '5px'
                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex', fontWeight: "bold" } }}
                    >
                        <RenderPathName location={location} t={props.t} />
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
                    {
                        role !== "client" ?
                            <IconButton
                                component={NavLink}
                                to={role === "admin" ? "/dashboard/forums" : "/dashboard/forum"}
                                sx={{
                                    mr: 2,
                                    [theme.breakpoints.down('sm')]: {
                                        marginRight: '5px'
                                    }
                                }}
                                size="large"
                                aria-label="show 4 new mails"
                                color="primary"
                            >
                                <MailIcon />
                                <GreenCircle />
                            </IconButton>
                            :
                            null
                    }

                    {
                        role !== "admin" ?
                            <IconButton
                                size="large"
                                aria-label="show new notifications"
                                color="primary"
                                sx={{
                                    mr: 2,
                                    [theme.breakpoints.down('sm')]: {
                                        marginRight: '5px'
                                    }
                                }}
                                onClick={handleClickNotification}
                            >
                                <Badge badgeContent={notifications.length} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            :
                            null
                    }

                    <MenuItem onClick={handleOpenUserMenu}>
                        <Avatar alt={RenderName({ user: user })} src={user.imageUrl}>
                            {
                                RenderName({ user: user })[0].toUpperCase()
                            }
                        </Avatar>
                        <ListItemText style={{ marginLeft: 8, textTransform: "capitalize" }}>
                            <RenderName user={user} />
                        </ListItemText>
                        <ListItemIcon style={{ minWidth: 20, marginLeft: 5 }}>
                            <ArrowDropDownIcon style={{ marginTop: 3 }} fontSize="small" />
                        </ListItemIcon>
                    </MenuItem>

                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem style={{ minWidth: 230 }} component={NavLink} to="/dashboard/profile" onClick={handleCloseUserMenu} >
                            <ListItemIcon>
                                <PersonIcon fontSize="small" />
                            </ListItemIcon>
                            {props.t('Mon Profile')}
                        </MenuItem>
                        <MenuItem style={{ minWidth: 230 }} component={NavLink} to="/dashboard/settings" onClick={handleCloseUserMenu}>
                            <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            {props.t('Paramètres')}
                        </MenuItem>
                        <MenuItem style={{ minWidth: 230 }} onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            {props.t('Se déconnecter')}
                        </MenuItem>
                    </Menu>

                    {
                        role !== "admin" ?
                            <Notification
                                anchorElNotification={anchorElNotification}
                                openNotification={openNotification}
                                handleCloseNotification={handleCloseNotification}
                                notifications={notifications}
                                addNotifications={addNotifications}
                            />
                            :
                            null
                    }

                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default compose (withNamespaces()) (AppBarNav);