package com.rmit.sept.bk_loginservices.Repositories;

import com.rmit.sept.bk_loginservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

    Book findByISBN(int ISBN);
    Book getBySellerID(int sellerID);
    Book findByTitle(String title);
    Book findByCategory(String category);
    Book findByPublisher(String publisher);

}
