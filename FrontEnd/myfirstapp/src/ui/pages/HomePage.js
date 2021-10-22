import {Grid} from "@mui/material";
import {useContext, useEffect} from "react";
import {getAllBooks} from "../../api/books";
import {AppContext} from "../../context/AppContext";
import Fuse from "fuse.js";
import BookCardMaterial from "../components/BookCardMaterial";
import {Link} from 'react-router-dom'


const fuseOptions = {
    keys: "isbn,author,category,publisher,title,type".split(",")
};


function HomePage() {

    const {books, setBooks, searchTerm, setLoading, user} = useContext(AppContext)


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
        const searching = searchTerm.length >= 2
        if (!searching) return books
        const fuzzy = new Fuse(books, fuseOptions)
        const fuseResult = fuzzy.search(searchTerm)
        console.log(fuseResult)
        return fuseResult.map(match => match.item)
    }

    const filteredBooks = getFilteredBooks()

    return <div>
        <Grid style={{marginTop: '1%', padding: '1%'}} container spacing={2} columns={12}>

            {user?.type === "admin" ?
                <Grid  item={true} xs={12}  style={{color:'ff5722'}}><Link to={"/admin"} >Admin Dashboard</Link></Grid> : null
            }

            <br/>  <br/>  <br/>
            {
                filteredBooks.map(book => (
                    <Grid key={book.id} item={true} xs={6} md={4} lg={3} xl={2}
                          style={{marginBottom: '2%', padding: '0.5%'}}>
                        <BookCardMaterial book={book}/>
                    </Grid>))
            }



        </Grid>


    </div>
}

export default HomePage