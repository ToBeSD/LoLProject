package com.korea.teamps.controller;

import com.korea.teamps.domain.Member;
import com.korea.teamps.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public String tryLogIn(@RequestBody Member member) {
        return "my-page";
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
