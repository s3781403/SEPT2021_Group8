package com.rmit.sept.ordersmicroservice.service;

import com.rmit.sept.ordersmicroservice.model.BookDTO;
import com.rmit.sept.ordersmicroservice.model.Cart;
import com.rmit.sept.ordersmicroservice.model.LineItem;
import com.rmit.sept.ordersmicroservice.repositories.LineItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class LineItemService {

    @Autowired
    private LineItemRepository lineItemRepository;

    @Autowired
    private RestTemplateBuilder restTemplateBuilder;

    public LineItem saveLineItem(LineItem newLineItem, Cart cart) {
        try {
            newLineItem.setCart(cart);
            cart.setUpdate_At(new Date());
            newLineItem.setBookID(newLineItem.getBookID());
            String getBookURL = "http://localhost:8081/api/books/book/"+newLineItem.getBookID();
            BookDTO bookInfo = restTemplateBuilder.build().getForObject(getBookURL, BookDTO.class);
            newLineItem.setIsbn(bookInfo.getIsbn());
            newLineItem.setAuthor(bookInfo.getAuthor());
            newLineItem.setCategory(bookInfo.getCategory());
            newLineItem.setPrice(bookInfo.getPrice());
            newLineItem.setPublisher(bookInfo.getPublisher());
            newLineItem.setDescription(bookInfo.getDescription());
            newLineItem.setSellerID(bookInfo.getSellerID());
            newLineItem.setTitle(bookInfo.getTitle());
            newLineItem.setType(bookInfo.getType());
            newLineItem.setCreate_At(bookInfo.getCreate_At());
            newLineItem.setId(bookInfo.getId());
            newLineItem.setQuality(bookInfo.getQuality());
            newLineItem.setStock(bookInfo.getStock());
            newLineItem.setImageURL(bookInfo.getImageURL());
            newLineItem.setPdfURL(bookInfo.getPdfURL());
            newLineItem.setQuantity(newLineItem.getQuantity());

            return lineItemRepository.save(newLineItem);

        } catch(Exception e) {
            System.out.println("========| Error saving Line Item To cart (LineItemService) |========\n"+e.getMessage()+"\n====================");
            e.printStackTrace();
        }
        return null;
    }

    public void deleteLineItem(LineItem lineItem) {
        lineItemRepository.delete(lineItem);
    }
}
