package com.rmit.sept.ordersmicroservice.model;

public class orderCreation {

    public int userID;
    public String status;
    public long price;

    public orderCreation(int userID, String status, long price){
        this.userID=userID;
        this.status=status;
        this.price=price;
    }
}
