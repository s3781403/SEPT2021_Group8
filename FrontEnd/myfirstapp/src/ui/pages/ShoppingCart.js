import {Grid, Paper} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import PayPal from "./PayPal";
import CartItemBookCard from "../components/AdminDashboardComp/CartItemBookCard";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteItem} from "../../api/Orders";
import Typography from "@mui/material/Typography";

function CartItemSummary({item}) {

    const {deleteItemFromCart} = useContext(AppContext) //[] //[{}]

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={10}>
                    <CartItemBookCard book={item}/>
                </Grid>
                <Grid item xs={12} md={2} style={{textAlign: 'center'}}>
                    <br/>
                    <Button onClick={() => {
                        deleteItemFromCart(item.id)
                    }}>Delete <DeleteIcon/>

                    </Button>

                </Grid>

            </Grid>

        </div>

    )
}


function ShoppingCart() {


    const {cartItem, cartItemCount} = useContext(AppContext) //[] //[{}]

    console.log("cart item::::", cartItem,"✅",cartItem.userID)


    const price = () => {
        let totalPrice = 0
         cartItem?.lineItems?.map(item => {
             totalPrice = totalPrice + item.price
        })

        return totalPrice;
    }

    const totalPrice = price()


    const [checkout, setCheckOut] = useState(false);

    return (
        <div>

            <Typography variant="h3" mt={2} color="primary">
                Cart Summary 📚🛒
            </Typography>

            <div>
                <Grid container >

                    {/*    Cart Items */}
                    <Grid item xs={12} lg={8}>
                        {
                            cartItem?.lineItems?.map(item => <CartItemSummary item={item}/>)
                        }
                        {
                            (cartItem?.lineItems || []).length === 0 ? <h2>No items in cart</h2> : null
                        }
                    </Grid>

                    {/*    Checkout */}


                        <Grid item xs={12} lg={4} style={{textAlign: 'center', height: '500px'}}>
                            {
                                (cartItem?.lineItems || []).length != 0 ?   <Paper style={{height: 'auto', padding: '2%'}}>
                                    <Typography variant="h5" color="primary" marginTop={'4%'} padding={'4%'}>
                                        Sub Total ({cartItemCount} Books)
                                    </Typography>
                                    <hr/>
                                    <Grid container>
                                        <Grid item lg={6} style={{textAlign: 'left'}}>

                                            <Typography variant="h6" color="primary" marginTop={'2%'} padding={'2%'}>
                                                Shipping Charges
                                            </Typography>
                                            <Typography variant="h6" color="primary" marginTop={'2%'} padding={'2%'}>
                                                Total
                                            </Typography>
                                            <br/>

                                        </Grid>
                                        <Grid item lg={6} style={{textAlign: 'left'}}>
                                            <Typography variant="h6" color="primary" marginTop={'2%'} padding={'2%'}>
                                                Free
                                            </Typography>
                                            <Typography variant="h6" color="primary" marginTop={'2%'} padding={'2%'}>
                                                ${(price() + ".00").substr(0, 5)}
                                            </Typography>

                                        </Grid>
                                    </Grid>

                                    {checkout ? (
                                        <PayPal totalPrice={totalPrice}/>
                                    ) : (
                                        <Button variant={'outlined'} style={{
                                            height: '50px',
                                            width: '200px',
                                            margin: '4%',
                                            padding: '4%',
                                            color: 'red'
                                        }}
                                                onClick={() => {
                                                    setCheckOut(true);
                                                }}
                                        >
                                            Checkout
                                        </Button>
                                    )}
                                </Paper> : null
                            }

                        </Grid>


                </Grid>
            </div>
        </div>

    )

}

export default ShoppingCart