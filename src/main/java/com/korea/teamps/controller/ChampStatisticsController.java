package com.korea.teamps.controller;

import com.korea.teamps.domain.ChampItemSelect;
import com.korea.teamps.domain.ChampMatchLIst;
import com.korea.teamps.repository.ChampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
public class ChampStatisticsController {
    private ChampRepository champRepository;

    @Autowired
    public ChampStatisticsController(ChampRepository champRepository) {
        this.champRepository = champRepository;
    }

    @PostMapping("/champ/statistics/hardmatch")
    public List<ChampMatchLIst> hardMatchList(@RequestBody ChampMatchLIst champMatchLIst) {
        return champRepository.findByNameHardMatch(champMatchLIst);
    }

    @PostMapping("/champ/statistics/easymatch")
    public List<ChampMatchLIst> easyMatchList(@RequestBody ChampMatchLIst champMatchLIst) {
        return champRepository.findByNameEasyMatch(champMatchLIst);
    }

    @PostMapping("/champ/statistics/spell")
    public List<ChampItemSelect> getSpell(@RequestBody ChampItemSelect champItemSelect) {
        return champRepository.findByNameSpell(champItemSelect);
    }
    @PostMapping("/champ/statistics/startitem")
    public List<ChampItemSelect> getStartItem(@RequestBody ChampItemSelect champItemSelect) {
        return champRepository.findByNameStartItem(champItemSelect);
    }
    @PostMapping("/champ/statistics/shoes")
    public List<ChampItemSelect> getShoes(@RequestBody ChampItemSelect champItemSelect) {
        return champRepository.findByNameShoes(champItemSelect);
    }
}
