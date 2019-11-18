package com.white.lab_sim.simulator.controller;

import com.white.lab_sim.simulator.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppRestController {
    @Autowired
    private EquipmentRepository equipmentRepository;

    @RequestMapping("/api/equipments")
    public Object getEquipments() {
        return equipmentRepository.findAll();
    }
}
