package com.rmit.sept.booksmicroservices.model;

//Class for constructing mock books when testing
public class MockBook {

    public long isbn;
    public String author;
    public String category;
    public double price;
    public String publisher;
    public int sellerID;
    public String title;
    public String type;
    public int quality;
    public int stock;
    public String imageURL;


    public MockBook(long isbn, String title, String category, String author, String publisher, double price, String type, int quality, int stock, int sellerID, String imageURL) {
        this.isbn = isbn;
        this.author = author;
        this.category = category;
        this.price = price;
        this.publisher = publisher;
        this.sellerID=sellerID;
        this.title=title;
        this.type=type;
        this.quality=quality;
        this.stock=stock;
        this.imageURL=imageURL;
    }

}
