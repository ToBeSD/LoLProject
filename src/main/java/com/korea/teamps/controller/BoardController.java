package com.korea.teamps.controller;

import com.korea.teamps.domain.Community;
import com.korea.teamps.domain.CommunityDetail;
import com.korea.teamps.domain.Member;
import com.korea.teamps.domain.WriteContent;
import com.korea.teamps.repository.CommunityRepository;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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

    @PostMapping("/community")
    @ResponseBody
    public List<Community> getCommunityFree(@RequestBody Community community) {
        return communityRepository.findByCategoryCommunity(community);
    }

    @GetMapping("community/free/detail")
    public String freeDetail(@RequestParam("bno") int bno, Model model) {
        CommunityDetail communityDetail = communityRepository.findByTitleContent(bno);
        model.addAttribute("communityDetail", communityDetail);

        return "community-post-free";
    }

    @GetMapping("/community/build")
    public String build() {
        return "build";
    }
    @PostMapping("/community/build")
    @ResponseBody
    public List<Community> getCommunityBuild(@RequestBody Community community) {
        return communityRepository.findByCategoryCommunity(community);
    }
    @GetMapping("community/build/detail")
    public String buildDetail(@RequestParam("bno") int bno, Model model) {
        CommunityDetail communityDetail = communityRepository.findByTitleContent(bno);
        model.addAttribute("communityDetail", communityDetail);

        return "community-post-build";
    }

    @GetMapping("/community/post")
    public String postFree(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            return "login";
        }else {
            return "write-post";
        }
    }

    @PostMapping("/community/post")
    @ResponseBody
    public String postContent(@RequestBody WriteContent writeContent, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Member member = (Member) session.getAttribute("MEMBER");
        communityRepository.insertContent(member.getMemberKey(), writeContent.getTitle(), writeContent.getContent(), writeContent.getCategory());
        return "write insert success";
    }

    @GetMapping("/notice")
    public String notice() {
        return "notice";
    }



}
