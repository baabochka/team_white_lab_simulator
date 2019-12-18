package com.white.lab_sim.simulator.service;

import com.white.lab_sim.simulator.model.Equipment;
import com.white.lab_sim.simulator.repository.EquipmentRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    public String addEquipment(String name, MultipartFile file) throws IOException {

        Equipment equipment = new Equipment();
        equipment.setName(name);
        equipment.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        equipment = equipmentRepository.insert(equipment);
        return equipment.getId();
    }

    public Equipment getEquipment(String id) {
        System.err.println(id);
        Optional<Equipment> a = equipmentRepository.findById(id);
        System.err.println(a);
        return a.orElse(null);
    }
}
