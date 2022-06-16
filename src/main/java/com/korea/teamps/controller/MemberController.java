package com.korea.teamps.controller;

import com.korea.teamps.domain.Member;
import com.korea.teamps.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class MemberController {

    private MemberService memberService;

    @Autowired
    HttpSession httpSession;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }



    @GetMapping("/login")
    public String logInPage() {
        return "login";
    }

    @PostMapping("/login")
    public String tryLogIn(HttpServletRequest request, @RequestBody Member member) {
        memberService.logIn(request, member);
        return "my-page";
    }

    @PostMapping("/logout")
    public String tryLogOut(HttpServletRequest request) {
        memberService.logOut(request);
        return "redirect:/";
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
}
