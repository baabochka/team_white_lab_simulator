package com.white.lab_sim.simulator.service;

import com.white.lab_sim.market.model.MarketUnit;
import com.white.lab_sim.market.model.User;
import com.white.lab_sim.market.repository.MarketUnitRepository;
import com.white.lab_sim.market.repository.UserRepository;
import com.white.lab_sim.simulator.model.*;
import com.white.lab_sim.simulator.repository.EquipmentRepository;
import com.white.lab_sim.simulator.repository.LabRepository;
import com.white.lab_sim.simulator.repository.StateRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LabService {

    @Autowired
    private StateRepository stateRepository;
    @Autowired
    private EquipmentRepository equipmentRepository;
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private UserRepository userRepository;
    public void load_pre_equip() {
        equipmentRepository.deleteAll();
        String[] names = {"beaker", "flask", "pipette", "thermometer"};
        for (String name : names) {
            Equipment equipment = new Equipment();
            equipment.setName(name);
            equipmentRepository.save(equipment);
        }
    }

    public Lab newLab(User user) {
        Lab l = new Lab();
        l.setIf_public(false);
        l.setCreatedBy(user);
        labRepository.save(l);
        return l;
    }

    public void deleteById(String id) {
        labRepository.deleteById(id);
    }

    public Lab findById(String id) {
        Optional<Lab> o = labRepository.findById(id);
        return o.orElse(null);
    }

    public void addStateList(String id, HashMap<String, String> counter) {
        Optional<Lab> o = labRepository.findById(id);
        if(o.isPresent()) {
            StateMap stateMap = o.get().getStateMap();
            for (Map.Entry mapElement : counter.entrySet()) {
                String key = (String)mapElement.getKey();
                int value = Integer.parseInt((String)mapElement.getValue());
                for(int i = 0; i < value; i++) {
                    State state = new State(key);
                    stateRepository.save(state);
                    state.setName(state.getId().substring(state.getId().length() - 5));
                    stateRepository.save(state);
                    stateMap.put(state.getId(), state);
                }
            }
            labRepository.save(o.get());
        }

    }

    public void removeStateList(String id, String key) {
        Optional<Lab> o = labRepository.findById(id);
        if(o.isPresent()) {
            StateMap stateMap = o.get().getStateMap();
            stateMap.remove(key);
            stateRepository.deleteById(key);
            labRepository.save(o.get());
        }
    }

    public HashMap<String, State> performStep(String id, int count) {
        Optional<Lab> o = labRepository.findById(id);
        HashMap<String, State> map = new HashMap<>();
        if(o.isPresent()) {
            StateMap stateMap = o.get().getStateMap();
            stateMap.forEach(map::put);
            ArrayList<Step> steps = o.get().getSteps();
            for(int i = 0; i < count; i++) {
                Step s = steps.get(i);
                s.getMap().forEach((k, v)-> {
                    map.get(k).setInfo(v);
                });
            }
        }
        return map;
    }

    public void changeBaseInfo(String id, String name, String description) {
        Optional<Lab> o = labRepository.findById(id);
        if(o.isPresent()) {
            Lab lab = o.get();
            lab.setTitle(name);
            lab.setDescription(description);
            labRepository.save(lab);
        }
    }

    public void addStep(String id) {
        Optional<Lab> o = labRepository.findById(id);
        if(o.isPresent()) {
            Lab lab = o.get();
            lab.getSteps().add(new Step());
            labRepository.save(lab);
        }
    }

    public void changeStepBrief(String id, int i, String brief) {
        System.err.println("change");
        Optional<Lab> o = labRepository.findById(id);
        if(o.isPresent()) {
            Lab lab = o.get();
            lab.getSteps().get(i).setBrief(brief);
            labRepository.save(lab);
        }
    }


    public void changeStateName(String id, String stateId, String name) {
        Optional<Lab> l = labRepository.findById(id);
        if(l.isPresent()) {
            Lab lab = l.get();
            lab.getStateMap().get(stateId).setName(name);
            labRepository.save(lab);
        }
    }


    public void changeStepState(String id, int stepId, String stateId, String[] props, String[] values) {
        if(stateId.equals("-1")) {
            return;
        }
        Optional<Lab> l = labRepository.findById(id);
        if(l.isPresent()) {
            Lab lab = l.get();
            HashMap<String, HashMap<String, String>> map = lab.getSteps().get(stepId).getMap();
            updateMap(map, stateId, props, values);
            labRepository.save(lab);
        }
    }

    public void fullUpdateStep(String id, int stepId, String stateId1, String[] properties1, String[] values1, String stateId2, String[] properties2, String[] values2) {
        Optional<Lab> l = labRepository.findById(id);
        if(l.isPresent()) {
            Lab lab = l.get();
            HashMap<String, HashMap<String, String>> map = new HashMap<>();
            updateMap(map, stateId1, properties1, values1);
            updateMap(map, stateId2, properties2, values2);
            lab.getSteps().get(stepId).setMap(map);
            labRepository.save(lab);
        }
    }

    private void updateMap(HashMap<String, HashMap<String, String>> map, String stateId, String[] props, String[] values) {
        if(stateId.equals("-1")) {
            return;
        }
        HashMap<String, String> fields = new HashMap<>();
        for(int i = 0; i < props.length; i++) {
            String prop = props[i].substring(1);
            String value = values[i].substring(1);
            if(prop.length() == 0 && value.length() == 0) {
                continue;
            }
            fields.put(prop, value);
        }
        map.put(stateId, fields);
    }

    public void removeState(String id, String stateId) {
        Optional<Lab> l = labRepository.findById(id);
        if(l.isPresent()) {
            Lab lab = l.get();
            lab.getStateMap().remove(stateId);
            lab.getSteps().get(0).getMap().remove(stateId);
            labRepository.save(lab);
        }
    }

    public void deleteStep(String id, int stepId) {
        Optional<Lab> l = labRepository.findById(id);
        if(l.isPresent()) {
            Lab lab = l.get();
            lab.getSteps().remove(stepId);
            labRepository.save(lab);
        }
    }
}
