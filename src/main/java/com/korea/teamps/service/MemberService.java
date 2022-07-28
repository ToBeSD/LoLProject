package com.korea.teamps.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.korea.teamps.domain.*;
import com.korea.teamps.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
        Member realMember = memberRepository.findByEmailMember(inputMember.getEmail());
        if (realMember != null) {
            return false;
        }else {
            return true;
        }
    }

    //회원 가입, 중복체크
    public ResponseEntity newRegist(Member member) {
        if(validateDuplicateMember(member)){
            memberRepository.newRegistor(passwordEncoder(member));
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
        Member realMember = memberRepository.findByEmailMember(inputMember.getEmail());

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

    //카카오 로그인을 위한 토큰 요청
    private OAuthToken getKakaoToken(String code) {
        //post방식으로 key=value 데이터를 요청 (카카오쪽으로) RestTemplate라는 라이브러리 사용. http요청을 쉽게 할 수 있게 해줌
        RestTemplate rt = new RestTemplate();
        //http header 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //MultiValueMap : key값이 중복 가능한 map
        //http body 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "1e5f1398f6098e14639513d07165e3b6");
        params.add("redirect_uri", "http://lolpscloneproject-env.eba-wr2mtsmm.ap-northeast-2.elasticbeanstalk.com/login/kakao");
        params.add("code", code);

        //http header 와 http body를  하나의 오브젝트에 담기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        //http 요청하기 그리고 response변수에 응답받음
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class // string으로 응답받기
        );

        ObjectMapper objectMapper = new ObjectMapper();

        OAuthToken oAuthToken = null;
        try {
            oAuthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return oAuthToken;
    }

    //카카오토큰을 이용해서 프로필 가져오기
    private KakaoProfile getKakaoProfile(String code) {
        //post방식으로 key=value 데이터를 요청 (카카오쪽으로) RestTemplate라는 라이브러리 사용. http요청을 쉽게 할 수 있게 해줌
        RestTemplate rt2 = new RestTemplate();
        //http header 오브젝트 생성
        HttpHeaders headers2 = new HttpHeaders();
        headers2.add("Authorization", "Bearer " + getKakaoToken(code).getAccess_token());
        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //http header 와 http body를  하나의 오브젝트에 담기
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
                new HttpEntity<>(headers2);

        //http 요청하기 그리고 response변수에 응답받음
        ResponseEntity<String> response2 = rt2.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class // string으로 응답받기
        );

        ObjectMapper objectMapper2 = new ObjectMapper();

        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper2.readValue(response2.getBody(), KakaoProfile.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoProfile;
    }

    //회원이 아니면 자동 회원가입하고 로그인
    public void kakaoLogIn(String code, HttpServletRequest request) {
        KakaoProfile kakaoProfile = getKakaoProfile(code);
        Member kakaoMember = memberRepository.findByEmailMember(kakaoProfile.getKakao_account().getEmail());

        if (kakaoMember == null) {
            UUID kakaoRandomPassword = UUID.randomUUID();
            Member newKakaoMember = new Member();
            newKakaoMember.setEmail(kakaoProfile.getKakao_account().getEmail());
            newKakaoMember.setPassword(kakaoRandomPassword.toString());
            newKakaoMember.setNickname(kakaoProfile.getKakao_account().getProfile().nickname);
            memberRepository.newRegistor(passwordEncoder(newKakaoMember));
            kakaoMember = memberRepository.findByEmailMember(kakaoProfile.getKakao_account().getEmail());
        }


        HttpSession session = request.getSession(false);

        if (session == null) {
            session = request.getSession(true);
        }

        session.setAttribute("MEMBER", kakaoMember);

    }

    //카카오 로그아웃
    public void kakaoLogOut() {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("client_id", "1e5f1398f6098e14639513d07165e3b6");
        headers.add("logout_redirect_uri", "http://lolpscloneproject-env.eba-wr2mtsmm.ap-northeast-2.elasticbeanstalk.com/logout");
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //http header를  하나의 오브젝트에 담기
        HttpEntity<MultiValueMap<String, String>> kakaoLogOutRequest =
                new HttpEntity<>(headers);

        //http 요청하기 그리고 response변수에 응답받음
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com//oauth/logout?client_id=1e5f1398f6098e14639513d07165e3b6&logout_redirect_uri=http://lolpscloneproject-env.eba-wr2mtsmm.ap-northeast-2.elasticbeanstalk.com/logout",
                HttpMethod.GET,
                kakaoLogOutRequest,
                String.class // string으로 응답받기
        );
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