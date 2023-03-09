import React from 'react'
import { styled } from '@mui/material/styles';
import { connect } from "react-redux";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DentistryIcon from '../../../assets/dentist.png';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import PharmacieIcon from '../../../assets/pharmacies-image.png';
import PsychologistIcon from '../../../assets/psychologist.png';
import VeterinaryIcon from '../../../assets/veterinary.png';
import PhysiotherapistIcon from '../../../assets/physiotherapist.png';
import TechnicianIcon from '../../../assets/doctor-image.png';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


const StyledBadgeDisc = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#f00',
        color: '#f00',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


const RoomName = styled(ListItemText)`
    .MuiListItemText-primary{
        font-size: 18px;
        font-weight: bold;
        text-transform: capitalize;
    }
`

const RenderAvatar = ({ user, room }) => {
    const role = room ? room : user?.roles[0].role;

    if (role === "medecin") {
        return <Avatar alt="Technician" src={TechnicianIcon} />
    }
    if (role === "kine") {
        return <Avatar alt="Physiotherapist" src={PhysiotherapistIcon} />
    }
    if (role === "dentiste") {
        return <Avatar alt="Dentist" src={DentistryIcon} />
    }
    if (role === "veterinaire") {
        return <Avatar alt="Veterinary" src={VeterinaryIcon} />
    }
    if (role === "psychologue") {
        return <Avatar alt="Psychologist" src={PsychologistIcon} />
    }
    if (role === "pharmacie") {
        return <Avatar alt="Pharmacie" src={PharmacieIcon} />
    }
    return null
}

function RoomAvatar(props) {
    const { connected, system, room } = props;

    return (
        <ListItem alignItems="center">
            <ListItemAvatar>
                {
                    connected ?
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <RenderAvatar room={room} user={system.user} />
                        </StyledBadge>
                        :
                        <StyledBadgeDisc
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <RenderAvatar room={room} user={system.user} />
                        </StyledBadgeDisc>
                }
            </ListItemAvatar>
            <RoomName
                primary={`${system.user.roles[0].role} Forum`}
            />
        </ListItem>
    )
}


const mapStateToProps = (state) => ({
    system: state.system
});

export default connect(mapStateToProps)(RoomAvatar)