import {Grid} from "@mui/material";
import React from "react";


function BookCard({book}) {



    return (<Grid item={true} xs={6} md={4} lg={3} xl={2} style={{marginBottom: '2%'}}>
        <div style={{textAlign: 'center'}}>
            <img style={{height: "200px", width: 'auto', maxWidth: '90%'}} src={"https://assets.teenvogue.com/photos/5cd4384fac4d9e712fe2ebb0/2:3/w_1852,h_2778,c_limit/The%20Gravity%20of%20Us_.jpg"}/>
            <h3>{book.title}</h3>
            <p>{book.author}</p>

            <p style={{color: 'magenta'}}>${(book.price).substr(0, 5)}</p>
        </div>
        </Grid>)

}

export default BookCard