package com.rmit.sept.bk_loginservices.services;


import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser){

      /*  newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        //Username has to be unique (exception)
        // Make sure that password and confirmPassword match
        // We don't persist or show the confirmPassword
        return userRepository.save(newUser);
       */
        try{
            newUser.setRole(newUser.getRole());
            newUser.setABN(newUser.getABN());
            newUser.setAddress(newUser.getAddress());
            newUser.setPhoneNumber(newUser.getPhoneNumber());
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);

        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
        }

    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public User updateUser(User oldUser, User userDetails) {
        try{
            oldUser.setUpdate_At(new Date());
            oldUser.setRole(userDetails.getRole());
            oldUser.setABN(userDetails.getABN());
            oldUser.setAddress(userDetails.getAddress());
            oldUser.setPhoneNumber(userDetails.getPhoneNumber());
            oldUser.setPassword(bCryptPasswordEncoder.encode(userDetails.getPassword()));
            oldUser.setUsername(userDetails.getUsername());
            oldUser.setConfirmPassword("");
            return userRepository.save(oldUser);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+userDetails.getUsername()+"' already exists");
        }

    }


}
