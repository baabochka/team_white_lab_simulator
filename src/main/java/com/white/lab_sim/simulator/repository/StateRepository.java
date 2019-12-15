package com.white.lab_sim.simulator.repository;

import com.white.lab_sim.simulator.model.State;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StateRepository extends MongoRepository<State, String> {
}
