package com.korea.teamps.controller;

import com.korea.teamps.repository.CommunityRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardController {

    private final CommunityRepository communityRepository;

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

    @GetMapping("/notice")
    public String notice() {
        return "notice";
    }

}
