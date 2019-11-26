package com.white.lab_sim.simulator.service;

import com.white.lab_sim.market.model.MarketUnit;
import com.white.lab_sim.market.model.User;
import com.white.lab_sim.market.repository.MarketUnitRepository;
import com.white.lab_sim.market.repository.UserRepository;
import com.white.lab_sim.simulator.model.Equipment;
import com.white.lab_sim.simulator.model.Lab;
import com.white.lab_sim.simulator.repository.EquipmentRepository;
import com.white.lab_sim.simulator.repository.LabRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LabService {

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
}
