package com.rmit.sept.ordersmicroservice.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long userID;
    //Invoice Received, In progress, Shipped, Delivered, Cancelled
    private Date orderReceived_Date;
    private Date inProgress_Date;
    private Date shipped_Date;
    private Date delivered_Date;
    private Date cancelled_Date;
    private String status;



    //Additional Fields Added for PayPal API
    private double price;
    private String currency;
    private String method;
    private String intent;
    private String description;

    private Date create_At;
    private Date update_At;

    @OneToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    private Cart cart;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {return update_At;}

    public void setUpdate_At(Date update_At) {this.update_At = update_At;}

    public long getUserID() {
        return userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cartID) {
        this.cart = cartID;
    }

    public String getStatus() {return status;}

    public void setStatus(String status) {this.status = status;}

    public Date getOrderReceived_Date() {
        return orderReceived_Date;
    }

    public void setOrderReceived_Date(Date orderReceived_Date) {
        this.orderReceived_Date = orderReceived_Date;
    }

    public Date getInProgress_Date() {
        return inProgress_Date;
    }

    public void setInProgress_Date(Date inProgress_Date) {
        this.inProgress_Date = inProgress_Date;
    }

    public Date getShipped_Date() {
        return shipped_Date;
    }

    public void setShipped_Date(Date shipped_Date) {
        this.shipped_Date = shipped_Date;
    }

    public Date getDelivered_Date() {
        return delivered_Date;
    }

    public void setDelivered_Date(Date delivered_Date) {
        this.delivered_Date = delivered_Date;
    }

    public Date getCancelled_Date() {
        return cancelled_Date;
    }

    public void setCancelled_Date(Date cancelled_Date) {
        this.cancelled_Date = cancelled_Date;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getIntent() {
        return intent;
    }

    public void setIntent(String intent) {
        this.intent = intent;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @PrePersist
    protected void onCreate() {
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }


}
