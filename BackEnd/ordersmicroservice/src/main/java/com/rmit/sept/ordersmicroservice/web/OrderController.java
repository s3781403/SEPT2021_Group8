package com.rmit.sept.ordersmicroservice.web;

import com.rmit.sept.ordersmicroservice.exceptions.OrderNotFoundException;
import com.rmit.sept.ordersmicroservice.model.Order;
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
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private OrderValidator orderValidator;

//Get
    //This should be only for admins, returns every order.
    @CrossOrigin(origins = "*")
    @GetMapping("/admin/getAllOrders")
    public ResponseEntity<List<Order>> getAllOrdersAdmin() {
        List<Order> orders = new ArrayList<>();
        orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // = "/api/orders/getAll?userid=124659015"
    //Get all orders for a specific user
    @CrossOrigin(origins = "*")
    @GetMapping("/getAll")
    public ResponseEntity<List<Order>> getAllOrdersUser(@RequestParam("userid") long userId) {
        List<Order> orders = new ArrayList<>();
        orders = orderService.getAllOrdersByUserId(userId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // "/api/orders/get?orderid=12905"
    // Get a single order by its id
    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public ResponseEntity<Order> getOrder(@RequestParam("orderid") long orderId) {
        Order order = orderService.getOrderById(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    //Create an order
    @CrossOrigin(origins = "*")
    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@Valid @RequestBody Order order, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        Order newOrder = orderService.saveOrder(order);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }

    // "/api/orders/update?orderid=1204"
    //Pass a string with the new order status
    //Update an order
    @CrossOrigin(origins = "*")
    @PutMapping("/update")
    public ResponseEntity<?> updateOrderDetails(@RequestParam("orderid") long orderId, @Valid @RequestBody String orderStatus, BindingResult result) {
        //Check an order exists with the given id
        orderValidator.validate(orderStatus,result);
        Order oldOrder = orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException("No order with that id could be found to update"));
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Order updatedOrder = orderService.updateOrderStatus(oldOrder, orderStatus);
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }

    //
    //Delete an order
    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete")
    public Map<String, Boolean> deleteBook(@RequestParam("orderid") Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException("No order with id '" + id + "' could be found to delete"));
        orderService.deleteOrder(order);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }


}
