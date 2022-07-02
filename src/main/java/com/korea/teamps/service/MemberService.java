package com.korea.teamps.service;

import com.korea.teamps.domain.ChangePassword;
import com.korea.teamps.domain.Member;
import com.korea.teamps.domain.Profile;
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
    public boolean join(Member member) {
        //validateDuplicateMember(member); // 중복 회원 검증
        memberRepository.save(passwordEncoder(member));
        return true;
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

        if(isValidPassword(inputMember.getPassword(), realMember)) {
            HttpSession session = request.getSession(false);
            if (session == null) {
                session = request.getSession(true);
            }

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

    //비밀번호 변경
    public boolean changePassword(ChangePassword changePassword) {
        Member realMember = memberRepository.findByMemberKeyPassword(changePassword.getMemberKey());

        if(isValidPassword(changePassword.getPassword(), realMember)){
            String newPassword = changePassword.getNewPassword();
            realMember.setPassword(newPassword);

            Member encodedPassword = passwordEncoder(realMember);
            memberRepository.updatePassword(encodedPassword);

            return true;
        }else {
            return false;
        }
    }

    //비밀번호 비교
    private boolean isValidPassword(String inputPassword, Member realMember) {
        boolean matches = passwordEncoder.matches(inputPassword, realMember.getPassword());

        if(matches == true) {
            return true;
        }else {
            return false;
        }
    }

    //프로필 가져오기
    public List<Profile> getAllProfile() {
        return memberRepository.getAllProfile();
    }
}