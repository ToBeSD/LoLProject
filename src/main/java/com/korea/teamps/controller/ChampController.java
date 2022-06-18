package com.korea.teamps.controller;

import com.korea.teamps.domain.ChampBasicStat;
import com.korea.teamps.domain.ChampName;
import com.korea.teamps.domain.ChampPatchHistory;
import com.korea.teamps.domain.ChampRank;
import com.korea.teamps.repository.ChampRepository;
import com.korea.teamps.service.ChampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ChampController {

    private ChampService champService;
    private ChampRepository champRepository;

    @Autowired
    public ChampController(ChampService champService, ChampRepository champRepository) {
        this.champService = champService;
        this.champRepository = champRepository;
    }

    @GetMapping("/champ")
    public String champ() {
        return "basic-info";
    }

    @GetMapping("/champ/patch")
    public String patchHistory() {
        return "patch-history";
    }

    @GetMapping("/champ/community")
    public String community() {
        return "champ-community";
    }

    @GetMapping("/champ/statistics")
    public String getStatistics(@RequestParam("name") String name, Model model) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        String headImage = champName.getHeadImage();
        model.addAttribute("name", name);
        model.addAttribute("headImage", headImage);
        return "statistics";
    }

    @GetMapping("/champ/rank")
    public String rank() {
        return "rank";
    }

    @PostMapping ("/champ/rankline")
    @ResponseBody
    public List<ChampRank> champLineRanks(@RequestBody ChampRank champRank) {
        return champRepository.findByLineChampRank(champRank);
    }

    @GetMapping("/champ/rankall")
    @ResponseBody
    public List<ChampRank> champAllRanks() {
        return champRepository.findAllChampRank();
    }
}
