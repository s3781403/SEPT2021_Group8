import {Fab, Grid} from "@mui/material";
import BookCardMaterial from "../BookCardMaterial";
import AdminBookCard from "../../pages/AdminBookCard";
import {useContext, useEffect} from "react";
import {AppContext} from "../../../context/AppContext";
import {getAllBooks} from "../../../api/books";
import Fuse from "fuse.js";
import AddIcon from '@mui/icons-material/Add';
import {useHistory} from "react-router-dom";


const fuseOptions = {
    keys: "isbn,author,category,publisher,title,type".split(",")
};

function BookManagement() {

    const {books, setBooks, searchTerm, setLoading} = useContext(AppContext)

    const history = useHistory()

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

    return (
        <div style={{paddingBottom: '3%'}}>
            <div style={{textAlign: "right", margin: '7px'}}>
                <Fab variant={"extended"} color={"secondary"} onClick={() => history.push("/admin/book/add")}>
                    <AddIcon sx={{mr: 1}}/>
                    Add Book
                </Fab>
            </div>
            <Grid style={{marginTop: '0.5%', padding: '0.5%'}} container spacing={2} columns={12}>
                {
                    filteredBooks.map(book => (
                        <Grid key={book.id} item={true} xs={6} md={4} lg={3} xl={2} style={{marginBottom: '2%', padding: '0.5%'}}>
                            <AdminBookCard  book={book}/>
                        </Grid>))
                }
            </Grid>
        </div>)

}

export default BookManagement