package com.rmit.sept.ordersmicroservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleOrderNotFound(OrderNotFoundException ex, WebRequest request) {
        OrderNotFoundResponse exceptionReponse = new OrderNotFoundResponse(ex.getMessage());
        return new ResponseEntity(exceptionReponse, HttpStatus.BAD_REQUEST);

    }
}
