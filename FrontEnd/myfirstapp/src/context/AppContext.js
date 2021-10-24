// Store the logged in user here?


import React, {useState, createContext, useEffect} from "react";
import {getUser} from "../api/login";
import {addItem} from "../api/Orders";

export const DefaultValue = {}

export const AppContext = createContext(DefaultValue);


export const AppProvider = (props) => {
    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(getUser())
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const cartId=14

    const addCartItem = async (bookData) => {
        // bookData.qty = 1
        // let newArrayWithAddedBook = [...cartItem, bookData];
        // setCartItem(newArrayWithAddedBook)
       await addItem(bookData.id, bookData.quantity, cartId)
        syncCartItems()


    }

    useEffect(
        () => {
            setCartItemCount(cartItem.length)
        }, [cartItem]
    )

    const syncCartItems=()=>{
        if(user)
        {
            console.log("dalo na")
            //fetch the latest cart
           // setCartItem(to this)
        }
    }
    useEffect(
        ()=>{
            //sync cart items
          syncCartItems()
        },[]
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
        addCartItem
    }}>
        {props.children}
    </AppContext.Provider>

}

