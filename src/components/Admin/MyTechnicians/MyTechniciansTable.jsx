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
import { NavLink } from "react-router-dom";


function reOrderData(data) {
    return data.map((d, i) => (
        {
            id: d.id,
            technicianName: `${d.firstName} ${d.lastName}`,
            category: d.role,
            createdAt: d.createdAt,
            status: d.status,
            active: d.active,
            email: d.email,
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
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'Spécialité',
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
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'Créé à',
        canSort: false,
        minWidth: 170,
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Statut',
        canSort: false,
        minWidth: 170,
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
        return "Vérifié"
    } else {
        return "Non vérifié"
    }
}

const renderStatus = ({ status }) => {
    if (status === "offline") {
        return "Hors ligne"
    } else {
        return "En ligne"
    }
}

export default function TechniciansTable({ technicians, loading }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('technicianName');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
                                                id={labelId}
                                                scope="row"
                                            >
                                                <NavLink to={`/dashboard/praticien/${row.id}`}>{row.technicianName}</NavLink>
                                            </TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.category}</TableCell>
                                            <TableCell align="left">{renderIsActive({ active: row.active })}</TableCell>
                                            <TableCell align="left">{row.createdAt}</TableCell>
                                            <TableCell align="left">{renderStatus({ status: row.status })}</TableCell>
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