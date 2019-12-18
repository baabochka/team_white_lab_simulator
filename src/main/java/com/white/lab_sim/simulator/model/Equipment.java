package com.white.lab_sim.simulator.model;

import com.white.lab_sim.market.model.MarketUnit;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Equipment extends MarketUnit {

    private String name;

    private Binary image;

    public Binary getImage() {
        return image;
    }

    public void setImage(Binary image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
