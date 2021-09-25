package com.rmit.sept.booksmicroservices.model;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

// should implement bookdetails from service?

//Description
//Image (Cover image)
//Book table contents pdf

/* TODO
condition
stock
 */
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Unsure if we should require ISBN, as not every book will have one necessarily
//    @NotBlank(message = "ISBN is required to add a new book")
    private long isbn;
    @NotBlank(message = "Please enter a title")
    private String title;

    @NotBlank(message = "Please enter the category (genre)")
    private String category;

    @NotBlank(message = "Please enter the books author")
    private String author;

    @NotBlank(message = "Please enter the books publisher")
    private String publisher;

    @NotNull(message = "Please enter a price for the book")
    private double price;

    @NotBlank(message = "Books type (ebook or physical) is required")
    private String type;

    @NotNull(message = "Please choose the quality of the book")
    private int quality;

    @NotNull(message = "Please enter how many of this book you have in stock")
    private int stock;

    //    @NotBlank(message = "Seller")  //Seller ID would be sent by something? (not the user right?
    @NotNull(message = "You must have a seller ID")
    private int sellerID; //Unsure if this would be a feature of a book in this model

    @NotBlank(message = "Book requires a valid image URL")
    private String imageURL;

    private Date create_At;
    private Date update_At;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuality() {
        return quality;
    }

    public void setQuality(int condition) {
        this.quality = condition;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public long getIsbn() {
        return isbn;
    }

    public void setIsbn(long isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getSellerID() {
        return sellerID;
    }

    public void setSellerID(int sellerID) {
        this.sellerID = sellerID;
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }



    @PrePersist
    protected void onCreate() {
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }

    /*
    Do we implement an interface like in user (implements userdetails?)
    I don't think we do unless we have our own
     */


}