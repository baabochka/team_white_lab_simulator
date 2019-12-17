package com.white.lab_sim.simulator.repository;

import com.white.lab_sim.market.model.User;
import com.white.lab_sim.simulator.model.Lab;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LabRepository extends MongoRepository<Lab, String> {
    List<Lab> getByCreatedBy(User user);
}
