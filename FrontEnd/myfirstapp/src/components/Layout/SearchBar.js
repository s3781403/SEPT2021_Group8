
import {useContext, useEffect, useState} from "react";
import React from "react";
import {AppContext} from "../../AppContext";
import axios from "axios";
function SearchBar()
{
    const {books,setBooks}=useContext(AppContext);
    const fetchUsers = async () => {
        return await axios.get("http://localhost:8080/api/books/getAll?column=all")
    }

    return(<h1>hello</h1>);
}
export default SearchBar;