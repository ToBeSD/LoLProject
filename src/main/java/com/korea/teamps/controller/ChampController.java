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

    //챔피언 기본정보 페이지로 이동
    @GetMapping("/champ")
    public String champ(@RequestParam("name") String name, @RequestParam("line") String line, Model model) {
        return champService.champBasicInfo(name, line, model);
    }
    
    //챔피언 기본스킬 불러오기
    @PostMapping("/champ/basicskill")
    @ResponseBody
    public List<ChampBasicSkill> champBasicSkill(@RequestBody ChampBasicSkill champBasicSkill) {
        return champRepository.findByNameBasicSkill(champBasicSkill);
    }
    
    //챔피언 기본스탯 불러오기
    @PostMapping("/champ/basicstat")
    @ResponseBody
    public List<ChampBasicStat> champBasicStat(@RequestBody ChampBasicStat champBasicStat) {
        return champRepository.findByNameBasicStat(champBasicStat);
    }

    //패치 히스토리 페이지로 이동
    @GetMapping("/champ/patch")
    public String patchHistory(@RequestParam("name") String name, @RequestParam("line") String line, Model model) {
        return champService.patchHistory(name, line, model);
    }

    //패치 히스토리 정보 불러오기
    @PostMapping("/champ/patch")
    @ResponseBody
    public List<ChampPatchHistory> patchHistory(@RequestBody ChampPatchHistory champPatchHistory) {
        return champRepository.findPatchHistory(champPatchHistory);
    }

    //챔피언 커뮤니티로 이동
    @GetMapping("/champ/community")
    public String champCommunity(@RequestParam("name") String name, @RequestParam("line") String line, Model model) {
        return champService.champCommunity(name, line, model);
    }

    //챔피언 통계 페이지로 이동
    @GetMapping("/champ/statistics")
    public String getStatistics(@RequestParam("name") String name, @RequestParam("line") String line, Model model) {
        return champService.getStatistics(name, line, model);
    }

    //검색창에서 챔피언 이름 검색시 통계 페이지로 이동
    @GetMapping("/champ/statistics/noline")
    public String getNoLineStatistics(ChampHighPick champHighPick, RedirectAttributes re) {
        return champService.getNoLineStatistics(champHighPick, re);
    }

    //챔피언 랭킹 페이지로 이동
    @GetMapping("/champ/rank")
    public String rank() {
        return "rank";
    }
    
    //라인별 챔피언 랭킹 불러오기
    @PostMapping ("/champ/rankline")
    @ResponseBody
    public List<ChampRank> champLineRanks(@RequestBody ChampRank champRank) {
        return champRepository.findByLineChampRank(champRank);
    }

    //전체 챔피언 랭킹 불러오기
    @GetMapping("/champ/rankall")
    @ResponseBody
    public List<ChampRank> champAllRanks() {
        return champRepository.findAllChampRank();
    }
}
