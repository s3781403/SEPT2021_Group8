import {getAllBooks, deleteBook} from "../../api/books";


test('api get books is working', async ()=> {
    const books = await getAllBooks()
    expect(books.length).toBeGreaterThan(0)
})

// Add search

// Add update

// Add delete (check the book no longer exists)
test ('book deleted correctly', async () => {
    // Delete the first book
    const books = await getAllBooks()
    const first = books[0]

    const deleteResponse = await deleteBook(first.id)
    expect(deleteResponse.deleted).toBe(true)

    const booksAfterDeletion = await getAllBooks()
    const deletedBookFound = booksAfterDeletion.filter(book => book.id === first.id)
    expect(deletedBookFound.length).toBe(0)
})