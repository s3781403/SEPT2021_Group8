import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Typography from "@mui/material/Typography";

import {Link} from 'react-router-dom'

export default function OrderSuccess() {
    const {width, height} = useWindowSize()
    return (
        <div>
            <Confetti
                width={width}
                height={height}
            />
            <h1>Order Successfullll!!!🎉</h1>
            <Typography variant="h3" color="green">
                Thank you for shopping with us!! Your books will be delivered to you soon.🔜
            </Typography>
            <Typography variant="h4" color="green">
                <Link to={"/"}>  Till then keep shopping with us. </Link></Typography>
        </div>
    )

}