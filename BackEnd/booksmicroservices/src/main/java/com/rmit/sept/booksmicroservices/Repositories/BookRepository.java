package com.rmit.sept.booksmicroservices.Repositories;

import com.rmit.sept.booksmicroservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

    Book getBookById(long id);
    Iterable<Book> findAll();
    Iterable<Book> getBooksByTitleIgnoreCaseContaining(String title);
    Iterable<Book> getBooksByCategoryIgnoreCaseContaining(String category);
    Iterable<Book> getBooksByAuthorIgnoreCaseContaining(String author);
    Iterable<Book> getBooksByIsbnStartingWith(long Isbn);

}
