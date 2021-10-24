// Axios
import axios from "axios";

const BOOK_API_URL = "http://localhost:8081/api/books"

// Get all books
const getAllBooks = async () => {
    const getUrl = `${BOOK_API_URL}/getAll?column=all`
    return (await axios.get(getUrl)).data
}

// Book by id
const getBookByID = async (id) => {
    const getByIDUrl = `${BOOK_API_URL}/book/${id}`
    return (await axios.get(getByIDUrl)).data
}

//add book
const createBook = async (bookData) => {

        const getByIDUrl = `${BOOK_API_URL}/create`
        return (await axios.post(getByIDUrl, bookData,{headers: {
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"
            }})).data

}

const FileUploadToApi = async (file) => {
    const formData = new FormData()
    formData.append("file", file);
    return (await axios.post('http://localhost:8081/api/books/uploadFile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })).data
}


// Update book
const updateBook = async (id, bookData) => {
    const updateUrl = `${BOOK_API_URL}/update/${id}`
    const updateResult = await axios.put(updateUrl, bookData,{headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": "*"
        }});
    return updateResult.data
}

// Delete book
const deleteBook = async (id) => {
    const deleteUrl = `${BOOK_API_URL}/delete/${id}`
    return (await axios.delete(deleteUrl)).data
}

//add review
const addReview = async (reviewData,bookId,userId) => {

    const getUrl = `http://localhost:8081/api/reviews/create`
    console.log(reviewData,bookId,userId)
    return (await axios.post(getUrl, {
        "bookID": bookId,
            "userID": userId,
            "content": reviewData
    },{headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": "*"
        }})).data

}

//get reviews

const getAllReviews = async () => {
    const getUrl = `http://localhost:8081/api/reviews/getAll?column=all`
    return (await axios.get(getUrl)).data
}


export {getAllBooks, getBookByID, updateBook, deleteBook,createBook,FileUploadToApi,addReview,getAllReviews}




