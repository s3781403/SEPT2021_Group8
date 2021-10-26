import {getAllBooks} from "./books";
import {getAllOrders} from "./Orders";

export const downloadBooks = async () => {
    const fetchedBooks = await getAllBooks()
    const headerRow = 'id,isbn,title,author,category,publisher,price,quality,stock'
    const rows = [...fetchedBooks.map(fetchedBook => [fetchedBook.id, fetchedBook.isbn, fetchedBook.title, fetchedBook.author, fetchedBook.category, fetchedBook.publisher, fetchedBook.price, fetchedBook.quality, fetchedBook.stock])];

    let csvContent = "data:text/csv;charset=utf-8," + headerRow + "\n"
        + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    window.open(encodedUri)
}


export const downloadOrders = async () => {
    const fetchedOrders = await getAllOrders()
    const headerRow = 'id,userID,orderReceived_Date,status,price,currency,method'
    const rows = [...fetchedOrders.map(fetchedOrder => [fetchedOrder.id,fetchedOrder.userID,fetchedOrder.orderReceived_Date,fetchedOrder.status,fetchedOrder.price,fetchedOrder.currency,fetchedOrder.method])];

    let csvContent = "data:text/csv;charset=utf-8," + headerRow + "\n"
        + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    window.open(encodedUri)
}





