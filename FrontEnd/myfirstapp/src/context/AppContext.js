
// Store the logged in user here?


import React, {useState, createContext, useEffect} from "react";
import {getUser} from "../api/login";

export const DefaultValue = {}

export const AppContext = createContext(DefaultValue);


export const AppProvider = (props) => {
    const [books,setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(getUser())
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartItem, setCartItem] = useState([]);

useEffect(
    ()=>{
        setCartItemCount(cartItem.length)
    },[cartItem]
)

    return <AppContext.Provider value={{books,setBooks, searchTerm, setSearchTerm, loading, setLoading, user, setUser,cartItemCount, setCartItemCount,cartItem, setCartItem}}>
        {props.children}
    </AppContext.Provider>

}

