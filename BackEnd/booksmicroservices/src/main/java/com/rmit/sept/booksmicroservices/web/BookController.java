package com.rmit.sept.booksmicroservices.web;

import com.rmit.sept.booksmicroservices.Repositories.BookRepository;
import com.rmit.sept.booksmicroservices.model.Book;
import com.rmit.sept.booksmicroservices.services.BookService;
import com.rmit.sept.booksmicroservices.validator.BookValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import com.rmit.sept.booksmicroservices.services.MapValidationErrorService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookValidator bookValidator;

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    //CREATE
    @PostMapping("/create")
    public ResponseEntity<?> createBook(@Valid @RequestBody Book book, BindingResult result) {
        bookValidator.validate(book,result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        Book newBook = bookService.saveBook(book);
        return new ResponseEntity<Book>(newBook, HttpStatus.CREATED);
    }

    //READ

    //Returns a single book with the given ID (http://localhost:8080/api/books/book/2)
    @GetMapping("/book/{id}")
    public ResponseEntity<Book> getBookByID(@PathVariable("id") Integer id) {
        Book book = bookService.getBookById(id);
        return new ResponseEntity<Book>(book, HttpStatus.OK);
    }

    //Return matches from the given column which contain the value provided
    //http://localhost:8080/api/books/getAll?column=title&value=Harry%20Potter
    @GetMapping("/getAll")
    public ResponseEntity<List<Book>> getListByRequestParameters(@RequestParam("column") String column, @RequestParam(value = "value", required = false) String value) {
        if (column != null) {
            List<Book> books = new ArrayList<>();
            if (column.equals("all")) {
                books = bookService.getAllBooks();
            }
            if (column.equals("title") && value != null) {
                books = bookService.getAllByTitle(value);
            }
            else if(column.equals("category") && value != null) {
                books = bookService.getAllByCategory(value);
            }
            else if(column.equals("author") && value != null) {
                books = bookService.getAllByAuthor(value);
            }
            else if (column.equals("isbn") && value != null) {
                books = bookService.getAllByIsbn(Long.parseLong(value));
            }
//           TODO else if (column.equals("publisher"))
            return new ResponseEntity<>(books, HttpStatus.OK);
        } else {
            return null;
        }
    }

    //Returns a list of books that match the entered value
    //http://localhost:8080/api/books/search?query=omic
    @GetMapping("/search")
    public ResponseEntity<List<Book>> getListFromSearch(@RequestParam("query") String queryValue) {
        List<Book> allMatchedBooks = new ArrayList<>();
        List<Book> matchIsbn = new ArrayList<>();
        List<Book> matchTitle = bookService.getAllByTitle(queryValue);
        List<Book> matchCategory = bookService.getAllByCategory(queryValue);
        List<Book> matchAuthor = bookService.getAllByAuthor(queryValue);

        try {
            matchIsbn = bookService.getAllByIsbn(Long.parseLong(queryValue));
        } catch (NumberFormatException e) {
            System.out.println("Query is not a valid number, error = " + e.getMessage());
        }

        if (matchTitle != null) allMatchedBooks.addAll(matchTitle);
        if (matchCategory != null) allMatchedBooks.addAll(matchCategory);
        if (matchAuthor != null) allMatchedBooks.addAll(matchAuthor);
        if (matchIsbn != null) allMatchedBooks.addAll(matchIsbn);

        return new ResponseEntity<>(allMatchedBooks, HttpStatus.OK);
    }

//UPDATE


//DELETE


}