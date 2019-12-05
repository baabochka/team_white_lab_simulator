package com.white.lab_sim.simulator.model;

import com.white.lab_sim.market.model.MarketUnit;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Lab extends MarketUnit {
    private String Title;
    private String Description;
    private List<Equipment> equipmentList;
    private List<Step> stepList;

    public List<Equipment> getEquipmentList() {
        return equipmentList;
    }

    public void setEquipmentList(List<Equipment> equipmentList) {
        this.equipmentList = equipmentList;
    }

    public List<Step> getStepList() {
        return stepList;
    }

    public void setStepList(List<Step> stepList) {
        this.stepList = stepList;
    }

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
