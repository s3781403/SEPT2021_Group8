package com.rmit.sept.ordersmicroservice.service;

import com.rmit.sept.ordersmicroservice.exceptions.OrderNotFoundException;
import com.rmit.sept.ordersmicroservice.model.Order;
import com.rmit.sept.ordersmicroservice.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService{

    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order newOrder) {

        try {
            newOrder.setCartID(newOrder.getCartID());
            newOrder.setUserID(newOrder.getUserID());
            newOrder.setStatus(newOrder.getStatus());

            return newOrder;
        } catch(Exception e) {
            System.out.println("========| Error saving Order (OrderService) |========\n" + e.getMessage() + "\n====================");
            e.printStackTrace();
        }

    return null;
    }

    public List<Order> getAllOrders() {
        List<Order> list = new ArrayList<>();
        orderRepository.findAll().forEach(order -> list.add(order));
        return list;
    }

    public Order getOrderById(long id) {
        Order order = orderRepository.getOrderById(id);

        if (order != null) {
            return order;
        } else {
            throw new OrderNotFoundException("Order with id [" + id + "] could not be found");
        }
    }

    public List<Order> getAllOrdersByUserId(long userId) {
        List<Order> list = new ArrayList<>();
        orderRepository.findAllByUserID(userId).forEach(order -> list.add(order));
        return list;
    }

    public Order updateOrderStatus(Order oldOrder, String newStatus) {
        oldOrder.setUpdate_At(new Date());
        oldOrder.setStatus(newStatus);

        switch (newStatus) {
            case "Order Received":
                oldOrder.setOrderReceived_Date(new Date());
                break;
            case "In-Progress":
                oldOrder.setInProgress_Date(new Date());
                break;
            case "Shipped":
                oldOrder.setShipped_Date(new Date());
                break;
            case "Delivered":
                oldOrder.setDelivered_Date(new Date());
                break;
            case "Cancelled":
                oldOrder.setCancelled_Date(new Date());
        }
        return orderRepository.save(oldOrder);
    }


    public void deleteOrder(Order order) {
        orderRepository.delete(order);
    }
}
