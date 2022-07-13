package com.korea.teamps.service;


import com.korea.teamps.domain.ChampHighPick;
import com.korea.teamps.domain.ChampMainCard;
import com.korea.teamps.domain.ChampName;
import com.korea.teamps.domain.ChampRank;
import com.korea.teamps.repository.ChampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Service
public class ChampService {
    private final ChampRepository champRepository;

    @Autowired
    public ChampService(ChampRepository champRepository) {
        this.champRepository = champRepository;
    }

    //챔피언 기본정보 페이지로 이동
    public String champBasicInfo(String name, String line, Model model) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        String headImage = champName.getHeadImage();
        model.addAttribute("name", name);
        model.addAttribute("headImage", headImage);
        model.addAttribute("line", line);

        return "basic-info";
    }

    //패치 히스토리 페이지로 이동
    public String patchHistory(String name, String line, Model model) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        String headImage = champName.getHeadImage();
        model.addAttribute("name", name);
        model.addAttribute("headImage", headImage);
        model.addAttribute("line", line);

        return "patch-history";
    }

    //챔피언 커뮤니티로 이동
    public String champCommunity(String name, String line, Model model) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        String headImage = champName.getHeadImage();
        model.addAttribute("name", name);
        model.addAttribute("headImage", headImage);
        model.addAttribute("line", line);

        return "champ-community";
    }

    //챔피언 통계 페이지로 이동
    public String getStatistics(String name, String line, Model model) {
        ChampName champName = champRepository.findByNameHeadImage(name);
        if(champName.getName() != null) {
            String headImage = champName.getHeadImage();
            model.addAttribute("headImage", headImage);
            model.addAttribute("name", champName.getName());
            model.addAttribute("line", line);
            return "statistics";
        }

        return "errorpage";
    }

    //검색창에서 챔피언 이름 검색시 통계 페이지로 이동
    public String getNoLineStatistics(ChampHighPick champHighPick, RedirectAttributes re) {
        ChampHighPick line = champRepository.findByNameHighPickOne(champHighPick);
        if (line != null) {
            re.addAttribute("name", line.getName());
            re.addAttribute("line", line.getLine());
            return "redirect:/champ/statistics";
        }else {
            return "errorpage";
        }
    }

    public List<ChampMainCard> attentionList() {
        return champRepository.findMainCard();
    }
}
