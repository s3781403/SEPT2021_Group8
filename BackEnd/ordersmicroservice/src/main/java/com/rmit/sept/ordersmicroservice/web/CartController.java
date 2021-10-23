package com.rmit.sept.ordersmicroservice.web;

import com.rmit.sept.ordersmicroservice.repositories.CartRepository;
import com.rmit.sept.ordersmicroservice.service.CartService;
import com.rmit.sept.ordersmicroservice.service.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.rmit.sept.ordersmicroservice.model.Cart;
import com.rmit.sept.ordersmicroservice.model.LineItem;
import com.rmit.sept.ordersmicroservice.exceptions.CartNotFoundException;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private CartService cartService;

    @Autowired
    private CartRepository cartRepository;

    //CREATE
    @CrossOrigin(origins = "*")
    @PostMapping("/create")
    public ResponseEntity<?> createCart(@Valid @RequestBody Cart cart, BindingResult result) {
        //cartValidator.validate(cart,result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        Cart newCart = cartService.saveCart(cart);
        return new ResponseEntity<Cart>(newCart, HttpStatus.CREATED);
    }

    //GET CART BY ID (RETURNS A LIST OF LINEITEMS)
    @CrossOrigin(origins = "*")
    @GetMapping("/cart/{id}")
    public ResponseEntity<List<LineItem>> getCartByID(@PathVariable("id") Integer id) {

        List<LineItem> items = new ArrayList<>();
        items = cartService.getCartById(id).getLineItems();

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    //DELETE
    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteCart(@PathVariable("id") Long id) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new CartNotFoundException("No cart with id '" + id + "' could be found to delete"));
        cartService.deleteCart(cart);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }




}
