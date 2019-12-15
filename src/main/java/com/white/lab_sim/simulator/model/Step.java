package com.white.lab_sim.simulator.model;

import java.util.HashMap;

public class Step {
    private HashMap<String, HashMap<String, String>> map;
    private String brief;
    public Step() {
        map = new HashMap<>();
        brief = "";
    }

    public HashMap<String, HashMap<String, String>> getMap() {
        return map;
    }

    public void setMap(HashMap<String, HashMap<String, String>> map) {
        this.map = map;
    }

    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }
}
