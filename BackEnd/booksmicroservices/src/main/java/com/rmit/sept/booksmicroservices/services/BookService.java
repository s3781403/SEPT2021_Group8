package com.rmit.sept.booksmicroservices.services;

import com.rmit.sept.booksmicroservices.Repositories.BookRepository;
import com.rmit.sept.booksmicroservices.exceptions.BookNotFoundException;
import com.rmit.sept.booksmicroservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book saveBook(Book newBook) {

        try {
            //I don't understand why we do this instead of directly passing the book object
            newBook.setIsbn(newBook.getIsbn());
            newBook.setAuthor(newBook.getAuthor());
            newBook.setCategory(newBook.getCategory());
            newBook.setPrice(newBook.getPrice());
            newBook.setPublisher(newBook.getPublisher());
            newBook.setSellerID(newBook.getSellerID());
            newBook.setTitle(newBook.getTitle());
            newBook.setType(newBook.getType());
            newBook.setCreate_At(newBook.getCreate_At());
            newBook.setId(newBook.getId());
            newBook.setQuality(newBook.getQuality());
            newBook.setStock(newBook.getStock());
            newBook.setImageURL(newBook.getImageURL());
            newBook.setPdfURL(newBook.getPdfURL());

            return bookRepository.save(newBook);

        } catch(Exception e) {
            System.out.println("========| Error saving Book (BookService) |========\n"+e.getMessage()+"\n====================");
            e.printStackTrace();
        }
        return null;
    }

    public List<Book> getAllBooks() {
        List<Book> list = new ArrayList<>();
        bookRepository.findAll().forEach(book -> list.add(book));
        return list;
    }

    public Book getBookById(long id) {
            Book book = bookRepository.getBookById(id);
            if (book != null) {
                return book;
            }
            else {
                throw new BookNotFoundException("Book with id '" + id + "' could not be found");
            }
    }

    public List<Book> getAllByTitle(String title) {
        List<Book> list = new ArrayList<>();
        bookRepository.getBooksByTitleIgnoreCaseContaining(title).forEach(book -> list.add(book));
        return list;
    }

    public List<Book> getAllByCategory(String category) {
        List<Book> list = new ArrayList<>();
        bookRepository.getBooksByCategoryIgnoreCaseContaining(category).forEach(book -> list.add(book));
        return list;
    }

    public List<Book> getAllByAuthor(String author) {
        List<Book> list = new ArrayList<>();
        bookRepository.getBooksByAuthorIgnoreCaseContaining(author).forEach(book -> list.add(book));
        return list;
    }

    public List<Book> getAllByIsbn(long isbn) {
        List<Book> list = new ArrayList<>();
        bookRepository.getBooksByIsbnStartingWith(isbn).forEach(book -> list.add(book));
        return list;

    }

    public void deleteBook(Book book) {
        bookRepository.delete(book);
    }


    public Book updateBook(Book oldBook, Book bookDetails) {
        oldBook.setUpdate_At(new Date());
        oldBook.setTitle(bookDetails.getTitle());
        oldBook.setQuality(bookDetails.getQuality());
        oldBook.setIsbn(bookDetails.getIsbn());
        oldBook.setType(bookDetails.getType());
        oldBook.setPublisher(bookDetails.getPublisher());
        oldBook.setPrice(bookDetails.getPrice());
        oldBook.setCategory(bookDetails.getCategory());
        oldBook.setAuthor(bookDetails.getAuthor());
        oldBook.setSellerID(bookDetails.getSellerID());
        oldBook.setStock(bookDetails.getStock());
        oldBook.setCreate_At(oldBook.getCreate_At());

        return bookRepository.save(oldBook);
    }
}
