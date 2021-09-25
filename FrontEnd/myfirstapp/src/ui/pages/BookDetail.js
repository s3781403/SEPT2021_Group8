import {useParams} from 'react-router-dom'
import {Grid} from "@mui/material";
import BookCardMaterial from "../components/BookCardMaterial";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {getBookByID} from "../../api/books";
import Button from "@mui/material/Button";

function BookDetail() {

    const {bookid: bookId} = useParams()
    const [bookData, setBookData] = useState()


    const {setLoading,cartItemCount, setCartItemCount} = useContext(AppContext)

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
            <Grid item xs={12}>
                <Button style={{margin:10}} variant={'outlined'} onClick={() => setCartItemCount(cartItemCount+1) }>Add to cart</Button>
            </Grid>
        </Grid>
    </div>
}

export default BookDetail