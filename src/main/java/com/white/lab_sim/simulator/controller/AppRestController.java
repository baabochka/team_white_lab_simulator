package com.white.lab_sim.simulator.controller;

import com.white.lab_sim.simulator.model.Course;
import com.white.lab_sim.simulator.repository.CourseRepository;
import com.white.lab_sim.simulator.repository.EquipmentRepository;
import com.white.lab_sim.simulator.repository.LabRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AppRestController {
    @Autowired
    private EquipmentRepository equipmentRepository;
    @Autowired
    private LabRepository labRepository;

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
}
