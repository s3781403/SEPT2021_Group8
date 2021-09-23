import {useParams} from 'react-router-dom'
import React from "react";

function BookDetail() {

    const {bookid: bookId} = useParams()

    return <div>
        <p>BookDetail for {bookId}</p>
    </div>
}

export default BookDetail