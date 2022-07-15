package com.korea.teamps.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.korea.teamps.domain.*;
import com.korea.teamps.repository.MemberRepository;
import com.korea.teamps.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.UUID;

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
        return "redirect:/";
    }

    //카카오로 로그인
    @GetMapping("/login/kakao")
    public String kakaoLogin(@RequestParam String code, HttpServletRequest request) {
        memberService.kakaoLogIn(code, request);
        return "redirect:/mypage";
    }

    //카카오 로그아웃
    @GetMapping("/logout/kakao")
    public String kakaoLogOut() {
        memberService.kakaoLogOut();
        return "redirect:/logout";
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
