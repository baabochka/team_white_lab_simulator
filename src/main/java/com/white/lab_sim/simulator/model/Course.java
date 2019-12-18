package com.white.lab_sim.simulator.model;

import com.white.lab_sim.market.model.MarketUnit;
import com.white.lab_sim.market.model.User;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document
public class Course extends MarketUnit {


    String name;
    String section;
    String description;
    List<Lab> labs;
    List<User> students;

    public Course() { }

    public Course(String name, String section, String description) {
        this.name = name;
        this.section = section;
        this.description = description;
        labs = null;
        students = null;
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

    public List<Lab> getLabs() {
        return labs;
    }

    public void setLabs(List<Lab> labs) {
        this.labs = labs;
    }

    public List<User> getStudents() {
        return students;
    }

    public void setStudents(List<User> students) {
        this.students = students;
    }
}
