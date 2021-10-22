package com.rmit.sept.booksmicroservices.validator;


import com.rmit.sept.booksmicroservices.model.Review;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class ReviewValidator implements Validator{

    @Override
    public boolean supports(Class<?> aClass) {
        return Review.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        //TODO Add any review validation required here
    }
}
