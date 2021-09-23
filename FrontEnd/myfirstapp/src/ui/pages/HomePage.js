import {Grid} from "@mui/material";
import {useContext, useEffect} from "react";
import {getAllBooks} from "../../api/books";
import {AppContext} from "../../context/AppContext";
import Fuse from "fuse.js";
import BookCardMaterial from "../components/BookCardMaterial";
import BookCard from "../components/BookCard";
import React from "react";


const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: "isbn,author,category,publisher,title,type".split(",")
};


function HomePage() {

    const {books, setBooks, searchTerm, setLoading} = useContext(AppContext)


    const fetchAndUpdateBooks = async () => {
        const fetchedBooks = await getAllBooks()
        setBooks(fetchedBooks)
    }

    useEffect(() => {
        setLoading(true)
        fetchAndUpdateBooks().then(r => {
            console.log("📚 Books fetched and loaded");
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        console.log("🏺: Search term changed to: ", searchTerm)
    }, [searchTerm])


    const getFilteredBooks = () => {
        // books.filter(book => book.author.contains(searchTerm) || book.title.contains(searchTerm) || )
        const searching = searchTerm.length >= 2
        if (!searching) return books
        const fuzzy = new Fuse(books, fuseOptions)
        const fuseResult = fuzzy.search(searchTerm)
        console.log(fuseResult)
        return fuseResult.map(match => match.item) //[{item: book, somethingelse: __}, {}]
    }

    const filteredBooks = getFilteredBooks()

    return <div>
        <Grid style={{marginTop: '1%', padding: '2%'}} container spacing={2} columns={12}>
            {
                filteredBooks.map(book => <BookCardMaterial key={book.id} book={book}/>)
            }
        </Grid>
    </div>
}

export default HomePage