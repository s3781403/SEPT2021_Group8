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
import java.util.List;

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


    @PostMapping("/create")
    public ResponseEntity<?> createBook(@Valid @RequestBody Book book, BindingResult result) {
        bookValidator.validate(book,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Book newBook = bookService.saveBook(book);

        return new ResponseEntity<Book>(newBook, HttpStatus.CREATED);

    }

    @GetMapping("/allbooks")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return new ResponseEntity<List<Book>>(books, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookByID(@PathVariable("id") Integer id) {
        Book book = bookService.getBookById(id);
        return new ResponseEntity<Book>(book, HttpStatus.OK);
    }


//    @Transactional
//    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseStatus(HttpStatus.OK)
//    public ResponseEntity<List<Book>> get(
//
//    )

}
