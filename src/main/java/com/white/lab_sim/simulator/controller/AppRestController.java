package com.white.lab_sim.simulator.controller;

import com.white.lab_sim.simulator.model.Course;
import com.white.lab_sim.simulator.model.Equipment;
import com.white.lab_sim.simulator.repository.CourseRepository;
import com.white.lab_sim.simulator.repository.EquipmentRepository;
import com.white.lab_sim.simulator.repository.LabRepository;
import com.white.lab_sim.simulator.service.EquipmentService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Optional;

@RestController
public class AppRestController {
    @Autowired
    private EquipmentRepository equipmentRepository;
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private EquipmentService equipmentService;

    @Autowired
    private CourseRepository courseRepository;

    @RequestMapping("/api/equipments")
    public Object getEquipments() {
        return equipmentRepository.findAll();
    }

    @RequestMapping("/api/labs")
    public Object getLabs() {
        return labRepository.findAll();
    }

    @RequestMapping("/api/labs/{id}")
    public Object getLab(@PathVariable String id) {
        return labRepository.findById(id);
    }

    @GetMapping("api/equipments/image/{id}")
    public String getEquipmentImage(@PathVariable String id) {
        Equipment equipment = equipmentService.getEquipment(id);
        return Base64.getEncoder().encodeToString(equipment.getImage().getData());
    }
}
