import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(username, currentRole,requestedRole) {
    return {username, currentRole,requestedRole };
}

const rows = [
    createData('abc@abc.com', 'Customer', 'Seller'),
    createData('xyz@xyz.com',  'Customer','Seller'),
    createData('pqr@pqr.com', 'Customer', 'Seller'),
    createData('abc@test.com',  'Customer','Seller'),
    createData('john@j.com',  'Customer','Seller')
];

export default function RoleRequests() {
    return (
        <div>
            <h1>Role Requests By Users</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Username</StyledTableCell>
                        <StyledTableCell align="left"> Current Role</StyledTableCell>
                        <StyledTableCell align="left"> Requested Role</StyledTableCell>
                        <StyledTableCell align="left">Approve</StyledTableCell>
                        <StyledTableCell align="left">Reject</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.username}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.currentRole}</StyledTableCell>
                            <StyledTableCell align="left">{row.requestedRole}</StyledTableCell>
                            <StyledTableCell align="left">{<IconButton color="success" style={{border:'black'}}>
                                <CheckCircleIcon />
                            </IconButton>}
                            </StyledTableCell>
                            <StyledTableCell align="left">{<IconButton color="secondary">
                                <CancelIcon />
                            </IconButton>}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}