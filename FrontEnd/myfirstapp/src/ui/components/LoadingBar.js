import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";

export default function LoadingBar() {
    const {loading} = useContext(AppContext)
    console.log("⏳", loading)

    if(!loading) return null

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    );
}