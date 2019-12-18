package com.white.lab_sim.simulator.controller;

import com.white.lab_sim.market.model.User;
import com.white.lab_sim.market.service.UserServiceImpl;
import com.white.lab_sim.simulator.model.Course;
import com.white.lab_sim.simulator.model.Lab;
import com.white.lab_sim.simulator.service.CourseService;
import com.white.lab_sim.simulator.service.LabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class SimulatorController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    LabService labService;

    @Autowired
    CourseService courseService;

    @GetMapping({"/"})
    public String index(Authentication authentication) {
        if(authentication != null && authentication.isAuthenticated())
            return "redirect:/dashboard";
        return "index";
    }

    @RequestMapping({"/dashboard"})
    public String dashboard(HttpServletRequest request, Authentication authentication, Model model) {

        User user = userService.findByAuthentication(authentication);
        if(!user.getIsActive()) {
            try {
                authentication.setAuthenticated(false);
                request.logout();
                return "redirect:/verify";
            } catch (ServletException e) {
                e.printStackTrace();
            }
        }
        model.addAttribute("user", user);
        List<Course> courses = courseService.findByCreatedBy(user);
        List<Lab> labs = labService.findByCreatedBy(user);
        model.addAttribute("courses", courses);
        model.addAttribute("labs", labs);
        return "dashboard";
    }

    @RequestMapping({"/edit"})
    public String edit_lab(Authentication authentication, Model model) {
        User user = userService.findByAuthentication(authentication);
        model.addAttribute("user", user);
        return "edit";
    }

    @RequestMapping({"/load_equip"})
    public String load_equip() {
        labService.load_pre_equip();
        return "redirect:dashboard";
    }

    @GetMapping({"/addCourse"})
    public String addCoursePage(HttpServletRequest request, Authentication authentication, Model model) {
        User user = userService.findByAuthentication(authentication);
        model.addAttribute("user", user);
        return "addCourse";
    }

    @PostMapping({"/addCourse"})
    @ResponseBody
    public String createCourse(@RequestParam String courseName, @RequestParam String courseSection, @RequestParam String courseDescription,
                               Authentication authentication){
        courseService.newCourse(userService.findByAuthentication(authentication), courseName, courseSection, courseDescription);
        return null;
    }

    @RequestMapping({"/addLab"})
    public String addLabPage(HttpServletRequest request, Authentication authentication, Model model) {
        User user = userService.findByAuthentication(authentication);
        model.addAttribute("user", user);
        return "addLab";
    }

    @RequestMapping({"/market"})
    public String market(HttpServletRequest request, Authentication authentication, Model model) {
        User user = userService.findByAuthentication(authentication);
        if(!user.getIsActive()) {
            try {
                authentication.setAuthenticated(false);
                request.logout();
                return "redirect:/verify";
            } catch (ServletException e) {
                e.printStackTrace();
            }
        }
        model.addAttribute("user", user);
        //Get courses and labs from database
        List<Course> localCourses = courseService.findByCreatedBy(user);
        List<Lab> localLabs = labService.findByCreatedBy(user);
        List<Course> allCourses = courseService.findAll();
        List<Lab> allLabs = labService.findAll();

        //Remove local items from all items
        for (int i = 0; i < allCourses.size(); i++) {

            for (Course lc : localCourses) {
                if (allCourses.get(i).getId().equals(lc.getId())) {
                    allCourses.remove(allCourses.get(i));
                }
            }
        }

        model.addAttribute("localCourses", localCourses);
        model.addAttribute("localLabs", localLabs);
        model.addAttribute("allCourses", allCourses);
        model.addAttribute("allLabs", allLabs);
        return "market";
    }

    @PostMapping({"/market"})
    @ResponseBody
    public String saveAddedCourses(@RequestParam List<Course> addedCourses,
                               Authentication authentication){
        User user = userService.findByAuthentication(authentication);
        for (Course course : addedCourses) {
            courseService.newCourse(userService.findByAuthentication(authentication), course.getName(), course.getSection(), course.getDescription());
        }
        return "market";
    }

}
