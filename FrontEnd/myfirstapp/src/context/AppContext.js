
// Store the logged in user here?


import React, {useState, createContext} from "react";

export const DefaultValue = {}

export const AppContext = createContext(DefaultValue);


export const AppProvider = (props) => {
    const [books,setBooks] = useState([])
     const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    // const [cartItemCount, setCartItemCount] = useState(999);

    return <AppContext.Provider value={{books,setBooks, searchTerm, setSearchTerm, loading, setLoading}}>
        {props.children}
    </AppContext.Provider>

}

