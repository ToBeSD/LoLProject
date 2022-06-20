package com.korea.teamps.controller;

import com.korea.teamps.domain.Member;
import com.korea.teamps.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class MemberController {

    private MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/login")
    public String logInPage() {
        return "login";
    }

    @PostMapping("/login")
    @ResponseBody
    public String tryLogIn(HttpServletRequest request,@RequestBody Member member) {
        if(memberService.logIn(request, member)) {
            return "/mypage";
        }else {
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
    public String create(@RequestBody Member member) {
        memberService.join(member);
        return "main";
    }

    @GetMapping("/mypage")
    public String mypage(HttpSession session, Model model) {
        Member member = (Member) session.getAttribute("MEMBER");
        if(member != null) {
            model.addAttribute("member", member);
            return "my-page";
        }
        return "login";
    }
}
