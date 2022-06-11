package com.korea.teamps.service;

import com.korea.teamps.domain.Member;
import com.korea.teamps.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    //회원 가입
    public void join(Member member) {
//        validateDuplicateMember(member); // 중복 회원 검증
//        memberRepository.save(member);
    }

    private void validateDuplicateMember(Member member) {
        Optional<Member> result = memberRepository.findByEmail(member.getEmail());

        result.ifPresent(m -> {
            throw new IllegalStateException("이미 존재 하는 회원 입니다.");
        });
    }

    //전체 회원 조회
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }
}
