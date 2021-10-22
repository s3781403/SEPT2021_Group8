import {getAllBooks} from "./books";

const downloadBooks = async () => {
    const fetchedBooks = await getAllBooks()
    const headerRow = 'id,isbn,title,author,category,publisher,price,quality,stock'
    const rows = [...fetchedBooks.map(fetchedBook => [fetchedBook.id, fetchedBook.isbn, fetchedBook.title, fetchedBook.author, fetchedBook.category, fetchedBook.publisher, fetchedBook.price, fetchedBook.quality, fetchedBook.stock])];

    let csvContent = "data:text/csv;charset=utf-8," + headerRow + "\n"
        + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    window.open(encodedUri)
}

export default downloadBooks

