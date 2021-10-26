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
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import Fuse from "fuse.js";
import {deleteUser, getAllUsers} from "../../api/users";

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





export default function UserManagement() {




    const {searchTerm,setLoading} = useContext(AppContext)

    const [rows,setRows]=useState([])

    async function fetchAvailableUsers() {
        setLoading(true)
        const fetchedUsers = await getAllUsers()
        console.log("Fetched users: ")
        console.table(fetchedUsers)
        setRows(fetchedUsers)
        setLoading(false)
    }

    useEffect(async () => {
        await fetchAvailableUsers();
    },[])

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
            <p>There are {rows.length} users</p>
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
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.fullName}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.username}</StyledTableCell>
                            <StyledTableCell align="left">{row.role}</StyledTableCell>
                            <StyledTableCell align="left">{row.address}</StyledTableCell>
                            <StyledTableCell align="left">{row.phoneNumber}</StyledTableCell>
                            <StyledTableCell align="left">{<IconButton color="primary">
                                <EditIcon />
                            </IconButton>}
                            </StyledTableCell>
                            <StyledTableCell align="left">{<IconButton color="secondary" onClick={()=>{
                                setLoading(true)
                                deleteUser(row.id).then(() => fetchAvailableUsers()).finally(setLoading(false))
                                alert(`${row.fullName} is deleted from the database`)

                            }}>
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