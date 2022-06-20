package com.korea.teamps.controller;

import com.korea.teamps.domain.*;
import com.korea.teamps.repository.ChampRepository;
import com.korea.teamps.service.ChampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
    public String champ(@RequestParam("name") String name, Model model, HttpSession session) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        String headImage = champName.getHeadImage();
        model.addAttribute("name", name);
        model.addAttribute("headImage", headImage);

        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            model.addAttribute("member", member);
            return "basic-info";
        }

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
    public String patchHistory(@RequestParam("name") String name, Model model, HttpSession session) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        String headImage = champName.getHeadImage();
        model.addAttribute("name", name);
        model.addAttribute("headImage", headImage);

        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            model.addAttribute("member", member);
            return "patch-history";
        }
        return "patch-history";
    }

    @PostMapping("/champ/patch")
    @ResponseBody
    public List<ChampPatchHistory> patchHistory(@RequestBody ChampPatchHistory champPatchHistory) {
        return champRepository.findPatchHistory(champPatchHistory);
    }

    @GetMapping("/champ/community")
    public String community(@RequestParam("name") String name, Model model, HttpSession session) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        String headImage = champName.getHeadImage();
        model.addAttribute("name", name);
        model.addAttribute("headImage", headImage);

        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            model.addAttribute("member", member);
            return "champ-community";
        }

        return "champ-community";
    }

    @GetMapping("/champ/statistics")
    public String getStatistics(@RequestParam("name") String name, Model model, HttpSession session) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        ChampRuneType champRuneType = champRepository.findByNameRuneType(name);
        String headImage = champName.getHeadImage();
        String mainRuneType = champRuneType.getMainRuneType();
        String subRuneType = champRuneType.getSubRuneType();
        model.addAttribute("name", name);
        model.addAttribute("headImage", headImage);
        model.addAttribute("mainRuneType", mainRuneType);
        model.addAttribute("subRuneType", subRuneType);

        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            model.addAttribute("member", member);
            return "statistics";
        }

        return "statistics";
    }

    @GetMapping("/champ/rank")
    public String rank(HttpSession session, Model model) {
        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            model.addAttribute("member", member);
            return "rank";
        }
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
