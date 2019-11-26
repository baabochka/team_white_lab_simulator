package com.white.lab_sim.simulator.service;

import com.white.lab_sim.market.model.User;
import com.white.lab_sim.market.repository.UserRepository;
import com.white.lab_sim.simulator.model.Course;
import com.white.lab_sim.simulator.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class CourseService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Course newCourse(User user){
        Course course = new Course();
        course.setCreatedBy(user);
        course.setIf_public(false);
        courseRepository.save(course);
        return course;
    }
}
