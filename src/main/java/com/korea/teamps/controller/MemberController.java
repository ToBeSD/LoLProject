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
    private MemberRepository memberRepository;

    @Autowired
    public MemberController(MemberService memberService, MemberRepository memberRepository) {
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    @GetMapping("/login")
    public String logInPage() {
        return "login";
    }

    @PostMapping("/login")
    @ResponseBody
    public String tryLogIn(HttpServletRequest request, @RequestBody Member member) {
        if (memberService.logIn(request, member)) {
            return "/mypage";
        } else {
            return "/login";
        }
    }

    @GetMapping("/logout")
    public String tryLogOut(HttpServletRequest request) {
        memberService.logOut(request);
        return "main";
    }

    @GetMapping("/signin")
    public String signIn() {
        return "signin";
    }

    @PostMapping("/signin")
    @ResponseBody
    public ResponseEntity<Void> create(@RequestBody Member member) {
        if (memberService.join(member)) {
            return ResponseEntity.ok().build();
        } else {

//          ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/mypage")
    public String doGetMypage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            List<Profile> profileList = memberService.getAllProfile();
            Member member = (Member) session.getAttribute("MEMBER");
            model.addAttribute("profileList", profileList);
            model.addAttribute("member", member);
            return "my-page";
        }
        return "login";
    }

    @PostMapping("/mypage/introduce")
    @ResponseBody
    public ResponseEntity<Void> changeIntroduce(@RequestBody Member member) {
        if(member.getMemberKey() != 0) {
            memberRepository.updateIntroduce(member);
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/mypage/changepassword")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePassword changePassword, HttpServletRequest request) {

        if(memberService.changePassword(changePassword)) {
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

    }

    @PostMapping("/mypage/changeprofile")
    public ResponseEntity<Void> changeProfile(@RequestBody Member member, Model model) {
        if(member.getMemberKey() != 0) {
            memberRepository.updateProFile(member);
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/mypage/quit")
    public String quitMember(@RequestBody Member member, HttpServletRequest request) {
        memberRepository.quitMember(member);
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "redirect:/";
    }
}
