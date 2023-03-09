import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { visuallyHidden } from '@mui/utils';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { Alert } from '@mui/material';
import { useEffect } from 'react';
import Appointments from './Appointments';

const IconContainer = styled('div')`
    padding: 8px;
`


function reOrderData(data) {
   // console.log("1.: ",data);
    return data.map((d, i) => (
        {
            id: d.id,
            startTime: d.startDate,
            endTime: d.endDate,
            status: d.status,
            subject: d.subject,
            text: d.message,
            clientName: d.userName,
            ville: d.ville,
            address: d.address,
            email: d.email,
            phoneNumber: d.phoneNumber,
        }
    ))
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'clientName',
        numeric: false,
        disablePadding: false,
        label: 'Client',
        canSort: true,
        minWidth: 100,
    },
    {
        id: 'startDate',
        numeric: false,
        disablePadding: false,
        label: 'Start date',
        canSort: false,
        minWidth: 100,
    },
    {
        id: 'endDAte',
        numeric: false,
        disablePadding: false,
        label: 'End date',
        canSort: false,
        minWidth: 100,
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
        canSort: false,
        minWidth: 100,
    },

    // {
    //     id: 'phoneNumber',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'Phone number',
    //     canSort: false,
    //     minWidth: 100,
    // },
    // {
    //     id: 'ville',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'Ville',
    //     canSort: false,
    //     minWidth: 100,
    // },
    // {
    //     id: 'address',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'Address',
    //     canSort: false,
    //     minWidth: 100,
    // },

    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
        canSort: false,
        minWidth: 50,
    },
];

function TableHeaderSorted({ orderBy, order, createSortHandler }) {
    return (
        headCells.map((headCell) => {
            if (headCell.canSort) {
                return (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ minWidth: headCell.minWidth }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                )
            } else {
                return (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        style={{ minWidth: headCell.minWidth }}
                    >
                        {headCell.label}
                    </TableCell>
                )
            }
        })
    )
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableHeaderSorted
                    createSortHandler={createSortHandler}
                    order={order}
                    orderBy={orderBy}
                />
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable({ appointments }) {
     const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('clientName');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rowMenu, setRowMenu] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [disabled, setDisabled] = React.useState(false);
    const [message, setMessage] = React.useState("")
    const [messageErr, setMessageErr] = React.useState("")
    const [timer, setTimer] = React.useState(false);
    let navigate = useNavigate();

    const open = Boolean(anchorEl);

    const rows = reOrderData(appointments);
    useEffect(() => {
   //  console.log("appointments = ",appointments)
    }, [])
    
    
    const handleMenuClick = (row) => (event) => {
        setRowMenu(row);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleConfirm = async () => {
        try {
            setDisabled(true)
           // console.log(rowMenu.id);
            const { data } = await axios.post(`http://192.168.1.113:5000/rendezvous/AccepterRefuser/${rowMenu.id}/accepter` )
         //   console.log("data API Confirm :",data  );    
           setDisabled(false)
           setMessage(data)
           setTimer(true);
           setTimeout(() => {
               setTimer(false);
           }, 3000);
  
        } catch (err) {
            console.log(err.message) ;
            setDisabled(false)
            setMessage("")
            setMessageErr("server error")
            setTimer(true);
			setTimeout(() => {
				setTimer(false);
			}, 3000);
        }
        handleClose();
    }

    const handleCancel = async () => {
        try {
            setDisabled(true) 
   //         console.log("rowMenu.id : ",rowMenu.id);
            const { data } = await axios.post(`http://192.168.1.113:5000/rendezvous/AccepterRefuser/${rowMenu.id}/refuser`)
        //   console.log("data API Cancel  :",data  );    
           setDisabled(false)
           setMessage(data)
           setTimer(true);
           setTimeout(() => {
               setTimer(false);
           }, 3000)
         //  this.props.enqueueSnackbar(`${data}`, { variant: "success", action: this.action });
        } catch (err) {
              console.log(err.message) ;
              setDisabled(false);
              setMessage("")
              setMessageErr("server error")
              setTimer(true);
              setTimeout(() => {
                  setTimer(false);
              }, 3000);
          //    this.props.enqueueSnackbar("server error", { variant: "error", action: this.action });
         
        }
        handleClose();
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
   
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    return (
        
        <Box sx={{ width: '100%', overflow: 'hidden', marginTop: "20px" }}>
             
        {message && timer && ( <Alert variant="filled" severity="success">{message}  </Alert>)}
        {messageErr && timer && (<Alert variant="filled" severity="error"> {messageErr}</Alert> )}
            <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440, overflowY: "auto" }}>
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                align="left"
                                               
                                            >
                                                {row.clientName}
                                            </TableCell>
                                            <TableCell align="left">{row.startTime}</TableCell>
                                            <TableCell align="left">{row.endTime}</TableCell>
                                            <TableCell align="left">{row.status || "pending"}</TableCell>
                                            {/*
                                                <TableCell align="left">{row.phoneNumber}</TableCell>
                                                <TableCell align="left">{row.ville}</TableCell>
                                                <TableCell align="left">{row.address}</TableCell> 
                                            */}
                                            <TableCell align="left">
                                                {
                                                    row.status === "en cours" ?
                                                        <IconButton disabled={disabled} color="primary" aria-label="more icon" component="span" onClick={handleMenuClick(row)}>
                                                            {
                                                                disabled ?
                                                                    <CircularProgress style={{ width: 24 }} size="small" />
                                                                    :
                                                                    <MoreHorizIcon />
                                                            }
                                                        </IconButton>
                                                        :
                                                        row.status === "confirmed" ?
                                                            <IconContainer>
                                                                <CheckBoxIcon style={{ color: "#28cf25" }} />
                                                            </IconContainer>
                                                            :
                                                            <IconContainer>
                                                                <DoDisturbAltIcon style={{ color: "#f00" }} />
                                                            </IconContainer>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 40]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleConfirm}>Confirmer</MenuItem>
                <MenuItem onClick={handleCancel}>Cancel</MenuItem>
                <MenuItem onClick={() => navigate(`/dashboard/appointments/${rowMenu.id}`)}>Voir plus</MenuItem>
            </Menu>
       

        </Box>
    );
}