package com.korea.teamps.controller;

import com.korea.teamps.domain.ChampBasicStat;
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


//    @GetMapping("/champ")
//    @ResponseBody
//    public List<ChampBasicStat> champ(@RequestParam("name") String champName) {
//        return champRepository.findBasicStat(champName);
//    }

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

//    @GetMapping("/champ/patch")
//    @ResponseBody
//    public List<ChampPatchHistory> patchHistories(@RequestParam("name") String champName) {
//        return champRepository.findPatchHistory(champName);
//    }

    @PostMapping("/champ/statistics")
    public String statistics(@RequestParam("name") String name, Model model) {
        model.addAttribute("name", name);
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

//    @PostMapping("/champ/statistics/champname")
//    @ResponseBody
//    public ChampName postChampName(@RequestBody ChampName champName) {
//        return champRepository.findChampName(champName);
//    }
//
//    @GetMapping("/champ/statistics/champname")
//    @ResponseBody
//    public ChampName getChampName(ChampName champName) {
//        return champRepository.findChampName(champName);
//    }
}
