package com.white.lab_sim.simulator.model;

import com.white.lab_sim.market.model.MarketUnit;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document
public class Lab extends MarketUnit {
    private String title;
    private String description;
    private StateMap stateMap;
    private ArrayList<Step> steps;

    public Lab() {
        title = "New Lab";
        description = "No description yet";
        stateMap = new StateMap();
        steps = new ArrayList<>();
        this.initial_steps();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ArrayList<Step> getSteps() {
        return steps;
    }

    public void setSteps(ArrayList<Step> steps) {
        this.steps = steps;
    }

    public StateMap getStateMap() {
        return stateMap;
    }

    public void setStateMap(StateMap stateMap) {
        this.stateMap = stateMap;
    }

    private void initial_steps() {
        Step step = new Step();
        step.setBrief("Setup Equipments.(Student won't see this step.)");
        steps.add(step);
    }

    public void performSteps(int count) {
        for(int i = 0; i < count; i++) {
            Step step = steps.get(i);
            step.getMap().forEach((k, v) -> {
                stateMap.get(k).setInfo(v);
            });
        }
    }
}
