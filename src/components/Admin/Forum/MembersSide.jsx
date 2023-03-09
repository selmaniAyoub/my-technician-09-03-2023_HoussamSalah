import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import GroupsIcon from '@mui/icons-material/Groups';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { connect } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import en from "../../../translation/en.json";
import fr from "../../../translation/fr.json";
import { withNamespaces } from "react-i18next";
import i18n from "../../../translation/i18n";
import { compose } from "recompose";




const StyledList = styled(List)`
    margin: 0 !important;
    padding: 0 !important;
`

const ListHeaderText = styled(ListItemText)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .MuiListItemText-primary{
        font-weight: bold;
    }
    .MuiListItemText-secondary{
        color: #1976d2;
        font-weight: bold;
        margin: 0;
    }
`

const StyledListItemText = styled(ListItemText)`
    margin-left: 10px;
`

const ListsContainer = styled('div')`
    max-height: 650px;
    overflow-y: auto;
`

const RedCircle = styled('span')`
    display block;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: #f00;
    margin-right: 10px;
`

const GreenCircle = styled('span')`
    display block;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: #44b700;
    margin-right: 10px;
`

const StatusDate = styled('div')`
    display flex;
    flex-direction: row;
    align-items: center;
`

const LoadingContainer = styled('div')`
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    min-height: 600px;
`

const EmptyContainer = styled('div')`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    min-height: 200px;
`

const EmptyText = styled(Typography)`
    font-size: 18px;
`

function MembersSide({ system, room, t }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const role = system?.user?.roles[0]?.role;

    useEffect(() => {
        setLoading(true)
        if (room && role === "admin") {
            axios.get(`http://192.168.1.113:5000/search/members/forum/${room}`)
                .then(res => {
                    if (res.data) {
                        setUsers(res.data)
                        setLoading(false)
                    }
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                })
        }

        if (!room && role !== "admin") {
            axios.get(`http://192.168.1.113:5000/search/members/forum/${role}`)
                .then(res => {
                    if (res.data) {
                        setUsers(res.data)
                        setLoading(false)
                    }
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                })
        }

    }, [system, room, role])

    return (
        <Card elevation={0} style={{ width: "100%", height: "100%" }}>
            <StyledList>
                <ListItem style={{ backgroundColor: "#e2ebff" }}>
                    <GroupsIcon color="primary" style={{ marginRight: 10 }} />
                    <ListHeaderText
                        primary={t('Membres')}
                        secondary={`${users.length}`}
                    />
                </ListItem>

                <ListsContainer>
                    {
                        loading ?
                            <LoadingContainer>
                                <CircularProgress />
                            </LoadingContainer>
                            :
                            users.length > 0 ?
                                users.map((m, i) => {
                                    return <SingleMember data={m} key={i} />
                                })
                                :
                                <EmptyContainer>
                                    <EmptyText variant="body1">{t("Il n'y a pas encore d'utilisateurs")}</EmptyText>
                                </EmptyContainer>
                    }
                </ListsContainer>
            </StyledList>
        </Card>
    )
}

const RenderDate = ({ createdAt }) => {
    const newDate = moment(createdAt, "DD/MM/yyyy HH:mm:ss").format("DD/MM/yyyy");

    return <span style={{ fontSize: 12, color: "#939393" }}>{newDate}</span>
}

const SingleMember = ({ data }) => {
    return (
        <div style={{ margin: "0 0 0 0" }}>
            <ListItem alignItems="center">
                <ListItemAvatar>
                    <Avatar sx={{ width: 56, height: 56 }} alt="user img" src={data.imageUrl} />
                </ListItemAvatar>
                <StyledListItemText
                    primary={
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography
                                sx={{ display: 'inline', fontWeight: "bold", fontSize: "1.1em", marginLeft: "10px" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {data.firstName} {data.lastName}
                            </Typography>
                            <StatusDate>
                                {
                                    data.status === "online" ?
                                        <GreenCircle />
                                        :
                                        <RedCircle />
                                }

                                <RenderDate createdAt={data.createdAt} />
                            </StatusDate>
                        </div>
                    }
                />
            </ListItem>
            <Divider />
        </div>
    )
}


const mapStateToProps = (state) => ({
    system: state.system
});

export default compose (connect(mapStateToProps),withNamespaces())(MembersSide)