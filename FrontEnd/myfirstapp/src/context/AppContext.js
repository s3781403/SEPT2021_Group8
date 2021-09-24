
// Store the logged in user here?


import React, {useState, createContext} from "react";
import {getUser} from "../api/login";

export const DefaultValue = {}

export const AppContext = createContext(DefaultValue);


export const AppProvider = (props) => {
    const [books,setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(getUser())
    // const [cartItemCount, setCartItemCount] = useState(999);

    return <AppContext.Provider value={{books,setBooks, searchTerm, setSearchTerm, loading, setLoading, user, setUser}}>
        {props.children}
    </AppContext.Provider>

}

