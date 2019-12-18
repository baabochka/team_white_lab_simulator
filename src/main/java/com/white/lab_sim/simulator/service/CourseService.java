package com.white.lab_sim.simulator.service;

import com.white.lab_sim.market.model.User;
import com.white.lab_sim.market.repository.UserRepository;
import com.white.lab_sim.simulator.model.Course;
import com.white.lab_sim.simulator.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
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

    public Course newCourse(User user, String name, String section, String des){
        if(name == null && section == null)
            return null;
        Course course = new Course();
        course.setCreatedBy(user);
        course.setIf_public(false);
        course.setName(name);
        course.setSection(section);
        course.setDescription(des);
        courseRepository.save(course);
        return course;
    }

    public void deleteById(String id) {
        courseRepository.deleteById(id);
    }

    public Course findById(String id) {
        Optional<Course> o = courseRepository.findById(id);
        return o.orElse(null);
    }

    public List<Course> findByCreatedBy(User user) {
        return courseRepository.getByCreatedBy(user);
    }
    public List<Course> findAll() { return courseRepository.findAll();}
}
