package com.rmit.sept.booksmicroservices.model;

import java.time.LocalDate;
import java.util.Date;

//Class for constructing mock books when testing
public class MockBook {

    public Book createMockBook(Long id, long isbn, String title, String category, String author, String publisher, double price, String type, int quality, int stock, int sellerID, String imageURL) {
        Book book = new Book();

        book.setIsbn(isbn);
        book.setAuthor(author);
        book.setCategory(category);
        book.setPrice(price);
        book.setPublisher(publisher);
        book.setSellerID(sellerID);
        book.setTitle(title);
        book.setType(type);
        book.setId(id);
        book.setQuality(quality);
        book.setStock(stock);
        book.setImageURL(imageURL);

        return book;
    }

}
