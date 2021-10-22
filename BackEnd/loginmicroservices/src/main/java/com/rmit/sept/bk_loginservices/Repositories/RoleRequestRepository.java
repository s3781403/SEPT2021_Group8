package com.rmit.sept.bk_loginservices.Repositories;

import com.rmit.sept.bk_loginservices.model.RoleRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRequestRepository extends CrudRepository<RoleRequest, Long> {

    RoleRequest getById(Long id);

}
