package com.white.lab_sim.simulator.controller;

import com.white.lab_sim.market.model.User;
import com.white.lab_sim.market.service.UserServiceImpl;
import com.white.lab_sim.simulator.service.LabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@Controller
public class SimulatorController {

    @Autowired
    UserServiceImpl userService;
    @Autowired
    LabService labService;
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

    @RequestMapping({"/addCourse"})
    public String coursePage(HttpServletRequest request, Authentication authentication, Model model) {
        User user = userService.findByAuthentication(authentication);
        model.addAttribute("user", user);
        return "addCourse";
    }
}
