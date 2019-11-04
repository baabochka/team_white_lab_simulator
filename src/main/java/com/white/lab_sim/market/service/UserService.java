package com.white.lab_sim.market.service;


import com.white.lab_sim.market.model.User;

public interface UserService {
    void save(User user);

    User findByUsername(String username);

    User findByEmail(String username);
}
