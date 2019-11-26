package com.white.lab_sim.simulator.repository;

import com.white.lab_sim.simulator.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepository extends MongoRepository<Course, String> {
}
