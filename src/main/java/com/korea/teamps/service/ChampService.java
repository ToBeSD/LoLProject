package com.korea.teamps.service;


import com.korea.teamps.repository.ChampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChampService {
    private final ChampRepository champRepository;

    @Autowired
    public ChampService(ChampRepository champRepository) {
        this.champRepository = champRepository;
    }

    //기본정보
}
