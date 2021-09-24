import {Fab, Grid} from "@mui/material";
import BookCardMaterial from "../../ui/components/BookCardMaterial";
import AdminBookCard from "../../ui/pages/AdminBookCard";
import {useContext, useEffect} from "react";
import {AppContext} from "../../context/AppContext";
import {getAllBooks} from "../../api/books";
import Fuse from "fuse.js";
import AddIcon from '@mui/icons-material/Add';
import {useHistory} from "react-router-dom";


const fuseOptions = {
    keys: "isbn,author,category,publisher,title,type".split(",")
};

function BookManagement() {

    const {books, setBooks, searchTerm, setLoading} = useContext(AppContext)

const history=useHistory()

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

    return(
        <div style={{paddingBottom: '5%'}}>
            <div style={{textAlign:"right", margin: '20px'}}>
            <Fab variant={"extended"} color={"secondary"} onClick={()=>history.push("/admin/book/add")} >
                <AddIcon sx={{ mr: 1 }}  />
                Add Book
            </Fab>
            </div>
            <Grid style={{marginTop: '1%', padding: '2%'}} container spacing={2} columns={12}>
                {
                    filteredBooks.map(book => <AdminBookCard key={book.id} book={book}/>)
                }
            </Grid>
        </div>)

}

export default BookManagement