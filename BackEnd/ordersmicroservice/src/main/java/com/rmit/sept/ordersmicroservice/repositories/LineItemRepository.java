package com.rmit.sept.ordersmicroservice.repositories;

import com.rmit.sept.ordersmicroservice.model.LineItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LineItemRepository extends CrudRepository<LineItem, Long> {

    LineItem getLineItemById(long id);
    Iterable<LineItem> findAll();

}
