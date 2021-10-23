package com.rmit.sept.ordersmicroservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rmit.sept.ordersmicroservice.model.Cart;
import com.rmit.sept.ordersmicroservice.repositories.CartRepository;
import com.rmit.sept.ordersmicroservice.exceptions.CartNotFoundException;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart saveCart(Cart newCart) {
        try {
            newCart.setUserID(newCart.getUserID());

            return cartRepository.save(newCart);

        } catch(Exception e) {
            System.out.println("========| Error saving Cart (CartService) |========\n"+e.getMessage()+"\n====================");
            e.printStackTrace();
        }
        return null;
    }

    public Cart getCartById(long id) {
        Cart cart = cartRepository.getCartById(id);
        if (cart != null) {
            return cart;
        }
        else {
            throw new CartNotFoundException("Cart with id '" + id + "' could not be found");
        }
    }

    public void deleteCart(Cart cart) {
        cartRepository.delete(cart);
    }
}
