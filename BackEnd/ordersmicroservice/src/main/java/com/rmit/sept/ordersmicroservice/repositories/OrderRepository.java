package com.rmit.sept.ordersmicroservice.repositories;

import com.rmit.sept.ordersmicroservice.model.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

    Order getOrderById(long id);
    Iterable<Order> findAll();
    Iterable<Order> findAllByUserID(long userID);

}
