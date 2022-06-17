package com.korea.teamps.service;

import com.korea.teamps.domain.Member;
import com.korea.teamps.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
//        Optional<Member> result = memberRepository.findByEmail(member.getEmail());

//        result.ifPresent(m -> {
//            throw new IllegalStateException("이미 존재 하는 회원 입니다.");
//        });
    }

    //로그인
    public boolean logIn(HttpServletRequest request, Member inputMember) {
        Member realMember = memberRepository.findByEmail(inputMember.getEmail());

        if(isValidEmailPassword(inputMember, realMember)) {
            HttpSession session = request.getSession(true);

            session.setAttribute("MEMBER", realMember);

            return true;
        } else {
            return false;
        }
    }

    //로그아웃
    public void logOut(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session != null) {
            session.invalidate();
        }
    }

    //비밀번호 비교
    private boolean isValidEmailPassword(Member inputMember, Member realMember) {
        boolean matches = passwordEncoder.matches(inputMember.getPassword(), realMember.getPassword());

        if(matches == true) {
            return true;
        }else {
            return false;
        }
    }
}