package com.korea.teamps.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ChampController {
//    @GetMapping("/champ")
//    public String champ(@RequestParam("num") int champNum, Model model) {
//        model.addAttribute("num", champNum);
//        return "champ";
//    }

//    @GetMapping("/champ/statistics")
//    public String statistics(@RequestParam("num") int champNum, Model model) {
//        model.addAttribute("num", champNum);
//        return "statistics";
//    }

    @GetMapping("/champ/statistics")
    public String statistics() {
        return "statistics";
    }

    @GetMapping("/champ/rank")
    public String rank() {
        return "rank";
    }
}
