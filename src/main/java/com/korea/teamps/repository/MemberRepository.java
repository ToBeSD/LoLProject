package com.korea.teamps.repository;

import com.korea.teamps.domain.Member;
import com.korea.teamps.domain.Profile;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MemberRepository {


    @Insert("INSERT INTO member VALUES (SQ_MEMBER.NEXTVAL, #{email}, #{password}, #{nickname}, null, null, null)")
    void save(Member member);

    @Select("SELECT * FROM member WHERE email = #{email} and pw = #{password}")
    Member findMember(Member member);

    @Select("SELECT * FROM member WHERE memberkey = #{membeKey}")
    Member findByMemberKeyMember(Member member);
    @Select("SELECT * FROM member WHERE email = #{email}")
    Member findByEmail(@Param("email") String email);

    @Select("select image from PROFILE_IMAGE")
    List<Profile> getAllProfile();

    @Update("update MEMBER set INTRODUCE = #{introduce} where MEMBERKEY = #{memberKey}")
    Member updateIntroduce(Member member);
}
