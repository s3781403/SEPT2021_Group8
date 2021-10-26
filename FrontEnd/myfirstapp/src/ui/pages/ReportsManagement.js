import React, {useContext} from "react";
import Button from "@mui/material/Button";
import {downloadBooks, downloadOrders} from "../../api/exportdata";
import {AppContext} from "../../context/AppContext";

export default function ReportsManagement() {

    const {setLoading} = useContext(AppContext)

    return (
        <div>
            <Button variant={'outlined'} color={'secondary'}
                    style={{maxWidth: '50', height: '30', padding: '2%', margin: '4%'}} onClick={async () => {
                setLoading(true)
                await downloadOrders()
                setLoading(false)
            }}> Download Transactions CSV
                Report</Button>

            <Button variant={'outlined'} color={'secondary'}
                    style={{maxWidth: '50', height: '30', padding: '2%', margin: '4%'}} onClick={async () => {
                        setLoading(true)
                        await downloadBooks()
                        setLoading(false)
            }}>Download Books CSV Report</Button>
        </div>
    )
}
