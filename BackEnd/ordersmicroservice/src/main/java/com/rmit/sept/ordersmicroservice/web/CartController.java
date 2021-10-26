package com.rmit.sept.ordersmicroservice.web;

import com.rmit.sept.ordersmicroservice.exceptions.CartNotFoundException;
import com.rmit.sept.ordersmicroservice.model.Cart;
import com.rmit.sept.ordersmicroservice.model.Invoice;
import com.rmit.sept.ordersmicroservice.model.LineItem;
import com.rmit.sept.ordersmicroservice.repositories.CartRepository;
import com.rmit.sept.ordersmicroservice.service.CartService;
import com.rmit.sept.ordersmicroservice.service.LineItemService;
import com.rmit.sept.ordersmicroservice.service.MapValidationErrorService;
import com.rmit.sept.ordersmicroservice.service.OrderService;
import com.rmit.sept.ordersmicroservice.validator.OrderValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderValidator orderValidator;

    @Autowired
    private LineItemService lineItemService;

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

    //GET CART BY ID
    @CrossOrigin(origins = "*")
    @GetMapping("/cart/{id}")
    public ResponseEntity<Cart> getCartByID(@PathVariable("id") Integer id) {

        Cart cart = cartService.getCartById(id);

        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    //GET CART BY USERID
    @CrossOrigin(origins = "*")
    @GetMapping("/cart/getSingle")
    public ResponseEntity<?> getCartByID(@RequestParam("column") String column, @RequestParam(value = "value", required = false) String value) {

        List<Cart> carts = new ArrayList<>();
        if (column.equals("userid") && value != null) {
            carts = cartService.getUnprocessedCartByUserID(Long.parseLong(value));
        }
        if(carts.size()>0){
            return new ResponseEntity<Cart>(carts.get(0), HttpStatus.OK);
        }

        return new ResponseEntity<List<Cart>>(carts, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAll")
    public ResponseEntity<List<Cart>> getListByRequestParameters(@RequestParam("column") String column, @RequestParam(value = "value", required = false) String value) {
        if (column != null) {
            List<Cart> carts = new ArrayList<>();
            if (column.equals("all")) {
                carts = cartService.getAllCarts();
            }if (column.equals("userid") && value != null) {
                carts = cartService.getAllByUserID(Long.parseLong(value));
            }
            return new ResponseEntity<>(carts, HttpStatus.OK);
        } else {
            return null;
        }
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

    //ADD LINEITEM TO CART
    @CrossOrigin(origins = "*")
    @PostMapping("/cart/{id}/addItem")
    public ResponseEntity<?> addToCart(@PathVariable("id") Long id, @Valid @RequestBody LineItem item, BindingResult result) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new CartNotFoundException("No cart with id '" + id + "' could be found"));
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        lineItemService.saveLineItem(item,cart);
        return new ResponseEntity<Cart>(cart, HttpStatus.CREATED);
    }

    //Create an invoice
    @CrossOrigin(origins = "*")
    @PostMapping("/cart/{id}/createOrder")
    public ResponseEntity<?> createOrder(@PathVariable("id") Long id, @Valid @RequestBody Invoice invoice, BindingResult result) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new CartNotFoundException("No cart with id '" + id + "' could be found to delete"));
        orderValidator.validate(invoice.getStatus(),result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        Invoice newInvoice = orderService.saveOrder(invoice,cart);
        return new ResponseEntity<>(newInvoice, HttpStatus.CREATED);
    }








}
