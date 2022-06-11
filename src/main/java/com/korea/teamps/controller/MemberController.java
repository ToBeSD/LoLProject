package com.korea.teamps.controller;

import com.korea.teamps.domain.Member;
import com.korea.teamps.repository.MemberRepository;
import com.korea.teamps.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MemberController {
    private MemberRepository memberRepository;

    @Autowired
    public MemberController(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }


    @GetMapping("/login")
    public String logIn() {
        return "login";
    }

    @GetMapping("/signin")
    public String signIn() {
        return "signin";
    }

    @PostMapping("/signin")
    @ResponseBody
    public String create(@RequestBody Member member) {
        memberRepository.save(member);
        return "test";
    }
}
