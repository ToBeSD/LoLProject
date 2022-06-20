package com.korea.teamps.repository;

import com.korea.teamps.domain.Community;
import com.korea.teamps.domain.CommunityDetail;
import com.korea.teamps.domain.WriteContent;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CommunityRepository {

    @Insert("insert into community values (#{memberKey}, bno_seq.nextval, #{title}, #{content}, sysdate, 0, 0, 0, #{category})")
    void insertContent(@Param("memberKey") int memberKey, @Param("title") String title, @Param("content") String content,
                       @Param("category") String category);

    @Select("select community.bno, community.TITLE, community.CONTENT, community.WRITEDATE, community.GOOD,\n" +
            "       community.BAD, community.COUNT, community.CATEGORY,\n" +
            "       member.NICKNAME, member.image\n" +
            "from COMMUNITY community, MEMBER member\n" +
            "where community.MEMBERKEY = member.MEMBERKEY\n" +
            "  and community.CATEGORY = #{category}" +
            "order by community.WRITEDATE desc")
    List<Community> findByCategoryCommunity(Community community);

    @Select("select community.bno, community.title, community.CONTENT, community.WRITEDATE, community.good, community.bad,\n" +
            "       community.COUNT, community.CATEGORY , member.INTRODUCE, member.IMAGE, member.nickname\n" +
            "from COMMUNITY community, MEMBER member\n" +
            "where community.MEMBERKEY = member.MEMBERKEY\n" +
            " and bno = #{bno}")
    CommunityDetail findByTitleContent(@Param("bno") int bno);
}
