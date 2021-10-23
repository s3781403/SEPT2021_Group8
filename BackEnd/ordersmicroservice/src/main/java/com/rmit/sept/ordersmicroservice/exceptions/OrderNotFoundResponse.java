package com.rmit.sept.ordersmicroservice.exceptions;

public class OrderNotFoundResponse {
    private String id;

    public OrderNotFoundResponse(String id) {this.id = id;}

    public String getId() {return id;}

    public void setId(String id) {this.id = id;}
}
