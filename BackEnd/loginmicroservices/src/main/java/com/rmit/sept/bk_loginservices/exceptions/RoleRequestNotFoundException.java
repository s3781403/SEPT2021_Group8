package com.rmit.sept.bk_loginservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RoleRequestNotFoundException extends RuntimeException{
    public RoleRequestNotFoundException(String message) {
        super(message);
    }
}
