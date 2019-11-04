package com.white.lab_sim.market.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

public class Role {

    @Id
    private Long id;

    private String name;

    private Set<User> users;

    @Transient
    private AtomicInteger incrementor = new AtomicInteger(0);

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
