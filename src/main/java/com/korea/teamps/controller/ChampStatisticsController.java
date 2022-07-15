package com.korea.teamps.controller;

import com.korea.teamps.domain.*;
import com.korea.teamps.repository.ChampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/champ/statistics")
public class ChampStatisticsController {
    private ChampRepository champRepository;

    @Autowired
    public ChampStatisticsController(ChampRepository champRepository) {
        this.champRepository = champRepository;
    }

    
    //라인별 승률
    @PostMapping("/highpick")
    public List<ChampHighPick> highPickList(@RequestBody ChampHighPick champHighPick) {
        return champRepository.findByNameHighPick(champHighPick);
    }

    //라인별 승률 내림차순
    @PostMapping("/highpickdesc")
    public List<ChampHighPick> highPickListDesc(@RequestBody ChampHighPick champHighPick) {
        return champRepository.findByNameHighPickDesc(champHighPick);
    }
    
    //통계 요약
    @PostMapping("/ratesummary")
    public ChampRateSummary champRateSummary(@RequestBody ChampRateSummary champRateSummary) {
        return champRepository.findByLineNameChampRateSummary(champRateSummary);
    }

    //룬 요약
    @PostMapping("/runesummary")
    public List<RuneSummary> runeSummary(@RequestBody ChampRuneType champRuneType) {
        return champRepository.findByNameLineRuneType(champRuneType.getName(), champRuneType.getLine());
    }

    //쓰는 룬 요약
    @PostMapping("/runesummary/active")
    public ChampRuneCombine runeSummaryActive(@RequestBody ChampRuneCombine champRuneCombine) {
        return champRepository.findByNameRuneCombineOne(champRuneCombine);
    }

    //서브룬 요약
    @PostMapping("/runesummarysub")
    public List<RuneSummary> subRuneSummary(@RequestBody ChampRuneType champRuneType) {
        return champRepository.findByNameLineSubRuneSummary(champRuneType.getName(), champRuneType.getLine());
    }

    //스킬순서 요약
    @PostMapping("/skillseqsummary")
    public ChampSkillSeq skillSeqSummary(@RequestBody ChampSkillSeq champSkillSeq) {
        return champRepository.findByNameSkillSeqSummary(champSkillSeq);
    }

    //상대하기 어려운 매치
    @PostMapping("/hardmatch")
    public List<ChampMatchLIst> hardMatchList(@RequestBody ChampMatchLIst champMatchLIst) {
        return champRepository.findByNameHardMatch(champMatchLIst);
    }

    //상대하기 쉬운 매치
    @PostMapping("/easymatch")
    public List<ChampMatchLIst> easyMatchList(@RequestBody ChampMatchLIst champMatchLIst) {
        return champRepository.findByNameEasyMatch(champMatchLIst);
    }

    //스펠
    @PostMapping("/spell")
    public List<ChampItemSelect> getSpell(@RequestBody ChampItemSelect champItemSelect) {
        return champRepository.findByNameSpell(champItemSelect);
    }
    
    //스타트아이템
    @PostMapping("/startitem")
    public List<ChampItemSelect> getStartItem(@RequestBody ChampItemSelect champItemSelect) {
        return champRepository.findByNameStartItem(champItemSelect);
    }
    
    //신발
    @PostMapping("/shoes")
    public List<ChampItemSelect> getShoes(@RequestBody ChampItemSelect champItemSelect) {
        return champRepository.findByNameShoes(champItemSelect);
    }

    //코어템
    @PostMapping("/coreeach")
    public List<ChampCoreEach> getCoreEach(@RequestBody ChampCoreEach champCoreEach) {
        return champRepository.findByCoreCoreEach(champCoreEach);
    }

    //코어템 조합
    @PostMapping("/corecombine")
    public List<ChampCoreCombine> getCoreCombine(@RequestBody ChampCoreCombine champCoreCombine) {
        return champRepository.findByCoreCoreCombine(champCoreCombine);
    }

    //스킬 마스터
    @PostMapping("/skillmaster")
    public List<ChampSkillMaster> getSkillMaster(@RequestBody ChampSkillMaster champSkillMaster) {
        return champRepository.findByNameSkillMaster(champSkillMaster);
    }

    //스킬 순서
    @PostMapping("/skillseq")
    public List<ChampSkillSeq> getSkillSeq(@RequestBody ChampSkillSeq champSkillSeq) {
        return champRepository.findByNameSkillSeq(champSkillSeq);
    }

    //룬 조합
    @PostMapping("/runecombine")
    public List<ChampRuneCombine> getRuneCombine(@RequestBody ChampRuneCombine champRuneCombine) {
        return champRepository.findByNameRuneCombine(champRuneCombine);
    }

    //룬파편
    @PostMapping("/runeshard")
    public List<ChampRuneShard> getRuneShard(@RequestBody ChampRuneShard champRuneShard) {
        return champRepository.findByNameRuneShard(champRuneShard);
    }
}
