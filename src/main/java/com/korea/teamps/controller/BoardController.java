package com.korea.teamps.controller;

import com.korea.teamps.domain.*;
import com.korea.teamps.repository.ChampRepository;
import com.korea.teamps.repository.CommunityRepository;
import com.korea.teamps.service.BoardService;
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
    private final ChampRepository champRepository;
    private final BoardService boardService;

    @Autowired
    public BoardController(CommunityRepository communityRepository, ChampRepository champRepository, BoardService boardService) {
        this.communityRepository = communityRepository;
        this.champRepository = champRepository;
        this.boardService = boardService;
    }

    //자유게시판으로 이동
    @GetMapping("/community")
    public String free() {
        return "free";
    }

    //자유게시판 글 불러오기
    @PostMapping("/community")
    @ResponseBody
    public List<Community> getCommunityFree(@RequestBody Community community) {
        return boardService.getCommunityContent(community);
    }

    //자유게시판 글 상세보기
    @GetMapping("community/detail")
    public String freeDetail(@RequestParam("bno") int bno, Model model, HttpServletRequest request) {
        return boardService.getDetailPage(bno, model, request);
    }

    //빌드 연구소로 이동
    @GetMapping("/community/build")
    public String build() {
        return "build";
    }

    //빌드 연구소 글 불러오기
    @PostMapping("/community/build")
    @ResponseBody
    public List<Community> getCommunityBuild(@RequestBody Community community) {
        return boardService.getCommunityContent(community);
    }

    //빌드 연구소 글 상세보기
    @GetMapping("community/build/detail")
    public String buildDetail(@RequestParam("bno") int bno, Model model, HttpServletRequest request) {
        return boardService.getDetailPage(bno, model, request);
    }
    
    // 검색한 글 불러오기
    @PostMapping("/community/searchedcontent")
    @ResponseBody
    public CommunityCount getSearchedContent(@RequestBody Community community) {
        return boardService.getSearchedContent(community);
    }

    //글 개수 불러오기
    @PostMapping("/community/allcontent")
    @ResponseBody
    public CommunityCount getAllFreeContent(@RequestBody Community community) {
        return communityRepository.findByCategoryAllContentCount(community);
    }

    //글쓰기 페이지로 이동
    @GetMapping("/community/post")
    public String postFree(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            return "login";
        }else {
            return "write-post";
        }
    }

    //글 쓰기
    @PostMapping("/community/post")
    public ResponseEntity postContent(@RequestBody WriteContent writeContent, HttpServletRequest request) {
        return boardService.writeNewContent(writeContent, request);
    }

    //글 삭제
    @PostMapping("/community/post/delete")
    @ResponseBody
    public CommunityDetail deleteContent(@RequestBody CommunityDetail communityDetail) {
        return boardService.deleteContent(communityDetail);
    }

    //글쓰기 화면에서 챔피언 select태그에 활용
    @GetMapping("/community/champname")
    @ResponseBody
    public List<ChampName> getChampNameAndImage() {
        return champRepository.getAllChampNameAndImage();
    }

    // 댓글 불러오기
    @PostMapping("/community/getcomments")
    @ResponseBody
    public List<CommunityComment> getComments(@RequestBody CommunityComment communityComment, Model model, HttpServletRequest request) {
        return boardService.getComments(communityComment, model, request);
    }

    // 댓글 생성하기
    @PostMapping("/community/comment")
    public ResponseEntity<Void> insertComment(@RequestBody CommunityComment communityComment, HttpServletRequest request) {
        return boardService.insertComment(communityComment, request);
    }

    //댓글 수정하기
    @PostMapping("/community/commentrevise")
    public ResponseEntity<Void> updateComment(@RequestBody CommunityComment communityComment) {
        communityRepository.updateComment(communityComment);
        return ResponseEntity.ok().build();
    }

    //댓글 삭제하기
    @PostMapping("/community/commentdelete")
    public ResponseEntity<Void> deleteComment(@RequestBody CommunityComment communityComment) {
        communityRepository.deleteComment(communityComment);
        return ResponseEntity.ok().build();
    }

    //글 좋아요 싫어요
    @PostMapping("/community/goodorbad")
    public ResponseEntity<Void> communityGoodOrBad(@RequestBody GoodOrBad goodOrBad) {
        communityRepository.goodOrBadUp(goodOrBad);
        return ResponseEntity.ok().build();
    }

    //챔피언 게시판 불러오기
    @PostMapping("/champ/community")
    @ResponseBody
    public List<Community> getChampCommunity(@RequestBody Community community) {
        return communityRepository.findByChampNameContent(community);
    }

    //공지사항으로 이동
    @GetMapping("/notice")
    public String notice() {
        return "notice";
    }
}
