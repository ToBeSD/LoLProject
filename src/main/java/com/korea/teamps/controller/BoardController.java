package com.korea.teamps.controller;

import com.korea.teamps.domain.Community;
import com.korea.teamps.domain.Member;
import com.korea.teamps.domain.WriteContent;
import com.korea.teamps.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
    public String free(HttpSession session, Model model) {
        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            model.addAttribute("member", member);
            return "free";
        }
        return "free";
    }

    @GetMapping("community/free/detail")
    public String freeDetail(HttpSession session, Model model) {
        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            model.addAttribute("member", member);
            return "community-post-free";
        }
        return "community-post-free";
    }

    @GetMapping("/community/build")
    public String build(HttpSession session, Model model) {
        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            model.addAttribute("member", member);
            return "build";
        }
        return "build";
    }
    @GetMapping("community/build/detail")
    public String buildDetail(HttpSession session, Model model) {
        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            model.addAttribute("member", member);
            return "community-post-build";
        }
        return "community-post-build";
    }

    @GetMapping("/community/post")
    public String postFree(HttpSession session, Model model) {
        Member member = (Member) session.getAttribute("MEMBER");
        if(member == null) {
            return "login";
        }else {
            model.addAttribute("member", member);
            return "write-post";
        }
    }

    @PostMapping("/community/post")
    @ResponseBody
    public String postContent(@RequestBody WriteContent writeContent, HttpSession session) {
        Member member = (Member) session.getAttribute("MEMBER");
        member.getMemberKey();
        communityRepository.insertContent(member.getMemberKey(), writeContent.getTitle(), writeContent.getContent(), writeContent.getCategory());
        return "write insert success";
    }

    @GetMapping("/notice")
    public String notice(HttpSession session, Model model) {
        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            model.addAttribute("member", member);
            return "notice";
        }
        return "notice";
    }

}
