import {Grid} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import Card from "@mui/material/Card";
import BookCardMaterial from "../components/BookCardMaterial";

function CartItemSummary({item}) {
    // Book card
    // Qty

    return (
    <div>
        <Grid container>
            <Grid item xs={12} md={8}>
                 <BookCardMaterial book={item} />
            </Grid>
            <Grid item xs={12} md={4} style={{textAlign: 'center'}}>
                <label>Quantity</label><br/>
                <input type={"number"} value={item.qty}/>
            </Grid>

        </Grid>
        <hr/>

    </div>

    )
}


function ShoppingCart() {


    const {cartItem, setCartItem} = useContext(AppContext)

    return(

        <div>
        <h1>Cart Summary ({cartItem.length})</h1>
        <hr/>
            <div>
            <Grid container>

            {/*    Cart Items */}
                <Grid item xs={12} lg={8}>
                {
                    cartItem.map(item => <CartItemSummary item={item}/>)
                }
                </Grid>

            {/*    Checkout */}
                <Grid item xs={12} lg={4} style={{textAlign: 'center'}}>
                    <p>Checkout items</p>
                </Grid>


            {/*    Footer Description*/}



            </Grid>
            </div>
         </div>

    )

}

export default ShoppingCart