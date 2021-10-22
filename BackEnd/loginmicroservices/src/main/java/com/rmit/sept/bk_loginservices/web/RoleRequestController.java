package com.rmit.sept.bk_loginservices.web;


import com.rmit.sept.bk_loginservices.Repositories.RoleRequestRepository;
import com.rmit.sept.bk_loginservices.model.RoleRequest;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.services.RoleRequestService;
import com.rmit.sept.bk_loginservices.validator.RoleRequestValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/rolerequests")
public class RoleRequestController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private RoleRequestService roleRequestService;

    @Autowired
    private RoleRequestValidator roleRequestValidator;

    @Autowired
    private RoleRequestRepository roleRequestRepository;

    @CrossOrigin(origins = "*")
    @PostMapping("/create")
    public ResponseEntity<?> createRoleRequest(@Valid @RequestBody RoleRequest roleRequest, BindingResult result){

        roleRequestValidator.validate(roleRequest,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        RoleRequest newRoleRequest = roleRequestService.saveRoleRequest(roleRequest);

        return  new ResponseEntity<RoleRequest>(newRoleRequest, HttpStatus.CREATED);
    }




}
