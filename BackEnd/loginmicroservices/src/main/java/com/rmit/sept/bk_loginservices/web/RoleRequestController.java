package com.rmit.sept.bk_loginservices.web;


import com.rmit.sept.bk_loginservices.Repositories.RoleRequestRepository;
import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.RoleRequestNotFoundException;
import com.rmit.sept.bk_loginservices.exceptions.UserNotFoundException;
import com.rmit.sept.bk_loginservices.model.RoleRequest;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.services.RoleRequestService;
import com.rmit.sept.bk_loginservices.services.UserService;
import com.rmit.sept.bk_loginservices.validator.RoleRequestValidator;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "*")
    @PostMapping("/create")
    public ResponseEntity<?> createRoleRequest(@Valid @RequestBody RoleRequest roleRequest, BindingResult result){

        System.out.println("Creating a role request");

        roleRequestValidator.validate(roleRequest,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        RoleRequest newRoleRequest = roleRequestService.saveRoleRequest(roleRequest);

        return  new ResponseEntity<RoleRequest>(newRoleRequest, HttpStatus.CREATED);
    }

    //APPROVE ROLE REQUEST
    @CrossOrigin(origins = "*")
    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approveRoleRequest(@PathVariable("id") Long id) {

        RoleRequest request = roleRequestRepository.findById(id).orElseThrow(() -> new RoleRequestNotFoundException("No Role Request with id '" + id + "' could be found to process"));
        //Check a user exists with the given ID
        User oldUser = userRepository.findById(request.getUserID()).orElseThrow(() -> new UserNotFoundException("No User with id '" + request.getUserID() + "' could be found to update"));

        User updatedUser = userService.updateRole(oldUser, request.getRoleRequested());
        roleRequestService.deleteRoleRequest(request);
        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/getAll")
    public ResponseEntity<List<RoleRequest>> getListByRequestParameters(@RequestParam("column") String column, @RequestParam(value = "value", required = false) String value) {
        if (column != null) {
            List<RoleRequest> roleRequests = new ArrayList<>();
            if (column.equals("all")) {
                roleRequests = roleRequestService.getAllRoleRequests();
            }
            return new ResponseEntity<>(roleRequests, HttpStatus.OK);
        } else {
            return null;
        }
    }

    //DELETE
    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteRoleRequest(@PathVariable("id") Long id) {
        RoleRequest roleRequest = roleRequestRepository.findById(id).orElseThrow(() -> new RoleRequestNotFoundException("No Role Request with id '\" + id + \"' could be found to delete"));
        roleRequestService.deleteRoleRequest(roleRequest);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }




}
