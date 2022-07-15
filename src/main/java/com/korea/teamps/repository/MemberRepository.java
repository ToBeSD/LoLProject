package com.korea.teamps.repository;

import com.korea.teamps.domain.ChangePassword;
import com.korea.teamps.domain.Member;
import com.korea.teamps.domain.Profile;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MemberRepository {


    @Insert("INSERT INTO member VALUES (SQ_MEMBER.NEXTVAL, #{email}, #{password}, #{nickname}, 'anne1.jpg', null, null)")
    void newRegistor(Member member);

    @Select("SELECT * FROM member WHERE email = #{email} and pw = #{password}")
    Member findMember(Member member);

    @Select("SELECT * FROM member WHERE memberkey = #{memberKey}")
    Member findByMemberKeyMember(Member member);
    @Select("SELECT memberkey, email, pw password, nickname, image, introduce, admin FROM member WHERE email = #{email}")
    Member findByEmailMember(@Param("email") String email);

    @Select("select image from PROFILE_IMAGE")
    List<Profile> getAllProfile();
    @Select("select * from MEMBER where memberkey = #{memberKey}")
    Member findByMemberKeyPassword(int memberKey);

    @Update("update MEMBER set INTRODUCE = #{introduce} where MEMBERKEY = #{memberKey}")
    void updateIntroduce(Member member);
    @Update("update Member set PW = #{password} where MEMBERKEY = #{memberKey}")
    void updatePassword(Member member);

    @Update("update MEMBER set IMAGE = #{image} where MEMBERKEY = #{memberKey}")
    void updateProFile(Member member);


    @Delete("delete from MEMBER where memberkey = #{memberKey}")
    void quitMember(Member member);
}
