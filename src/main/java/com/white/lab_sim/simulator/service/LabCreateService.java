package com.white.lab_sim.simulator.service;

import com.white.lab_sim.simulator.model.Equipment;
import com.white.lab_sim.simulator.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LabCreateService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    public void load_pre_equip() {
        equipmentRepository.deleteAll();
        String[] names = {"beaker", "flask", "pipette", "thermometer"};
        for (String name : names) {
            Equipment equipment = new Equipment();
            equipment.setName(name);
            equipmentRepository.save(equipment);
        }
    }
}
