package com.rmit.sept.booksmicroservices.Repositories;

import com.rmit.sept.booksmicroservices.model.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Long> {

    Review getById(Long id);
    Iterable<Review> findAll();
    Iterable<Review> getReviewsByBookID(long bookID);

}
