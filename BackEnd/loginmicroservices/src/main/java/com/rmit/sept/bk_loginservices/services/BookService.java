package com.rmit.sept.bk_loginservices.services;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book saveBook(Book newBook) {

        try {
            //I don't understand why we do this instead of directly passing the book object
            newBook.setAuthor(newBook.getAuthor());
            newBook.setCategory(newBook.getCategory());
            newBook.setCreate_At(newBook.getCreate_At());
            newBook.setId(newBook.getId());
            newBook.setISBN(newBook.getISBN());
            newBook.setPrice(newBook.getPrice());
            newBook.setPublisher(newBook.getPublisher());
            newBook.setSellerID(newBook.getSellerID());
            newBook.setType(newBook.getType());
            newBook.setTitle(newBook.getTitle());

            //Couldn't you just comment everything above out and have it as the one that it passes in?
            return bookRepository.save(newBook);

        } catch(Exception e) {
//            throw new SomethingException
            System.out.println("========| Error saving Book (BookService) |========\n"+e.getMessage()+"\n==========================================");
            e.printStackTrace();
        }

//        return bookRepository.save(newBook);
    }
}
