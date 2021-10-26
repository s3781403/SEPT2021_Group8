import React, {useRef, useEffect, useContext} from "react";
import {useHistory} from "react-router";
import {createCart, createOrder} from "../../api/Orders";
import {AppContext} from "../../context/AppContext";

export default function PayPal({totalPrice}) {
    const paypal = useRef();
    const history = useHistory();

    const {cartItem} = useContext(AppContext) //[] //[{}]

    const userId=cartItem.userID
    const cartId=cartItem.id

    useEffect(() => {
        window.paypal.Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Subtotal for the books",
                                amount: {
                                    currency_code: "AUD",
                                    value: totalPrice,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                     await actions.order.capture();
                    history.push("/ordersuccess")
                    console.log("🔥",userId,totalPrice,cartId)
                    const res = await createOrder(userId,totalPrice,cartId)
                    console.log("✅🛒🛍",res)
                    await createCart(userId)
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}