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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector } from 'react-redux';

function reOrderData(data ) {
   // console.log(" user Appointments data : ", data)
    return data.map((d, i) => (
        {    
            id: d.id,
            startTime: d.startDate,
            endTime: d.endDate,
            status: d.status,
            subject: d.subject,
            text: d.message,
            docName:d.userName,
            ville: d.ville,
            address: d.address,
            email: d.email,
            phoneNumber: d.phoneNumber,
            docId: d.id
        
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
        id: 'docName',
        numeric: false,
        disablePadding: false,
        label: 'Praticien',
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
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Liste des rendez-vous
            </Typography>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
export default function EnhancedTable({ appointments },{system} ) {
  //  console.log(" My appointments: ",appointments);
   // console.log(" system : ",system );
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('docName');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let navigate = useNavigate();
    const rows = reOrderData(appointments)
    let userConnected = localStorage.getItem("user");
    userConnected = JSON.parse(userConnected);
   // console.log("userConnected : ",userConnected);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
// React.useEffect(() => {
//     return () => {
//         axios.get(`http://192.168.1.113:5000/admin/single/client/${appointments[0].clientId}`)
//            .then((res) => {
//            console.log(" client Data : ", res.data);	
//            })
//          .catch((err) => {
//             console.log(err.message);
   
//            }); 
//     };
// }, [appointments])
    
    return (
        <Box sx={{ width: '100%', overflow: 'hidden', marginTop: "20px" }}>
            <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440, overflowY: "auto" }}>
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        size={'medium'}
                    >
                         <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        /> 
                        <TableBody>
                         {/*<h1>Mes </h1>
                            if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy))*/} 
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
                                            >
                                               {row.docName}
                                            </TableCell>
                                            <TableCell align="left">{row.startTime}</TableCell>
                                            <TableCell align="left">{row.endTime}</TableCell>
                                            <TableCell align="left">{row.status}</TableCell>
                                            {/* 

                                               <TableCell align="left">{row.phoneNumber}</TableCell>
                                               <TableCell align="left">{row.ville}</TableCell>
                                               <TableCell align="left">{row.address}</TableCell> 

                                            */}
                                            <TableCell align="left">
                                                <IconButton color="primary" aria-label="more icon" component="span" onClick={() => navigate(`/dashboard/appointments/${row.id}`)}>
                                                    <VisibilityIcon />
                                                </IconButton>
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
        </Box>
    );
}