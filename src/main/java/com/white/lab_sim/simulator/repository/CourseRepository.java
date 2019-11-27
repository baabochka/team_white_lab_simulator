package com.white.lab_sim.simulator.repository;

import com.white.lab_sim.market.model.User;
import com.white.lab_sim.simulator.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> getByCreatedBy(User user);
}
