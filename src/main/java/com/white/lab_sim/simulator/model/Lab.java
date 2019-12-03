package com.white.lab_sim.simulator.model;

import com.white.lab_sim.market.model.MarketUnit;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Lab extends MarketUnit {
    private String Title;
    private String Description;

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }
}
