package com.korea.teamps.controller;

import com.korea.teamps.domain.Community;
import com.korea.teamps.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class BoardController {

    private final CommunityRepository communityRepository;

    @Autowired
    public BoardController(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }


    @GetMapping("/community")
    public String free() {
        return "free";
    }

    @GetMapping("community/free/detail")
    public String freeDetail() {
        return "community-post-free";
    }

    @GetMapping("/community/build")
    public String build() {
        return "build";
    }
    @GetMapping("community/build/detail")
    public String buildDetail() {
        return "community-post-build";
    }

    @GetMapping("/community/post")
    public String postFree() {
        return "write-post";
    }

    @PostMapping("/community/post")
    @ResponseBody
    public List<Community> postContent(@RequestBody Community community) {
        communityRepository.insertContent(community);
        return communityRepository.showAllFindByTitle(community);
    }

    @GetMapping("/notice")
    public String notice() {
        return "notice";
    }

}
