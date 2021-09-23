import React, {useState, createContext} from "react";

export const DefaultValue = {}

export const AppContext = createContext(DefaultValue);


export const AppProvider = (props) => {

    const [books,setBooks]=useState()


    return <AppContext.Provider value={{books,setBooks}}>
        {props.children}
    </AppContext.Provider>

}
