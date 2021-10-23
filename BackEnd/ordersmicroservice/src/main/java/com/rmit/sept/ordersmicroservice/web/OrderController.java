package com.rmit.sept.ordersmicroservice.web;

import com.rmit.sept.ordersmicroservice.exceptions.OrderNotFoundException;
import com.rmit.sept.ordersmicroservice.model.Invoice;
import com.rmit.sept.ordersmicroservice.repositories.CartRepository;
import com.rmit.sept.ordersmicroservice.repositories.OrderRepository;
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
@RequestMapping("/api/orders")
public class OrderController {
    //Get mapping for order
    //Post mapping for order creation
    //Post mapping to update an order status
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private OrderValidator orderValidator;

//Get
    //This should be only for admins, returns every order.
    @CrossOrigin(origins = "*")
    @GetMapping("/admin/getAllOrders")
    public ResponseEntity<List<Invoice>> getAllOrdersAdmin() {
        List<Invoice> invoices = new ArrayList<>();
        invoices = orderService.getAllOrders();
        return new ResponseEntity<>(invoices, HttpStatus.OK);
    }

    // = "/api/orders/getAll?userid=124659015"
    //Get all invoices for a specific user
    @CrossOrigin(origins = "*")
    @GetMapping("/getAll")
    public ResponseEntity<List<Invoice>> getAllOrdersUser(@RequestParam("userid") long userId) {
        List<Invoice> invoices = new ArrayList<>();
        invoices = orderService.getAllOrdersByUserId(userId);
        return new ResponseEntity<>(invoices, HttpStatus.OK);
    }

    // "/api/orders/get?orderid=12905"
    // Get a single order by its id
    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public ResponseEntity<Invoice> getOrder(@RequestParam("orderid") long orderId) {
        Invoice invoice = orderService.getOrderById(orderId);
        return new ResponseEntity<>(invoice, HttpStatus.OK);
    }

//    //Create an invoice
//    @CrossOrigin(origins = "*")
//    @PostMapping("/create/{id}")
//    public ResponseEntity<?> createOrder(@PathVariable("id") Long id, @Valid @RequestBody Invoice invoice, BindingResult result) {
//        Cart cart = cartRepository.findById(id).orElseThrow(() -> new CartNotFoundException("No cart with id '" + id + "' could be found to delete"));
//        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//        if(errorMap != null) return errorMap;
//        Invoice newInvoice = orderService.saveOrder(invoice,cart);
//        return new ResponseEntity<>(newInvoice, HttpStatus.CREATED);
//    }

    // "/api/orders/update?orderid=1204"
    //Pass a string with the new order status
    //Update an order
    @CrossOrigin(origins = "*")
    @PutMapping("/update")
    public ResponseEntity<?> updateOrderDetails(@RequestParam("orderid") long orderId, @Valid @RequestBody Invoice orderStatus, BindingResult result) {
        //Check an order exists with the given id
        Invoice oldInvoice = orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException("No order with that id could be found to update"));

        orderValidator.validate(orderStatus.getStatus(),result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Invoice updatedInvoice = orderService.updateOrderStatus(oldInvoice, orderStatus.getStatus());
        return new ResponseEntity<>(updatedInvoice, HttpStatus.OK);
    }

    //
    //Delete an order
    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteBook(@PathVariable("id") Long id) {
        Invoice invoice = orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException("No invoice with id '" + id + "' could be found to delete"));
        orderService.deleteOrder(invoice);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }


}
