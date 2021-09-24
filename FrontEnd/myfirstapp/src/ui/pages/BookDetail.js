import {useParams} from 'react-router-dom'
import {Grid} from "@mui/material";
import BookCardMaterial from "../components/BookCardMaterial";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {getBookByID} from "../../api/books";

function BookDetail() {

    const {bookid: bookId} = useParams()
    const [bookData, setBookData] = useState()

    const {setLoading} = useContext(AppContext)

    useEffect(async () => {
        setLoading(true)
        const freshBookData = await getBookByID(bookId)
        setBookData(freshBookData)
        setLoading(false)
    }, [])

    if (!bookData) return null

    return <div>
        <Grid container>
            <Grid item xs={12}>
                <BookCardMaterial book={bookData}/>
            </Grid>
        </Grid>
    </div>
}

export default BookDetail