import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiDrawer from '@mui/material/Drawer';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { connect } from "react-redux";
import { logoutUser } from '../../../thunks'
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import CssBaseline from '@mui/material/CssBaseline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation } from "react-router";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AppBar from './AppBar';
import HomeIcon from '@mui/icons-material/Home';
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { translate } from 'react-i18next';
import { compose } from "recompose";

import EventRepeatIcon from '@mui/icons-material/EventRepeat';
const StyledListItemText = styled(ListItemText)`
    .MuiTypography-root{
        font-weight: bold;
    }
`

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const RenderClientLinks = ({role,t}) => {
    if (role === "client") {
        return (
            <List>
                <ListItem component={NavLink} to="/dashboard/add-schedule-user" button>
                    <ListItemIcon>
                        <EventRepeatIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={t("Agenda")} />
                </ListItem>
                <ListItem component={NavLink} to="/dashboard/appointments" button>
                    <ListItemIcon>
                        <CalendarTodayIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={t("Mes rendez-vous")} />
                </ListItem>
                <ListItem component={NavLink} to="/dashboard/my-technicians" button>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={t("Mes techniciens")} />
                </ListItem>
           
            </List>
        )
    }

    return null
}

const RenderPersoLinks = ({ role,t }) => {
    if (role !== "client" && role !== "admin") {
        return (
            <List>
                <ListItem component={NavLink} to="/dashboard/appointments" button>
                    <ListItemIcon>
                        <CalendarTodayIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={t("Mes rendez-vous")} />
                </ListItem>
                <ListItem component={NavLink} to="/dashboard/add-schedule" button>
                    <ListItemIcon>
                        <AddCircleIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={t("Ajouter à l'agenda")} />
                </ListItem>
                <ListItem component={NavLink} to="/dashboard/see-schedule" button>
                    <ListItemIcon>
                        <EventRepeatIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={t("Agenda")} />
                </ListItem>
                <ListItem component={NavLink} to="/dashboard/my-clients" button>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={t("Mes clients")} />
                </ListItem>
                <ListItem component={NavLink} to="/dashboard/forum" button>
                    <ListItemIcon>
                        <ChatIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={t("Forum")} />
                </ListItem>
            </List>
        )
    }

    return null
}

const RenderAdminLinks = ({ role,t }) => {
    if (role === "admin") {
        return (
            <List>
                <ListItem component={NavLink} to="/dashboard/users" button>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={t("Clients")}/>
                </ListItem>
                <ListItem component={NavLink} to="/dashboard/technicians" button>
                    <ListItemIcon>
                        <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={t("Technicians")}/>
                </ListItem>
                <ListItem component={NavLink} to="/dashboard/techniciensNonConfirmer" button>
                    <ListItemIcon>
                        <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={t("Confirm accounts")} />
                </ListItem>
                <ListItem component={NavLink} to="/dashboard/forums" button>
                    <ListItemIcon>
                        <ChatIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={t("Forums")}/>
                </ListItem>
            </List>
        )
    }

    return null
}

function NavigationBar(props, { t }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const { user } = props.system;
    const role = props.system.user?.roles[0]?.role || null;

    const location = useLocation();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const toggleDrawer =
        (event) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event).key === 'Tab' ||
                    (event).key === 'Shift')
            ) {
                return;
            }

            setOpen(false);
        };

    const SideList = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <Toolbar />
            <Divider />
            <List>
                <ListItem component={NavLink} to="/" button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={props.t("Accueil")} />
                </ListItem>
                <ListItem component={NavLink} to="/dashboard" button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={props.t("Tableau de bord")} />
                </ListItem>
            </List>
            <Divider />
            <RenderClientLinks role={role} t={props.t} />
            <RenderPersoLinks role={role} t={props.t} />
            <RenderAdminLinks role={role} t={props.t} />
            <Divider />
            <List>
                {
                    role !== "admin" ?
                        <ListItem component={NavLink} to="/dashboard/profile" button>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <StyledListItemText primary={props.t("Mon Profil")} />
                        </ListItem>
                        :
                        null
                }
                <ListItem component={NavLink} to="/dashboard/settings" button>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={props.t("Paramètres")} />
                </ListItem>
                <ListItem onClick={() => props.logoutUser()} button>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <StyledListItemText primary={props.t("Se déconnecter")} />
                </ListItem>
            </List>
        </Box>
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar
                theme={theme}
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                location={location}
                user={user}
                logoutUser={props.logoutUser}
                role={role}
                system={props.system}
            />

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <SideList />
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: "0",
                    backgroundColor: "#f6f7fb",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    overflow: "hidden",
                    minHeight: "100vh",
                    maxWidth: `calc(100% - (${theme.spacing(7)} + 1px))`,
                    [theme.breakpoints.up('sm')]: {
                        width: `calc(${theme.spacing(9)} + 1px)`,
                    },
                    [theme.breakpoints.down('sm')]: {
                        padding: "0",
                    },
                }}
            >
                <DrawerHeader />
                {props.children}
            </Box>
        </Box>
    )
}

const mapStateToProps = (state) => ({
    system: state.system
});

// export default connect(mapStateToProps, { logoutUser })(NavigationBar)
export default compose (withNamespaces(), connect(mapStateToProps, { logoutUser }))(NavigationBar);