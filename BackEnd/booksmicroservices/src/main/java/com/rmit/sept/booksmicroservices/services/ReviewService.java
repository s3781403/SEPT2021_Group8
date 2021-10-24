package com.rmit.sept.booksmicroservices.services;


import com.rmit.sept.booksmicroservices.Repositories.ReviewRepository;
import com.rmit.sept.booksmicroservices.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review saveReview (Review newReview){

        newReview.setUserID(newReview.getUserID());
        newReview.setBookID(newReview.getBookID());
        newReview.setContent(newReview.getContent());
        return reviewRepository.save(newReview);
    }

    public List<Review> getAllReviews() {
        List<Review> list = new ArrayList<>();
        reviewRepository.findAll().forEach(review -> list.add(review));
        return list;
    }

    public List<Review> getAllByBookID(long id) {
        List<Review> list = new ArrayList<>();
        reviewRepository.getReviewsByBookID(id).forEach(review -> list.add(review));
        return list;
    }

    public void deleteReview(Review review) {
        reviewRepository.delete(review);
    }


}
