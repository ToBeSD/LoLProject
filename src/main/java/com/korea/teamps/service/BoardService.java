package com.korea.teamps.service;

import com.korea.teamps.domain.*;
import com.korea.teamps.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class BoardService {

    private final CommunityRepository communityRepository;

    @Autowired
    public BoardService(CommunityRepository communityRepository1) {
        this.communityRepository = communityRepository1;
    }

    //글 쓰기
    public ResponseEntity writeNewContent(WriteContent writeContent, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            communityRepository.insertContent(member.getMemberKey(), writeContent.getTitle(), writeContent.getContent(), writeContent.getCategory(), writeContent.getChampName());
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    //글 삭제
    public CommunityDetail deleteContent(CommunityDetail communityDetail) {
        int bno = communityDetail.getBno();
        CommunityDetail detail = communityRepository.findByBnoContent(bno);
        communityRepository.deleteByBnoContent(communityDetail);
        return detail;
    }

    //글 불러오기
    public List<Community> getCommunityContent(Community community) {
        if (community.getTitle() == null && community.getNickName() == null) {
            return communityRepository.findByCategoryCommunity(community);
        } else if (community.getTitle() != null && community.getNickName() == null) {
            return communityRepository.findByTitleCommunity(community);
        } else {
            return communityRepository.findByNickNameCommunity(community);
        }
    }

    //검색한 글 불러오기
    public CommunityCount getSearchedContent(Community community) {
        if (community.getTitle() != null) {
            return communityRepository.findByTitleContentCount(community);
        }else {
            return communityRepository.findByNickNameContentCount(community);
        }
    }

    //글 상세보기
    public String getDetailPage(@RequestParam("bno") int bno, Model model, HttpServletRequest request) {
        CommunityDetail communityDetail = communityRepository.findByBnoContent(bno);

        if (communityDetail == null) {
            return "errorpage";
        }

        HttpSession session = request.getSession(false);
        communityRepository.countUp(bno);

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

    //댓글 불러오기
    public List<CommunityComment> getComments(CommunityComment communityComment, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            Member member = (Member) session.getAttribute("MEMBER");

            model.addAttribute("isCommentWriter", communityComment.getMemberKey() == member.getMemberKey());
        } else {
            model.addAttribute("isCommentWriter", false);
        }
        return communityRepository.findByBnoComment(communityComment.getBno());
    }

    //댓글 쓰기
    public ResponseEntity<Void> insertComment(CommunityComment communityComment, HttpServletRequest request) {
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
}
