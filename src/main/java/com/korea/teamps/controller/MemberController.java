package com.korea.teamps.controller;

import com.korea.teamps.domain.ChangePassword;
import com.korea.teamps.domain.CommunityDetail;
import com.korea.teamps.domain.Member;
import com.korea.teamps.domain.Profile;
import com.korea.teamps.repository.MemberRepository;
import com.korea.teamps.service.MemberService;
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
public class MemberController {

    private MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    //회원가입 페이지로 이동
    @GetMapping("/signin")
    public String signIn() {
        return "signin";
    }

    //회원가입
    @PostMapping("/signin")
    @ResponseBody
    public ResponseEntity create(@RequestBody Member member) {
        return memberService.newRegist(member);
    }

    //로그인 페이지로 이동
    @GetMapping("/login")
    public String logInPage() {
        return "login";
    }

    //로그인
    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity tryLogIn(@RequestBody Member member, HttpServletRequest request) {
        return memberService.tryLogIn(member, request);
    }

    //로그아웃
    @GetMapping("/logout")
    public String tryLogOut(HttpServletRequest request) {
        memberService.logOut(request);
        return "main";
    }

    //마이페이지로 이동
    @GetMapping("/mypage")
    public String doGetMypage(Model model, HttpServletRequest request) {
        return memberService.doGetMypage(model, request);
    }

    //자기소개 변경
    @PostMapping("/mypage/introduce")
    @ResponseBody
    public ResponseEntity<Void> changeIntroduce(@RequestBody Member member) {
        return memberService.changeIntroduce(member);
    }

    //비밀번호 변경
    @PostMapping("/mypage/changepassword")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePassword changePassword, HttpServletRequest request) {
        return memberService.changePassword(changePassword, request);
    }

    //프로필 변경
    @PostMapping("/mypage/changeprofile")
    public ResponseEntity<Void> changeProfile(@RequestBody Member member) {
        return memberService.changeProfile(member);
    }

    //회원탈퇴
    @DeleteMapping("/mypage/quit")
    public String quitMember(@RequestBody Member member, HttpServletRequest request) {
        return memberService.quitMember(member, request);
    }
}
