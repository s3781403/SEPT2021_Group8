package com.rmit.sept.bk_loginservices.validator;

import com.rmit.sept.bk_loginservices.model.RoleRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class RoleRequestValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return RoleRequest.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        RoleRequest roleRequest = (RoleRequest) object;

        if (!roleRequest.getRoleRequested().equals("Customer") && !roleRequest.getRoleRequested().equals("Seller") && !roleRequest.getRoleRequested().equals("Admin")) {
            errors.rejectValue("type", "Mismatch", "Role Request must be for a valid role, either Customer, Seller, or Admin");
        }

    }
}
