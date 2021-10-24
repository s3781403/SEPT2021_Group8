package com.rmit.sept.booksmicroservices.web;

import com.rmit.sept.booksmicroservices.Repositories.ReviewRepository;
import com.rmit.sept.booksmicroservices.exceptions.ReviewNotFoundException;
import com.rmit.sept.booksmicroservices.model.Review;
import com.rmit.sept.booksmicroservices.services.MapValidationErrorService;
import com.rmit.sept.booksmicroservices.services.ReviewService;
import com.rmit.sept.booksmicroservices.validator.ReviewValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewValidator reviewValidator;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;



//CREATE
    @CrossOrigin(origins = "*")
    @PostMapping("/create")
    public ResponseEntity<?> createReview(@Valid @RequestBody Review review, BindingResult result) {
        reviewValidator.validate(review,result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        Review newReview = reviewService.saveReview(review);
        return new ResponseEntity<Review>(newReview, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAll")
    public ResponseEntity<List<Review>> getListByRequestParameters(@RequestParam("column") String column, @RequestParam(value = "value", required = false) String value) {
        if (column != null) {
            List<Review> reviews = new ArrayList<>();
            if (column.equals("all")) {
                reviews = reviewService.getAllReviews();
            }if (column.equals("bookid") && value != null) {
                reviews = reviewService.getAllByBookID(Long.parseLong(value));
            }
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } else {
            return null;
        }
    }

    //DELETE
    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteReview(@PathVariable("id") Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ReviewNotFoundException("No Review with id '\" + id + \"' could be found to delete"));
        reviewService.deleteReview(review);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }


}