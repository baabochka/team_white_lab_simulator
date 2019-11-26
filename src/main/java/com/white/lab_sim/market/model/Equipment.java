package com.white.lab_sim.market.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document
public class Equipment {

    private String id;

    private String name;

    private String description;

    public Set<String> getStates() {
        return states;
    }

    public void setStates(Set<String> states) {
        this.states = states;
    }

    private Set<String> states;

    public Equipment() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
