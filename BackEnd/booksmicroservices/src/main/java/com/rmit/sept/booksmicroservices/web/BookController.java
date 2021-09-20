package com.rmit.sept.booksmicroservices.web;

import com.rmit.sept.booksmicroservices.Repositories.BookRepository;
import com.rmit.sept.booksmicroservices.exceptions.BookNotFoundException;
import com.rmit.sept.booksmicroservices.model.Book;
import com.rmit.sept.booksmicroservices.services.AmazonClientService;
import com.rmit.sept.booksmicroservices.services.BookService;
import com.rmit.sept.booksmicroservices.services.MapValidationErrorService;
import com.rmit.sept.booksmicroservices.validator.BookValidator;
import com.sun.org.apache.xpath.internal.operations.Mult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    private AmazonClientService amazonClientService;

    @Autowired
    BookController(AmazonClientService amazonClientService) {
        this.amazonClientService = amazonClientService;
    }


//CREATE
    @CrossOrigin(origins = "*")
    @PostMapping("/create")
    public ResponseEntity<?> createBook(@Valid @RequestBody Book book, BindingResult result, @RequestPart(value = "file") MultipartFile file) {
        bookValidator.validate(book,result);
        //bookValidator.validate(file) ?
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        Book newBook = bookService.saveBook(book, uploadFile(file));
        return new ResponseEntity<Book>(newBook, HttpStatus.CREATED);
    }

//    @CrossOrigin(origins = "*")
//    @PostMapping("/uploadFile")
    private String uploadFile(@RequestPart(value = "file") MultipartFile file) {
        return this.amazonClientService.uploadFile(file);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteFile")
    public String deleteFile(@RequestPart(value = "url") String fileUrl) {
        return this.amazonClientService.deleteFileFromS3Bucket(fileUrl);
    }


    //READ
    //Returns a single book with the given ID (http://localhost:8080/api/books/book/2)
    @CrossOrigin(origins = "*")
    @GetMapping("/book/{id}")
    public ResponseEntity<Book> getBookByID(@PathVariable("id") Integer id) {
        Book book = bookService.getBookById(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    //Return matches from the given column which contain the value provided
    //http://localhost:8080/api/books/getAll?column=title&value=Harry%20Potter
    //TODO Should this be moved to BookValidator ?
    @CrossOrigin(origins = "*")
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
    //TODO Should this also be moved to bookValidator or another class?
    @CrossOrigin(origins = "*")
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
            System.out.println("Query is not a valid number, error message = " + e.getMessage());
        }

        if (matchTitle != null) allMatchedBooks.addAll(matchTitle);
        if (matchCategory != null) allMatchedBooks.addAll(matchCategory);
        if (matchAuthor != null) allMatchedBooks.addAll(matchAuthor);
        if (matchIsbn != null) allMatchedBooks.addAll(matchIsbn);

        return new ResponseEntity<>(allMatchedBooks, HttpStatus.OK);
    }

//UPDATE
    //TODO secure this to check the userToken matches the sellerID
    @CrossOrigin(origins = "*")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBookDetails(@PathVariable("id") Long id, @Valid @RequestBody Book bookDetails, BindingResult bindingResult) {
        //Check a book exists with the given ID
        Book oldBook = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("No book with id '" + id + "' could be found to update"));

        //Validate the book details in the request body
        bookValidator.validate(bookDetails, bindingResult);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(bindingResult);
        if (errorMap != null) return errorMap;

        //Update and return the book
        Book updatedBook = bookService.updateBook(oldBook, bookDetails);
        return new ResponseEntity<Book>(updatedBook, HttpStatus.OK);
    }


//DELETE
    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteBook(@PathVariable("id") Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("No book with id '" + id + "' could be found to delete"));
        bookService.deleteBook(book);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}