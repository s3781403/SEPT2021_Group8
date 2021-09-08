package com.rmit.sept.booksmicroservices.web;


//import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;

//import com.rmit.sept.booksmicroservices.services.BookService;
import com.rmit.sept.booksmicroservices.model.Book;
import com.rmit.sept.booksmicroservices.services.BookService;
import com.rmit.sept.booksmicroservices.validator.BookValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.rmit.sept.booksmicroservices.services.MapValidationErrorService;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookValidator bookValidator;

    @Autowired
    private BookService bookService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;


    @PostMapping("/create")
    public ResponseEntity<?> createBook(@Valid @RequestBody Book book, BindingResult result) {
        bookValidator.validate(book,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Book newBook = bookService.saveBook(book);

        return  new ResponseEntity<Book>(newBook, HttpStatus.CREATED);

    }
}
