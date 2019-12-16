package com.white.lab_sim.simulator.model;

import java.util.ArrayList;
import java.util.HashMap;

public class StateMap extends HashMap<String, State>{

    public State remove(String id) {
        return super.remove(id);
    }

    public State put(String id, State state) {
        return super.put(id, state);
    }

}
