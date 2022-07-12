package com.korea.teamps.controller;

import com.korea.teamps.domain.*;
import com.korea.teamps.repository.ChampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/champ/statistics")
public class ChampStatisticsController {
    private ChampRepository champRepository;

    @Autowired
    public ChampStatisticsController(ChampRepository champRepository) {
        this.champRepository = champRepository;
    }

    @PostMapping("/highpick")
    public List<ChampHighPick> highPickList(@RequestBody ChampHighPick champHighPick) {
        return champRepository.findByNameHighPick(champHighPick);
    }

    @PostMapping("/highpickdesc")
    public List<ChampHighPick> highPickListDesc(@RequestBody ChampHighPick champHighPick) {
        return champRepository.findByNameHighPickDesc(champHighPick);
    }
    @PostMapping("/ratesummary")
    public ChampRateSummary champRateSummary(@RequestBody ChampRateSummary champRateSummary) {
        return champRepository.findByLineNameChampRateSummary(champRateSummary);
    }

    @PostMapping("/runesummary")
    public List<RuneSummary> runeSummary(@RequestBody ChampRuneType champRuneType) {
        return champRepository.findByNameLineRuneType(champRuneType.getName(), champRuneType.getLine());
    }

    @PostMapping("/runesummary/active")
    public ChampRuneCombine runeSummaryActive(@RequestBody ChampRuneCombine champRuneCombine) {
        return champRepository.findByNameRuneCombineOne(champRuneCombine);
    }

    @PostMapping("/runesummarysub")
    public List<RuneSummary> subRuneSummary(@RequestBody ChampRuneType champRuneType) {
        return champRepository.findByNameLineSubRuneSummary(champRuneType.getName(), champRuneType.getLine());
    }

    @PostMapping("/skillseqsummary")
    public ChampSkillSeq skillSeqSummary(@RequestBody ChampSkillSeq champSkillSeq) {
        return champRepository.findByNameSkillSeqSummary(champSkillSeq);
    }

    @PostMapping("/hardmatch")
    public List<ChampMatchLIst> hardMatchList(@RequestBody ChampMatchLIst champMatchLIst) {
        return champRepository.findByNameHardMatch(champMatchLIst);
    }

    @PostMapping("/easymatch")
    public List<ChampMatchLIst> easyMatchList(@RequestBody ChampMatchLIst champMatchLIst) {
        return champRepository.findByNameEasyMatch(champMatchLIst);
    }

    @PostMapping("/spell")
    public List<ChampItemSelect> getSpell(@RequestBody ChampItemSelect champItemSelect) {
        return champRepository.findByNameSpell(champItemSelect);
    }
    @PostMapping("/startitem")
    public List<ChampItemSelect> getStartItem(@RequestBody ChampItemSelect champItemSelect) {
        return champRepository.findByNameStartItem(champItemSelect);
    }
    @PostMapping("/shoes")
    public List<ChampItemSelect> getShoes(@RequestBody ChampItemSelect champItemSelect) {
        return champRepository.findByNameShoes(champItemSelect);
    }

    @PostMapping("/coreeach")
    public List<ChampCoreEach> getCoreEach(@RequestBody ChampCoreEach champCoreEach) {
        return champRepository.findByCoreCoreEach(champCoreEach);
    }

    @PostMapping("/corecombine")
    public List<ChampCoreCombine> getCoreCombine(@RequestBody ChampCoreCombine champCoreCombine) {
        return champRepository.findByCoreCoreCombine(champCoreCombine);
    }

    @PostMapping("/skillmaster")
    public List<ChampSkillMaster> getSkillMaster(@RequestBody ChampSkillMaster champSkillMaster) {
        return champRepository.findByNameSkillMaster(champSkillMaster);
    }

    @PostMapping("/skillseq")
    public List<ChampSkillSeq> getSkillSeq(@RequestBody ChampSkillSeq champSkillSeq) {
        return champRepository.findByNameSkillSeq(champSkillSeq);
    }

    @PostMapping("/runecombine")
    public List<ChampRuneCombine> getRuneCombine(@RequestBody ChampRuneCombine champRuneCombine) {
        return champRepository.findByNameRuneCombine(champRuneCombine);
    }

    @PostMapping("/runeshard")
    public List<ChampRuneShard> getRuneShard(@RequestBody ChampRuneShard champRuneShard) {
        return champRepository.findByNameRuneShard(champRuneShard);
    }
}
