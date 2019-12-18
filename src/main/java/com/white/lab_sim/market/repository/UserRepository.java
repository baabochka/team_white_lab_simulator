package com.white.lab_sim.market.repository;

import com.white.lab_sim.market.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository<T extends User> extends MongoRepository<User, Long> {
    T findByUsername(String username);
    T findByEmail(String email);
//    T findAll();
}
