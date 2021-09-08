package com.rmit.sept.booksmicroservices.Repositories;

import com.rmit.sept.booksmicroservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

    Book findByIsbn(int isbn);
    Book getBySellerID(int sellerID);
    Book findByTitle(String title);
    Book findByCategory(String category);
    Book findByPublisher(String publisher);

}
