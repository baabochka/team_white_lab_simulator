package com.white.lab_sim.simulator.controller;

import com.white.lab_sim.market.model.User;
import com.white.lab_sim.market.service.UserServiceImpl;
import com.white.lab_sim.simulator.model.Lab;
import com.white.lab_sim.simulator.service.LabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Controller
public class LabController {

    @Autowired
    private LabService labService;
    @Autowired
    private UserServiceImpl userService;

    @RequestMapping("/create_lab")
    public String newLab(Authentication authentication) {
        System.err.println("create");
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
        lab.performSteps(lab.getSteps().size());
        model.addAttribute("user", user);
        model.addAttribute("lab", lab);
        return "lab_edit";
    }

    @PostMapping("/lab/{id}/add_from_cart")
    @ResponseBody
    public String addFromCart(@PathVariable String id, Authentication authentication, @RequestParam HashMap<String, String> counter) {
        labService.addStateList(id, counter);
        return "ok";
    }

    @PostMapping("/perform_step_states")
    @ResponseBody
    public Object getStepStates(@RequestParam String id, @RequestParam int count) {
        return labService.performStep(id, count);
    }


    @PostMapping("/lab/{id}/change_base_info")
    @ResponseBody
    public String changeBaseInfo(@PathVariable String id, @RequestParam String name, @RequestParam String description) {
        labService.changeBaseInfo(id, name, description);
        return "ok";
    }

    @PostMapping("/lab/{id}/change_step_brief")
    @ResponseBody
    public String changeStepBrief(@PathVariable String id, @RequestParam int i, @RequestParam String brief) {
        labService.changeStepBrief(id, i, brief);
        return "ok";
    }
    @PostMapping("/lab/{id}/add_step")
    @ResponseBody
    public String addStep(@PathVariable String id) {
        labService.addStep(id);
        return "ok";
    }

    @PostMapping("/lab/{id}/changeStateName/{stateId}")
    @ResponseBody
    public String changeStateName(@PathVariable String id, @PathVariable String stateId, @RequestParam String name) {
        labService.changeStateName(id, stateId, name);
        return "ok";
    }

    @PostMapping("/lab/{id}/changeStepState")
    @ResponseBody
    public String changeStepState(@PathVariable String id, @RequestParam int stepId, @RequestParam String stateId, @RequestParam(value = "property[]") String[] properties, @RequestParam(value = "value[]") String[] values) {
        labService.changeStepState(id, stepId, stateId, properties, values);
        return "ok";
    }

    @PostMapping("/lab/{id}/perform")
    @ResponseBody
    public Object perform(@PathVariable String id, @RequestParam int count) {
        return labService.perform(id, count);
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
