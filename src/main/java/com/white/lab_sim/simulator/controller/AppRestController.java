package com.white.lab_sim.simulator.controller;

import com.white.lab_sim.simulator.model.Course;
import com.white.lab_sim.simulator.repository.CourseRepository;
import com.white.lab_sim.simulator.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AppRestController {
    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @RequestMapping("/api/equipments")
    public Object getEquipments() {
        return equipmentRepository.findAll();
    }
}
