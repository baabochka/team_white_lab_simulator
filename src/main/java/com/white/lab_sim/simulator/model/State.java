package com.white.lab_sim.simulator.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;

@Document
public class State {

    private String id;
    private String name;
    private String equipmentId;
    private HashMap<String, String> info;

    public State(String equipmentId) {
        this.equipmentId = equipmentId;
        this.info = new HashMap<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(String equipmentId) {
        this.equipmentId = equipmentId;
    }

    public HashMap<String, String> getInfo() {
        return info;
    }

    public void setInfo(HashMap<String, String> info) {
        this.info = info;
    }
}
