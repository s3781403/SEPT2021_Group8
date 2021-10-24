package com.rmit.sept.ordersmicroservice.service;

import com.rmit.sept.ordersmicroservice.exceptions.OrderNotFoundException;
import com.rmit.sept.ordersmicroservice.model.Cart;
import com.rmit.sept.ordersmicroservice.model.Invoice;
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

    public Invoice saveOrder(Invoice newInvoice, Cart cart) {

        try {
            newInvoice.setCart(cart);
            newInvoice.getCart().setStatus("Processed");
            newInvoice.setUserID(newInvoice.getUserID());
            newInvoice.setStatus(newInvoice.getStatus());
            newInvoice.setCurrency("AUD");
            newInvoice.setIntent("sale");
            newInvoice.setDescription("Online Payment to Bookero");
            newInvoice.setMethod("PayPal");
            newInvoice.setPrice(newInvoice.getPrice());
            switch (newInvoice.getStatus()) {
                case "Order Received":
                    newInvoice.setOrderReceived_Date(new Date());
                    break;
                case "In-Progress":
                    newInvoice.setInProgress_Date(new Date());
                    break;
                case "Shipped":
                    newInvoice.setShipped_Date(new Date());
                    break;
                case "Delivered":
                    newInvoice.setDelivered_Date(new Date());
                    break;
                case "Cancelled":
                    newInvoice.setCancelled_Date(new Date());
            }

            return orderRepository.save(newInvoice);
        } catch(Exception e) {
            System.out.println("========| Error saving Invoice (OrderService) |========\n" + e.getMessage() + "\n====================");
            e.printStackTrace();
        }

    return null;
    }

    public List<Invoice> getAllOrders() {
        List<Invoice> list = new ArrayList<>();
        orderRepository.findAll().forEach(order -> list.add(order));
        return list;
    }

    public Invoice getOrderById(long id) {
        Invoice invoice = orderRepository.getOrderById(id);

        if (invoice != null) {
            return invoice;
        } else {
            throw new OrderNotFoundException("Invoice with id [" + id + "] could not be found");
        }
    }

    public List<Invoice> getAllOrdersByUserId(long userId) {
        List<Invoice> list = new ArrayList<>();
        orderRepository.findAllByUserID(userId).forEach(order -> list.add(order));
        return list;
    }

    public Invoice updateOrderStatus(Invoice oldInvoice, String newStatus) {
        oldInvoice.setUpdate_At(new Date());
        oldInvoice.setStatus(newStatus);
        oldInvoice.getCart().setStatus("Processed");

        switch (newStatus) {
            case "Invoice Received":
                oldInvoice.setOrderReceived_Date(new Date());
                break;
            case "In-Progress":
                oldInvoice.setInProgress_Date(new Date());
                break;
            case "Shipped":
                oldInvoice.setShipped_Date(new Date());
                break;
            case "Delivered":
                oldInvoice.setDelivered_Date(new Date());
                break;
            case "Cancelled":
                oldInvoice.setCancelled_Date(new Date());
        }
        return orderRepository.save(oldInvoice);
    }


    public void deleteOrder(Invoice invoice) {
        orderRepository.delete(invoice);
    }
}
