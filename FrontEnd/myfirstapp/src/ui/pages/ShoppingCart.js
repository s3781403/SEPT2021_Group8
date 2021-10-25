import {Grid} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import PayPal from "./PayPal";
import CartItemBookCard from "../components/AdminDashboardComp/CartItemBookCard";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteItem} from "../../api/Orders";
function CartItemSummary({item}) {

    const {deleteItemFromCart} = useContext(AppContext) //[] //[{}]

    return (
    <div>
        <Grid container>
            <Grid item xs={12} md={10} >
                 <CartItemBookCard book={item} />
            </Grid>
            <Grid item xs={12} md={2} style={{textAlign: 'center'}}>
                <br/>
                <Button onClick={()=>{deleteItemFromCart(item.id)}}>Delete <DeleteIcon/>

                </Button>

            </Grid>

        </Grid>

    </div>

    )
}


function ShoppingCart() {


    const {cartItem,deleteItemFromCart} = useContext(AppContext) //[] //[{}]




    const [checkout, setCheckOut] = useState(false);

    return(
        <div>
        <h1>Cart Summary </h1>
       
            <div>
            <Grid container>

            {/*    Cart Items */}
                <Grid item xs={12} lg={8}>
                {
                    cartItem?.lineItems?.map(item => <CartItemSummary item={item}/>)
                }
                    {
                        (cartItem?.lineItems || []).length === 0 ? <p>No items in cart</p> : null
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



            </Grid>
            </div>
         </div>

    )

}

export default ShoppingCart