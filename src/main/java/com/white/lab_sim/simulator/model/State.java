package com.white.lab_sim.simulator.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document
public class State {
    @MongoId
    String id;

    Equipment equipment;
    String label;

}
