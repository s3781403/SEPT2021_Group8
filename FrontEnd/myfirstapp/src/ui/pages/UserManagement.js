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
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import Fuse from "fuse.js";

// Fuse
// Fuzzy search
//
const fuseOptions = {
    keys: "name,username,role,address,phoneNo".split(",")
};

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

function createData(name, username, role, address, phoneNo) {
    return { name, username, role, address, phoneNo };
}

const rows = [
    createData('abc sellers', 'abc@abc.com', 'Seller', '24 abc street', '0456789321'),
    createData('xyz sellers', 'xyz@xyz.com', 'Seller', '4 xyz street', '0456789321'),
    createData('pqr sellers', 'pqr@pqr.com', 'Seller', '2 pqr street', '0456909321'),
    createData('abc test', 'abc@test.com', 'Customer', '240 efg street', '0499789321'),
    createData('john wo', 'john@wo.com', 'Customer', '74 mno street', '0450089321')

];

export default function UserManagement() {



    const {searchTerm} = useContext(AppContext)

    const getFilteredUsers = () => {
        const searching = searchTerm.length >= 2
        if (!searching) return rows
        const fuzzy = new Fuse(rows, fuseOptions)
        const fuseResult = fuzzy.search(searchTerm)
        return fuseResult.map(match => match.item)
    }

    const filteredUsers = getFilteredUsers()

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Full Name</StyledTableCell>
                        <StyledTableCell align="left">Username</StyledTableCell>
                        <StyledTableCell align="left">Role</StyledTableCell>
                        <StyledTableCell align="left">Address</StyledTableCell>
                        <StyledTableCell align="left">Phone Number</StyledTableCell>
                        <StyledTableCell align="left">EDIT</StyledTableCell>
                        <StyledTableCell align="left">DELETE</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.username}</StyledTableCell>
                            <StyledTableCell align="left">{row.role}</StyledTableCell>
                            <StyledTableCell align="left">{row.address}</StyledTableCell>
                            <StyledTableCell align="left">{row.phoneNo}</StyledTableCell>
                            <StyledTableCell align="left">{<IconButton color="primary">
                                <EditIcon />
                            </IconButton>}
                            </StyledTableCell>
                            <StyledTableCell align="left">{<IconButton color="secondary">
                                <DeleteForeverIcon />
                            </IconButton>}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}