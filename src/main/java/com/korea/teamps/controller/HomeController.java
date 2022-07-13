package com.korea.teamps.controller;

import com.korea.teamps.domain.ChampMainCard;
import com.korea.teamps.domain.ChampRank;
import com.korea.teamps.domain.Member;
import com.korea.teamps.repository.ChampRepository;
import com.korea.teamps.service.ChampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class HomeController {

    private ChampService champService;
    private ChampRepository champRepository;
    @Autowired
    public HomeController(ChampService champService, ChampRepository champRepository) {
        this.champService = champService;
        this.champRepository = champRepository;
    }


    //메인 페이지로 이동
    @GetMapping("/")
    public String home() {
        return "main";
    }

    //메인 페이지 챔피언 카드 불러오기
    @GetMapping("/maincard")
    @ResponseBody
    public List<ChampMainCard> getAllMainCard() {
        return champService.attentionList();
    }

    //챔피언 카드 클릭시 상세정보 불러오기
    @PostMapping("/maincard/detail")
    @ResponseBody
    public ChampMainCard getOneMainCard(@RequestBody ChampMainCard champMainCard) {
        return champRepository.findByNameMainCard(champMainCard);
    }

    //미니게임 페이지로 이동
    @GetMapping("/minigame")
    public String minigame() {
        return "minigame";
    }
}
