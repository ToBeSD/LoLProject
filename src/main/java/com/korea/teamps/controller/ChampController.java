package com.korea.teamps.controller;

import com.korea.teamps.domain.*;
import com.korea.teamps.repository.ChampRepository;
import com.korea.teamps.service.ChampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
    public String champ(@RequestParam("name") String name, Model model) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        String headImage = champName.getHeadImage();
        model.addAttribute("name", name);
        model.addAttribute("headImage", headImage);

        return "basic-info";
    }

    @PostMapping("/champ/basicskill")
    @ResponseBody
    public List<ChampBasicSkill> champBasicSkill(@RequestBody ChampBasicSkill champBasicSkill) {
        return champRepository.findByNameBasicSkill(champBasicSkill);
    }
    @PostMapping("/champ/basicstat")
    @ResponseBody
    public List<ChampBasicStat> champBasicStat(@RequestBody ChampBasicStat champBasicStat) {
        return champRepository.findByNameBasicStat(champBasicStat);
    }

    @GetMapping("/champ/patch")
    public String patchHistory(@RequestParam("name") String name, Model model) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        String headImage = champName.getHeadImage();
        model.addAttribute("name", name);
        model.addAttribute("headImage", headImage);

        return "patch-history";
    }

    @PostMapping("/champ/patch")
    @ResponseBody
    public List<ChampPatchHistory> patchHistory(@RequestBody ChampPatchHistory champPatchHistory) {
        return champRepository.findPatchHistory(champPatchHistory);
    }

    @GetMapping("/champ/community")
    public String community(@RequestParam("name") String name, Model model) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        String headImage = champName.getHeadImage();
        model.addAttribute("name", name);
        model.addAttribute("headImage", headImage);

        return "champ-community";
    }

    @GetMapping("/champ/statistics")
    public String getStatistics(@RequestParam("name") String name, Model model) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        if(champName.getName() != null) {
            String headImage = champName.getHeadImage();
            model.addAttribute("headImage", headImage);
            model.addAttribute("name", champName.getName());
            return "statistics";
        }

        return "";
    }

    @GetMapping("/champ/statistics/noline")
    public String getNoLineStatistics(ChampHighPick champHighPick, RedirectAttributes re) {
        ChampHighPick line = champRepository.findByNameHighPickOne(champHighPick);
        re.addAttribute("name", line.getName());
        re.addAttribute("line", line.getLine());
        return "redirect:/champ/statistics";
    }


    @GetMapping("/champ/rank")
    public String rank() {
        return "rank";
    }

    @PostMapping("/champ/rankline/one")
    @ResponseBody
    public  ChampRank findOneChampRank(@RequestBody ChampRank champRank) {
        return champRepository.findByLineNameChampRank(champRank);
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
