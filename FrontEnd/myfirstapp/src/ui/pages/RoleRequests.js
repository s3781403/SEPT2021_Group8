import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {useContext, useEffect, useState} from "react";
import {approveRoleRequest, getAllRoleRequests, rejectRoleRequest} from "../../api/users";
import {AppContext} from "../../context/AppContext";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function RoleRequests() {


    const [rows, setRows] = useState([])

    const {setLoading} = useContext(AppContext)

    const fetchApprovalRequests = async () => {
        setLoading(true)
        const requests = await getAllRoleRequests()
        console.log("✅🛑 requests: ", requests)
        setRows(requests)
        setLoading(false)
    }

    useEffect(async () => {
        await fetchApprovalRequests();
    }, [])

    /*
    *
abn: null
address: "1234 test street"
confirmPassword: null
create_At: "2021-09-16T14:10:23.488+00:00"
fullName: "Aaron Fisher"
id: 1
password: "$2a$10$BKVoxgS.ycRJY4lEbdIrfOygMvYdlEhAqaI7Ooq387kVDsZMut4/m"
phoneNumber: "test"
role: "Seller"
roleRequested: "Seller"
update_At: "2021-10-22T17:01:44.496+00:00"
userID: 1
username: "ajfis3@gmail.com"
*
    *
    * */

    return (
        <div>
            <h1>Role Requests By Users</h1>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 500}} aria-label="customized table">
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
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.username}
                                </StyledTableCell>
                                <StyledTableCell align="left">Customer</StyledTableCell>
                                <StyledTableCell align="left">{row.roleRequested}</StyledTableCell>
                                <StyledTableCell align="left">{<IconButton color="success" style={{border: 'black'}}
                                                                           onClick={async () => {
                                                                               setLoading(true)
                                                                               await approveRoleRequest(row.id)
                                                                               setLoading(false)
                                                                               alert("Successfully Approved")
                                                                               await fetchApprovalRequests()
                                                                           }}>
                                    <CheckCircleIcon/>
                                </IconButton>}
                                </StyledTableCell>
                                <StyledTableCell align="left">{<IconButton onClick={async () => {
                                    setLoading(true)
                                    await rejectRoleRequest(row.id)
                                    setLoading(false)
                                    alert("Successfully Rejected Request")
                                    await fetchApprovalRequests()
                                }} color="secondary">
                                    <CancelIcon/>
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