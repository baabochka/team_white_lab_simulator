package com.white.lab_sim.simulator.repository;

import com.white.lab_sim.simulator.model.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PhotoRepository extends MongoRepository<Photo, String> {

}