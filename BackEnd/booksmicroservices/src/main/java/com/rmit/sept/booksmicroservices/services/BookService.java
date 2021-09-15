package com.rmit.sept.booksmicroservices.services;

import com.rmit.sept.booksmicroservices.Repositories.BookRepository;
import com.rmit.sept.booksmicroservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
            newBook.setCondition(newBook.getCondition());
            newBook.setStock(newBook.getStock());



            //Couldn't you just comment everything above out and have it as the one that it passes in?
            return bookRepository.save(newBook);

        } catch(Exception e) {
//            throw new SomethingException
            System.out.println("========| Error saving Book (BookService) |========\n"+e.getMessage()+"\n====================");
            e.printStackTrace();
        }

        return null;
    }

    public List<Book> getAllBooks() {
        List<Book> list = new ArrayList<>();
        bookRepository.findAll().forEach(e -> list.add(e));
        return list;
    }
}
