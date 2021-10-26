import React, {useContext, useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {AppContext} from "../../context/AppContext";
import CartItemBookCard from "../components/AdminDashboardComp/CartItemBookCard";
import {deleteOrder, getCartByUserID, getOrderByUserID} from "../../api/Orders";
import {getBookByID} from "../../api/books";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

 function OrderSummary({item})
{

    return(
        <div>
            <Typography variant="h5" color="primary">
                Order Number:{item.id}
            </Typography>



            <Grid container>

                <Grid item xs={12} md={8}>
                    {

                        item.cart.lineItems.map(item => <CartItemBookCard book={item}/>)
                    }

                </Grid>
                <Grid item xs={12} md={2} style={{textAlign: 'center'}}>
                    <br/>
                    <Button onClick={()=>{deleteOrder(item.id)
                        alert(item.id + "has been deleted")
                    }}>Cancel Order <DeleteIcon/>

                    </Button>

                </Grid>

                <Grid item md={2}>
                    <br/>
                    <Typography variant="h6" color="green" >
                        Order Status: <br></br>{item.status}
                    </Typography>
                </Grid>

            </Grid>

        </div>
    )
}

  function OrderHistory() {
     const {setLoading,user} = useContext(AppContext)
const [orderData,setOrderData]=useState([])
      useEffect(async ()=>{
          setLoading(true)
          const fetchedOrderData=await getOrderByUserID(user.userInfo.id)
          setOrderData(fetchedOrderData)
          setLoading(false)
          console.log("...🛍...",orderData)
      },[])


     return (
         <div>
             <Grid container>

                 {/*    Order Items */}
                 <Grid item xs={12} lg={12}>
                     {
                         orderData.map(item => <OrderSummary item={item}/>)
                     }
                     {
                         (orderData || []).length === 0 ?
                             <h2>You have not ordered anything yet! 🥺🥺</h2>:null
                     }
                 </Grid>

             </Grid>
         </div>

     )
 }

export default OrderHistory;