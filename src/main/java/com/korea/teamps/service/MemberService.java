package com.korea.teamps.service;

import com.korea.teamps.domain.Member;
import com.korea.teamps.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    //회원 가입
    public void join(Member member) {
//        validateDuplicateMember(member); // 중복 회원 검증

        memberRepository.save(passwordEncoder(member));
    }
    
    //비밀번호 암호화
    private Member passwordEncoder(Member member) {
        String password = member.getPassword();
        String encoded = passwordEncoder.encode(password);
        member.setPassword(encoded);

        return member;
    }

    private void validateDuplicateMember(Member member) {
        Optional<Member> result = memberRepository.findByEmail(member.getEmail());

        result.ifPresent(m -> {
            throw new IllegalStateException("이미 존재 하는 회원 입니다.");
        });
    }

    //로그인
    public void logIn(Member member) {
        Optional<Member> result = memberRepository.findMember(member);

//        result.isPresent(m -> {
//
//        })

    }

    //비밀번호 비교

}