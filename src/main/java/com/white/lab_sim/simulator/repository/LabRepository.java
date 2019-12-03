package com.white.lab_sim.simulator.repository;

import com.white.lab_sim.simulator.model.Lab;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LabRepository extends MongoRepository<Lab, String> {
}
