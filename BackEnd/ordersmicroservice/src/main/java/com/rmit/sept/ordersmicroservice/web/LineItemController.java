package com.rmit.sept.ordersmicroservice.web;

import com.rmit.sept.ordersmicroservice.exceptions.LineItemNotFoundException;
import com.rmit.sept.ordersmicroservice.model.LineItem;
import com.rmit.sept.ordersmicroservice.repositories.LineItemRepository;
import com.rmit.sept.ordersmicroservice.service.LineItemService;
import com.rmit.sept.ordersmicroservice.service.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
public class LineItemController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private LineItemService lineItemService;

    @Autowired
    private LineItemRepository lineItemRepository;

//    //CREATE
//    @CrossOrigin(origins = "*")
//    @PostMapping("/add")
//    public ResponseEntity<?> createLineItem(@Valid @RequestBody LineItem lineItem, BindingResult result) {
//        //LineItemValidator.validate(cart,result);
//        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//        if(errorMap != null) return errorMap;
//        LineItem newLineItem = lineItemService.saveLineItem(lineItem);
//        return new ResponseEntity<LineItem>(newLineItem, HttpStatus.CREATED);
//    }

    //DELETE
    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteCart(@PathVariable("id") Long id) {
        LineItem lineItem = lineItemRepository.findById(id).orElseThrow(() -> new LineItemNotFoundException("No lineItem with id '" + id + "' could be found to delete"));
        lineItemService.deleteLineItem(lineItem);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }


}
