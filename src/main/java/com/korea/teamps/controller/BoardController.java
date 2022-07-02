package com.korea.teamps.controller;

import com.korea.teamps.domain.*;
import com.korea.teamps.repository.CommunityRepository;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/community/allcontent")
    @ResponseBody
    public List<Community> getAllFreeContent(@RequestBody Community community) {
        return communityRepository.findByCategoryAllContent(community);
    }

    @GetMapping("community/detail")
    public String freeDetail(@RequestParam("bno") int bno, Model model, HttpServletRequest request) {
        CommunityDetail communityDetail = communityRepository.findByBnoContent(bno);

        HttpSession session = request.getSession(false);

        if (session != null) {
            Member member = (Member) session.getAttribute("MEMBER");
            model.addAttribute("isWriter", communityDetail.getMemberKey() == member.getMemberKey());
            model.addAttribute("member", session.getAttribute("MEMBER"));
        } else {
            model.addAttribute("isWriter", false);
        }

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
    public String buildDetail(@RequestParam("bno") int bno, Model model, HttpServletRequest request) {
        CommunityDetail communityDetail = communityRepository.findByBnoContent(bno);

        HttpSession session = request.getSession(false);

        if (session != null) {
            Member member = (Member) session.getAttribute("MEMBER");
            model.addAttribute("isWriter", communityDetail.getMemberKey() == member.getMemberKey());
            model.addAttribute("member", session.getAttribute("MEMBER"));
        } else {
            model.addAttribute("isWriter", false);
        }

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
    public ResponseEntity postContent(@RequestBody WriteContent writeContent, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            communityRepository.insertContent(member.getMemberKey(), writeContent.getTitle(), writeContent.getContent(), writeContent.getCategory());
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/community/post/delete")
    @ResponseBody
    public CommunityDetail deleteContent(@RequestBody CommunityDetail communityDetail) {
        int bno = communityDetail.getBno();
        CommunityDetail detail = communityRepository.findByBnoContent(bno);
        communityRepository.deleteByBnoContent(communityDetail);
        return detail;
    }

    @PostMapping("/community/getcomments")
    @ResponseBody
    public List<CommunityComment> getComments(@RequestBody CommunityComment communityComment, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            Member member = (Member) session.getAttribute("MEMBER");

            model.addAttribute("isCommentWriter", communityComment.getMemberKey() == member.getMemberKey());
        } else {
            model.addAttribute("isCommentWriter", false);
        }
        return communityRepository.findByBnoComment(communityComment.getBno());
    }

    @PostMapping("/community/comment")
    public ResponseEntity<Void> insertComment(@RequestBody CommunityComment communityComment,HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Member member = (Member) session.getAttribute("MEMBER");

        if(member != null) {
            communityComment.setMemberKey(member.getMemberKey());
            communityRepository.newComment(communityComment);

            return ResponseEntity.ok().build();
        }else  {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/community/commentrevise")
    public ResponseEntity<Void> updateComment(@RequestBody CommunityComment communityComment) {
        communityRepository.updateComment(communityComment);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/community/commentdelete")
    public ResponseEntity<Void> deleteComment(@RequestBody CommunityComment communityComment) {
        communityRepository.deleteComment(communityComment);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/notice")
    public String notice() {
        return "notice";
    }



}
