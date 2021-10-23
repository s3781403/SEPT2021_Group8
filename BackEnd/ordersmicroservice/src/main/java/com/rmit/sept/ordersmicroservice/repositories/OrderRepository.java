package com.rmit.sept.ordersmicroservice.repositories;

import com.rmit.sept.ordersmicroservice.model.Invoice;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Invoice, Long> {

    Invoice getOrderById(long id);
    Iterable<Invoice> findAll();
    Iterable<Invoice> findAllByUserID(long userID);

}
