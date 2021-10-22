import {Grid} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import Card from "@mui/material/Card";

function ShoppingCart() {


    const {cartItem, setCartItem} = useContext(AppContext)

    return(

        <div>
        <h1>Cart Summary</h1>
        <hr/>
            <div>
            <Grid container>
            <Grid item lg={6}>
                <Card xs={{width: '100%',height:'50%'}}>
                    <CardMedia
                        component="img"
                        height="450px"
                        width={'100%'}
                        style={{maxHeight: '450px', maxWidth: '100%', objectFit: 'contain', aspectRatio: 'auto',margin:'2%',padding:'2%'}}
                        image={cartItem.imageURL}
                        alt="book cover"
                    />

                </Card>
            </Grid>

                <Grid item lg={6}>
                    <h1>checkout</h1>
                </Grid>




            </Grid>
            </div>
         </div>

    )

}

export default ShoppingCart