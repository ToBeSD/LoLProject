package com.korea.teamps.service;

import com.korea.teamps.domain.ChangePassword;
import com.korea.teamps.domain.Member;
import com.korea.teamps.domain.Profile;
import com.korea.teamps.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

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


    //중복체크 로직
    private boolean validateDuplicateMember(Member inputMember) {
        Member realMember = memberRepository.findByEmail(inputMember.getEmail());
        if (realMember != null) {
            return false;
        }else {
            return true;
        }
    }

    //회원 가입, 중복체크
    public ResponseEntity newRegist(Member member) {
        if(validateDuplicateMember(member)){
            memberRepository.save(passwordEncoder(member));
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    
    //비밀번호 암호화
    private Member passwordEncoder(Member member) {
        String password = member.getPassword();
        String encoded = passwordEncoder.encode(password);
        member.setPassword(encoded);

        return member;
    }


    //로그인
    private boolean logIn(Member inputMember,HttpServletRequest request) {
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

    //로그인 성공 실패에 따른 페이지 이동
    public ResponseEntity tryLogIn(Member member, HttpServletRequest request) {
        if (logIn(member,request)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    //로그아웃
    public void logOut(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session != null) {
            session.invalidate();
        }
    }

    //로그인 성공 실패 여부
    private boolean isValidPassword(String inputPassword, Member realMember) {
        boolean matches = passwordEncoder.matches(inputPassword, realMember.getPassword());

        if(matches == true) {
            return true;
        }else {
            return false;
        }
    }

    //마이페이지로 이동
    public String doGetMypage(Model model, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            List<Profile> profileList = getAllProfile();
            Member sessionMember = (Member) session.getAttribute("MEMBER");
            Member member = memberRepository.findByMemberKeyMember(sessionMember);
            model.addAttribute("profileList", profileList);
            model.addAttribute("member", member);
            return "my-page";
        }
        return "login";
    }

    //프로필 가져오기
    private List<Profile> getAllProfile() {
        return memberRepository.getAllProfile();
    }

    //자기소개 변경
    public ResponseEntity<Void> changeIntroduce(Member member) {
        if(member.getMemberKey() != 0) {
            memberRepository.updateIntroduce(member);
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    //비밀번호 변경 성공 실패 여부
    private boolean changePasswordBoolean(ChangePassword changePassword) {
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

    //비밀번호 변경
    public ResponseEntity<Void> changePassword(ChangePassword changePassword, HttpServletRequest request) {
        if(changePasswordBoolean(changePassword)) {
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }


    //프로필 변경
    public ResponseEntity<Void> changeProfile(Member member) {
        if(member.getMemberKey() != 0) {
            memberRepository.updateProFile(member);
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    //회원탈퇴
    public String quitMember(Member member, HttpServletRequest request) {
        memberRepository.quitMember(member);
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "redirect:/";
    }
}