package com.white.lab_sim.simulator.repository;

import com.white.lab_sim.market.model.User;
import com.white.lab_sim.simulator.model.Equipment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EquipmentRepository extends MongoRepository<Equipment, String> {
    Equipment getByCreatedBy(User user);
}
