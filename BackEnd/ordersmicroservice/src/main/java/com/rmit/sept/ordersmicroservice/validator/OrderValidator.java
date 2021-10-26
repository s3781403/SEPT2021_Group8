package com.rmit.sept.ordersmicroservice.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class OrderValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {return String.class.equals(aClass);}

    @Override
    public void validate(Object object, Errors errors) {

        String orderStatus = (String) object;

        if (!orderStatus.equals("Order Received") && !orderStatus.equals("In-Progress") && !orderStatus.equals("Shipped") && !orderStatus.equals("Delivered") && !orderStatus.equals("Cancelled")) {
            errors.rejectValue("status", "type", "Unrecognized status");
        }
    }
}
