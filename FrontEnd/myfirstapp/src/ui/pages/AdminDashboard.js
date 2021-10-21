import PeopleIcon from '@mui/icons-material/People';
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Box from "@mui/material/Box";
import React, {memo, useMemo, useState} from "react";
import BookManagement from "../components/AdminDashboardComp/BookManagement";

function UserManagement() {
    return <p>User management {Math.floor(Math.random()*10)}</p>
}

function TransactionsManagement() {
    return <p>Transactions management</p>
}

function RoleRequests() {
    return <p>Role Requests</p>
}



function AdminDashboard() {

    let ADMIN_TAB_SELECTED = "admin__savedTab";
    const getSavedTab = () => localStorage.getItem(ADMIN_TAB_SELECTED)
    const setSavedTab = (index) => localStorage.setItem(ADMIN_TAB_SELECTED, index)

    const [selectedIndex, setSelectedIndex] = useState(getSavedTab() || 0);

    const componentMap = {
        0: memo(RoleRequests),
        1: memo(UserManagement),
        2: memo(BookManagement),
        3: memo(TransactionsManagement)
    }

    const ToDraw = componentMap[selectedIndex]

    return (

        <div>

            {
                <ToDraw/>
            }

            <Box sx={{width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0}}>
                <BottomNavigation
                    showLabels
                    value={parseInt(selectedIndex)}
                    onChange={(event, newValue) => {
                        setSavedTab(newValue)
                        setSelectedIndex(newValue);
                    }}
                >
                    <BottomNavigationAction label="Users" icon={<PeopleIcon/>}/>
                    <BottomNavigationAction label="Books" icon={<MenuBookIcon/>}/>
                    <BottomNavigationAction label="Orders" icon={<ReceiptLongIcon/>}/>
                </BottomNavigation>
            </Box>
        </div>
    );
}

export default AdminDashboard