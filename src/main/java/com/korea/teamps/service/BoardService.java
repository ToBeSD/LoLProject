package com.korea.teamps.service;

import com.korea.teamps.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardService {

    private final CommunityRepository communityRepository;

    @Autowired
    public BoardService(CommunityRepository communityRepository1) {
        this.communityRepository = communityRepository1;
    }


}
