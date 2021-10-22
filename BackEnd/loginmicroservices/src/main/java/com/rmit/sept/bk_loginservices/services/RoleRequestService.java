package com.rmit.sept.bk_loginservices.services;


import com.rmit.sept.bk_loginservices.Repositories.RoleRequestRepository;
import com.rmit.sept.bk_loginservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.RoleRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleRequestService {

    @Autowired
    private RoleRequestRepository roleRequestRepository;

    public RoleRequest saveRoleRequest (RoleRequest newRoleRequest){

        try{
            newRoleRequest.setUserID(newRoleRequest.getUserID());
            newRoleRequest.setRoleRequested(newRoleRequest.getRoleRequested());
            return roleRequestRepository.save(newRoleRequest);

        }catch (Exception e){
            throw new UsernameAlreadyExistsException("User ID '"+newRoleRequest.getUserID()+"' already has a pending request");
        }

    }

}
