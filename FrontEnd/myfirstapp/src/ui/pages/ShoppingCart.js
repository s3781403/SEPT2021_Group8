import {Grid} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import BookCardMaterial from "../components/BookCardMaterial";
import PayPal from "./PayPal";

function CartItemSummary({item}) {


    return (
    <div>
        <Grid container>
            <Grid item xs={12} md={4} >
                 <BookCardMaterial book={item} />
            </Grid>
            <Grid item xs={12} md={8} style={{textAlign: 'center'}}>
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

    const [checkout, setCheckOut] = useState(false);
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
                    {checkout ? (
                        <PayPal />
                    ) : (
                        <button
                            onClick={() => {
                                setCheckOut(true);
                            }}
                        >
                            Checkout
                        </button>
                    )}
                </Grid>


            {/*    Footer Description*/}



            </Grid>
            </div>
         </div>

    )

}

export default ShoppingCart