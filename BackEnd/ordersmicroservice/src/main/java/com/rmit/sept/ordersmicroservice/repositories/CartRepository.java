package com.rmit.sept.ordersmicroservice.repositories;

import com.rmit.sept.ordersmicroservice.model.Cart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {

    Cart getCartById(long id);
    Iterable<Cart> findAll();
    Iterable<Cart> getCartsByUserID(long userID);
    Iterable<Cart> getCartsByUserIDAndStatus(long userID, String status);

}
