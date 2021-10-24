// Store the logged in user here?


import React, {useState, createContext, useEffect} from "react";
import {getUser} from "../api/login";
import {addItem, createCart, getCartByUserID} from "../api/Orders";

export const DefaultValue = {}

export const AppContext = createContext(DefaultValue);


export const AppProvider = (props) => {
    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(getUser())
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const [cartId, setCartId] = useState(0);

    const addCartItem = async (bookData) => {
        await addItem(bookData.id, bookData.quantity, cartId)
        await syncCartItems()
    }

    useEffect(
        () => {
            setCartItemCount(cartItem.length)
        }, [cartItem]
    )

    const syncCartItems = async () => {
        if (user) {
            console.log("dalo na")
            //fetch the latest cart
            const cartData = await getCartByUserID(user.userInfo.id)
            // setCartItem(to this)
            setCartItem(cartData)

        }
    }
    useEffect(
        () => {
            //sync cart items
            syncCartItems()
        }, []
    )

    useEffect(async () => {


            if (cartItemCount > 0) {
                setCartId(cartItem[0].id)
            } else {
                setCartId(await createCart(user.userInfo.id))

            }
        }
        ,
        []
    )

    return <AppContext.Provider value={{
        books,
        setBooks,
        searchTerm,
        setSearchTerm,
        loading,
        setLoading,
        user,
        setUser,
        cartItemCount,
        cartItem,
        addCartItem,
        cartId,
        setCartId,
        setCartItem,
        setCartItemCount
    }}>
        {props.children}
    </AppContext.Provider>

}

