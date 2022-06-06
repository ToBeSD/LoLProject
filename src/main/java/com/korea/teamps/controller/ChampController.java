package com.korea.teamps.controller;

import com.korea.teamps.domain.ChampBasicStat;
import com.korea.teamps.domain.ChampPatchHistory;
import com.korea.teamps.domain.ChampRank;
import com.korea.teamps.repository.ChampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ChampController {

    private ChampRepository champRepository;

    @Autowired
    public ChampController(ChampRepository champRepository) {
        this.champRepository = champRepository;
    }


    @GetMapping("/champ")
    @ResponseBody
    public List<ChampBasicStat> champ(@RequestParam("name") String champName) {
        return champRepository.findBasicStat(champName);
    }

    @GetMapping("/champ/patch")
    @ResponseBody
    public List<ChampPatchHistory> patchHistories(@RequestParam("name") String champName) {
        return champRepository.findPatchHistory(champName);
    }

    @GetMapping("/champ/statistics")
    public String statistics(@RequestParam("name") String champName, Model model) {
        model.addAttribute("name", champName);
        return "statistics";
    }

    @GetMapping("/champ/rank")
    public String rank() {
        return "rank";
    }

    @GetMapping ("/champ/rankline")
    @ResponseBody
    public List<ChampRank> champLineRanks(@RequestBody ChampRank champRank) {
        return champRepository.findByLineChampRank(champRank.getLine());
    }

    @GetMapping("/champ/rankall")
    @ResponseBody
    public List<ChampRank> champAllRanks() {
        return champRepository.findAllChampRank();
    }
}
