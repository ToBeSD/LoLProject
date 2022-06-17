package com.korea.teamps.controller;

import com.korea.teamps.domain.ChampMainCard;
import com.korea.teamps.domain.ChampRank;
import com.korea.teamps.service.ChampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class HomeController {

    private ChampService champService;
    @Autowired
    public HomeController(ChampService champService) {
        this.champService = champService;
    }


    @GetMapping("/")
    public String home() {
        return "main";
    }

    @GetMapping("/maincard")
    @ResponseBody
    public List<ChampMainCard> getMainCard() {
        return champService.attentionList();
    }

    @GetMapping("/minigame")
    public String minigame() {
        return "minigame";
    }
}
