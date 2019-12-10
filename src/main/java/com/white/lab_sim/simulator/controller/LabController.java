package com.white.lab_sim.simulator.controller;

import com.white.lab_sim.market.model.MarketUnit;
import com.white.lab_sim.market.model.User;
import com.white.lab_sim.market.service.UserServiceImpl;
import com.white.lab_sim.simulator.model.Lab;
import com.white.lab_sim.simulator.service.LabService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LabController {

    @Autowired
    private LabService labService;
    @Autowired
    private UserServiceImpl userService;
    private Lab lab;
    private Model model;

    @RequestMapping("/create_lab")
    public String newLab(Authentication authentication) {
        Lab lab = labService.newLab(userService.findByAuthentication(authentication));
        return "redirect:/lab/" + lab.getId() + "/edit";
    }

    @RequestMapping("/lab/{id}/delete")
    public String deleteLab(@PathVariable String id) {
        labService.deleteById(id);
        return "redirect:/dashboard";
    }
    @RequestMapping("/lab/{id}/view")
    public String viewLab(@PathVariable String id) {

        return "redirect:/edit";
    }

    @RequestMapping("/lab/{id}/edit")
    public String editLab(@PathVariable String id, Model model, Authentication authentication) {
        Lab lab = labService.findById(id);
        User user = userService.findByAuthentication(authentication);
        if(!user.getId().equals(lab.getCreatedBy().getId())) {
            return "redirect:/dashboard";
        }
        model.addAttribute("user", user);
        model.addAttribute("lab", lab);
        return "lab_edit";
    }

    @RequestMapping("/lab/{id}/do")
    public String doLab(@PathVariable String id, Model model, Authentication authentication) {
        Lab lab = labService.findById(id);
        User user = userService.findByAuthentication(authentication);
//        if(!user.getId().equals(lab.getCreatedBy().getId())) {
//            return "redirect:/dashboard";
//        }
        // TODO check if user allowed to take lab?

        model.addAttribute("user", user);
        model.addAttribute("lab", lab);

//        System.out.println(model.getAttribute("user"));
        return "lab_do";
    }
}
