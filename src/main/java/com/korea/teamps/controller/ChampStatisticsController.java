package com.korea.teamps.controller;

import com.korea.teamps.domain.*;
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

    @PostMapping("/champ/statistics/coreeach")
    public List<ChampCoreEach> getCoreEach(@RequestBody ChampCoreEach champCoreEach) {
        return champRepository.findByCoreCoreEach(champCoreEach);
    }

    @PostMapping("/champ/statistics/corecombine")
    public List<ChampCoreCombine> getCoreCombine(@RequestBody ChampCoreCombine champCoreCombine) {
        return champRepository.findByCoreCoreCombine(champCoreCombine);
    }

    @PostMapping("/champ/statistics/skillmaster")
    public List<ChampSkillMaster> getSkillMaster(@RequestBody ChampSkillMaster champSkillMaster) {
        return champRepository.findByNameSkillMaster(champSkillMaster);
    }

    @PostMapping("/champ/statistics/skillseq")
    public List<ChampSkillSeq> getSkillSeq(@RequestBody ChampSkillSeq champSkillSeq) {
        return champRepository.findByNameSkillSeq(champSkillSeq);
    }

    @PostMapping("/champ/statistics/runecombine")
    public List<ChampRuneCombine> getRuneCombine(@RequestBody ChampRuneCombine champRuneCombine) {
        return champRepository.findByNameRuneCombine(champRuneCombine);
    }

    @PostMapping("/champ/statistics/runeshard")
    public List<ChampRuneShard> getRuneShard(@RequestBody ChampRuneShard champRuneShard) {
        return champRepository.findByNameRuneShard(champRuneShard);
    }
}
