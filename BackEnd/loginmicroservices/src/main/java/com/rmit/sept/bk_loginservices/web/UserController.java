package com.rmit.sept.bk_loginservices.web;


import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.InvalidLoginResponse;
import com.rmit.sept.bk_loginservices.exceptions.UserNotFoundException;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.ms_login;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSucessReponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.services.UserService;
import com.rmit.sept.bk_loginservices.validator.UserValidator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.rmit.sept.bk_loginservices.security.SecurityConstant.TOKEN_PREFIX;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LogManager.getLogger(ms_login.class);

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        logger.info("Registering a new user");
        // Validate passwords match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }


    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;


    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);
            logger.info("Logging in user");
            return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));

        }catch(BadCredentialsException e){
            return new ResponseEntity<>(new InvalidLoginResponse(), HttpStatus.BAD_REQUEST);
        }
        //Check password vs db here
    }

    //UPDATE
    //TODO secure this to ensure the user has correct permissions to create edits
    @CrossOrigin(origins = "*")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUserDetails(@PathVariable("id") Long id, @Valid @RequestBody User userDetails, BindingResult bindingResult) {
        //Check a user exists with the given ID
        User oldUser = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("No User with id '" + id + "' could be found to update"));

        //Validate the user details in the request body
        userValidator.validate(userDetails, bindingResult);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(bindingResult);
        if (errorMap != null) return errorMap;

        //Update and return the user
        User updatedUser = userService.updateUser(oldUser, userDetails);
        logger.info("Updating user");
        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
    }


    //DELETE
    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable("id") Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("No User with id '\" + id + \"' could be found to delete"));
        userService.deleteUser(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        logger.info("Deleting user");
        return response;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserByID(@PathVariable("id") Integer id) {
        User user = userService.getUserById(id);
        logger.info("Getting user by ID");
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getListByRequestParameters(@RequestParam("column") String column, @RequestParam(value = "value", required = false) String value) {
        if (column != null) {
            List<User> users = new ArrayList<>();
            if (column.equals("all")) {
                users = userService.getAllUsers();
            }
            logger.info("Getting all users");
            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return null;
        }
    }

}
