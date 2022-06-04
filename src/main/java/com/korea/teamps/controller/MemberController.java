package com.korea.teamps.controller;

import com.korea.teamps.domain.Member;
import com.korea.teamps.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MemberController {
    private MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/login")
    public String logIn() {
        return "login";
    }

    @GetMapping("/signin")
    public String SignIn() {
        return "signin";
    }

    @PostMapping("signin")
    public String create(MemberForm memberForm) {
        Member member = new Member();
        member.setEmail(memberForm.getEmail());
        member.setPw(memberForm.getPassword());
        member.setName(memberForm.getName());
        memberService.join(member);

        return "redirect:/";
    }
}
