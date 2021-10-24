package com.rmit.sept.ordersmicroservice.service;

import com.rmit.sept.ordersmicroservice.exceptions.CartNotFoundException;
import com.rmit.sept.ordersmicroservice.model.Cart;
import com.rmit.sept.ordersmicroservice.model.LineItem;
import com.rmit.sept.ordersmicroservice.repositories.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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

    public List<Cart> getAllCarts() {
        List<Cart> list = new ArrayList<>();
        cartRepository.findAll().forEach(cart -> list.add(cart));
        return list;
    }

    public List<Cart> getAllByUserID(long id) {
        List<Cart> list = new ArrayList<>();
        cartRepository.getCartsByUserID(id).forEach(cart -> list.add(cart));
        return list;
    }



    public Cart addToCart(Cart cart, LineItem item){
        Set<LineItem> itemList = cart.getLineItems();
        itemList.add(item);
        cart.setLineItems(itemList);
        return cartRepository.save(cart);
    }

    public void deleteCart(Cart cart) {
        cartRepository.delete(cart);
    }
}
