package com.rmit.sept.ordersmicroservice.service;

import com.rmit.sept.ordersmicroservice.model.Cart;
import com.rmit.sept.ordersmicroservice.model.LineItem;
import com.rmit.sept.ordersmicroservice.repositories.LineItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class LineItemService {

    @Autowired
    private LineItemRepository lineItemRepository;

    public LineItem saveLineItem(LineItem newLineItem, Cart cart) {
        try {
            newLineItem.setCart(cart);
            cart.setUpdate_At(new Date());
            newLineItem.setBookID(newLineItem.getBookID());
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
