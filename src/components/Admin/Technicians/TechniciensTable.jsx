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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from "react-router-dom";
import Alert from '@mui/material/Alert';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';


function reOrderData(data) {
    const newData = data.filter(getNonDeleted)
    function getNonDeleted(d) {
        return d.deleted === false;
    }
    return newData.map((d, i) => (
        {
            id: d.id,
            technicianName: `${d.firstName} ${d.lastName}`,
            speciality: d.speciality,
            createdAt: d.createdAt,
          
            active: d.active,
            email: d.email,
            banned: d.banned,
            confirmationToken: d.confirmationToken
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
        id: 'technicianName',
        numeric: false,
        disablePadding: false,
        label: 'Praticien',
        canSort: true,
        minWidth: 170,
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'E-mail',
        canSort: false,
        minWidth: 170,
    },
    {
        id: 'speciality',
        numeric: false,
        disablePadding: false,
        label: 'Sp??cialit??',
        canSort: false,
        minWidth: 170,
    }, {
        id: 'confirmationToken',
        numeric: false,
        disablePadding: false,
        label: 'ConfirmationToken',
        canSort: false,
        minWidth: 170,
    },
    {
        id: 'active',
        numeric: false,
        disablePadding: false,
        label: 'Compte',
        canSort: false,
        minWidth: 170,
    },
 

    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
        canSort: false,
        minWidth: 50,
    },
    {
        id: 'banned',
        numeric: false,
        disablePadding: false,
        label: '',
        canSort: false,
        minWidth: 150,
    }
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
                liste des praticiens
            </Typography>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const renderIsActive = ({ active }) => {
    if (active) {
        return "V??rifi??"
    } else {
        return "Non v??rifi??"
    }
}

const renderStatus = ({ status }) => {
    if (status === "offline") {
        return "Hors ligne"
    } else {
        return "En ligne"
    }
}

const RenderMenuItems = ({ rowMenu, handleUnbanned, handleRemove, handleBan ,handleConfirme}) => {
    if (rowMenu) {
        if (rowMenu.banned) {
            return (
                <>
                    <MenuItem onClick={handleUnbanned}>Unbanned</MenuItem>
                    <MenuItem onClick={handleRemove}>Supprimer</MenuItem>
                </>

            )
        }

        return (
            <>
                <MenuItem onClick={handleBan}>Ban</MenuItem>
                <MenuItem onClick={handleRemove}>Supprimer</MenuItem>
                <MenuItem onClick={handleConfirme}>Confirmer le compte</MenuItem>
                
            </>
        )
    }
    return null
}

export default function TechniciensTable({ technicians, handleRemoveUser, handleBan, handleUnban ,handleConfirmUser}) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('technicianName');
    const [page, setPage] = React.useState(0);
    const [rowMenu, setRowMenu] = React.useState(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [loading, setLoading] = React.useState(false);


    const handleMenuClick = (row) => (event) => {
        setRowMenu(row);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const rows = reOrderData(technicians)

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

    const handleBanned = () => {
        handleClose()
        setLoading(true)
        axios.post(`http://192.168.1.113:5000/admin/ban/${rowMenu.id}`)
            .then(res => {
                handleBan(rowMenu)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setAnchorEl(null);
                setLoading(false)
            })
    }

    const handleUnbanned = () => {
        handleClose()
        setLoading(true);
        axios.post(`http://192.168.1.113:5000/admin/unban/${rowMenu.id}`)
            .then(res => {
                handleUnban(rowMenu);
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setAnchorEl(null);
                setLoading(false)
            })
    }

    const handleRemove = () => {
       
        handleClose()
        setLoading(true);
        axios.post(`http://192.168.1.113:5000/admin/delete/${rowMenu.id}`)
            .then(res => {
               
                handleRemoveUser(rowMenu);
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }
    const handleConfirme = async () => {
        console.log(rowMenu)
        handleClose()
        setLoading(true);
        window.open('http://192.168.1.113:5000/accounts/enable?confirmation='+ rowMenu.confirmationToken)

        axios.post(`http://192.168.1.113:5000/auth/sendConfirmationMail`, rowMenu, {
          
        })
            .then(res => {
               
                if (res.data) {
                    handleConfirmUser(rowMenu);
                    console.log("confirmation mail is sent!")
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
               
            })

          console.log(rowMenu)
                
               
                setLoading(false)
        
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%', overflow: 'hidden', marginTop: "20px" }}>
            <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 640, overflowY: "auto" }}>
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
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
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
                                                <NavLink to={`/dashboard/praticien/${row.id}`}>{row.technicianName}</NavLink>
                                            </TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.speciality}</TableCell>
                                            <TableCell align="left">{row.confirmationToken}</TableCell>
                                            <TableCell align="left">{renderIsActive({ active: row.active })}</TableCell>
                                            
                                            <TableCell align="left">
                                                {
                                                    loading && row.id === rowMenu.id ?
                                                        <CircularProgress size={25} />
                                                        :
                                                        <IconButton disabled={loading} color="primary" aria-label="more icon" component="span" onClick={handleMenuClick(row)}>
                                                            <MoreHorizIcon />
                                                        </IconButton>
                                                }
                                            </TableCell>
                                            <TableCell align="left">
                                                {
                                                    row.banned ?
                                                        <Alert style={{ maxWidth: 120 }} severity="error">Banned</Alert>
                                                        :
                                                        null
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
                <RenderMenuItems rowMenu={rowMenu} handleUnbanned={handleUnbanned} handleRemove={handleRemove} handleBan={handleBanned} handleConfirme={handleConfirme} />
            </Menu>
        </Box>
    );
}