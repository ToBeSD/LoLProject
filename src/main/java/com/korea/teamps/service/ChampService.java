package com.korea.teamps.service;


import com.korea.teamps.domain.ChampMainCard;
import com.korea.teamps.domain.ChampRank;
import com.korea.teamps.repository.ChampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChampService {
    private final ChampRepository champRepository;

    @Autowired
    public ChampService(ChampRepository champRepository) {
        this.champRepository = champRepository;
    }

    public List<ChampMainCard> attentionList() {
        return champRepository.findMainCard();
    }
}
