package com.white.lab_sim.market.repository;

import com.white.lab_sim.market.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role, Long> {

}
