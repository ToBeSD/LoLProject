package com.korea.teamps.repository;

import com.korea.teamps.domain.Community;
import com.korea.teamps.domain.CommunityComment;
import com.korea.teamps.domain.CommunityDetail;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CommunityRepository {

    @Insert("insert into community values (#{memberKey}, bno_seq.nextval, #{title}, #{content}, sysdate, 0, 0, 0, #{category})")
    void insertContent(@Param("memberKey") int memberKey, @Param("title") String title, @Param("content") String content,
                       @Param("category") String category);

    @Select("select * from\n" +
            "             (select rownum rnum, A.*\n" +
            "                from (select community.bno, community.TITLE, community.CONTENT, community.WRITEDATE, community.GOOD,\n" +
            "                                   community.BAD, community.COUNT, community.CATEGORY,\n" +
            "                                   member.NICKNAME, member.image\n" +
            "                            from COMMUNITY community, MEMBER member\n" +
            "                            where community.MEMBERKEY = member.MEMBERKEY\n" +
            "                              and community.CATEGORY = #{category}\n" +
            "                            order by community.WRITEDATE desc) A)\n" +
            "where rnum between ${page}1 - 10 and ${page}0")
    List<Community> findByCategoryCommunity(Community community);

    @Select("select community.bno, community.TITLE, community.CONTENT, community.WRITEDATE, community.GOOD,\n" +
            "        community.BAD, community.COUNT, community.CATEGORY,\n" +
            "        member.NICKNAME, member.image\n" +
            " from COMMUNITY community, MEMBER member\n" +
            " where community.MEMBERKEY = member.MEMBERKEY\n" +
            "   and community.CATEGORY = #{category}")
    List<Community> findByCategoryAllContent(Community community);

    @Select("select member.memberkey, community.bno, community.title, community.CONTENT, community.WRITEDATE, community.good, community.bad,\n" +
            "       community.COUNT, community.CATEGORY , member.INTRODUCE, member.IMAGE, member.nickname\n" +
            "from COMMUNITY community, MEMBER member\n" +
            "where community.MEMBERKEY = member.MEMBERKEY\n" +
            " and bno = #{bno}")
    CommunityDetail findByBnoContent(@Param("bno") int bno);

    @Delete("delete from COMMUNITY where bno = #{bno}")
    void deleteByBnoContent(CommunityDetail communityDetail);

    @Select("select community.*, member.image, member.nickname\n" +
            "from COMMUNITY_COMMENT community, MEMBER member\n" +
            "where community.MEMBERKEY = member.MEMBERKEY\n" +
            "  and community.bno = #{bno}" +
            "order by base_no")
    List<CommunityComment> findByBnoComment(@Param("bno") int bno);

    @Insert("insert into COMMUNITY_COMMENT(MEMBERKEY, BNO, BASE_NO, CONTENT, WRITEDATE)\n" +
            "select #{memberKey}, #{bno}, nvl(max(BASE_NO), 0) + 1, #{content}, sysdate " +
            "from COMMUNITY_COMMENT " +
            "where bno = #{bno}")
    void newComment(CommunityComment communityComment);

    @Update("update COMMUNITY_COMMENT set CONTENT = #{content} where BASE_NO = #{baseNo}")
    void updateComment(CommunityComment communityComment);

    @Delete("delete from COMMUNITY_COMMENT where base_no = #{baseNo}")
    void deleteComment(CommunityComment communityComment);
}
