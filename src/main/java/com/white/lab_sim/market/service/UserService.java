package com.white.lab_sim.market.service;


import com.white.lab_sim.market.model.User;
import java.util.*;

public interface UserService {
    void save(User user);

    User findByUsername(String username);

    User findByEmail(String username);

    List<User> findAll();
}
