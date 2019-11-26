package com.white.lab_sim.simulator.model;

import com.white.lab_sim.market.model.MarketUnit;
import org.springframework.data.mongodb.core.mapping.MongoId;

public class Course extends MarketUnit {
    @MongoId
    String id;

    String name;
    String section;
    String description;

    public Course() { }

    public Course(String name, String section, String description) {
        this.name = name;
        this.section = section;
        this.description = description;
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

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
