package com.korea.teamps.repository;

import com.korea.teamps.domain.*;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CommunityRepository {

    @Insert("insert into community values (#{memberKey}, bno_seq.nextval, #{title}, #{content}, sysdate, 0, 0, 0, #{category}, #{champName})")
    void insertContent(@Param("memberKey") int memberKey, @Param("title") String title, @Param("content") String content,
                       @Param("category") String category, @Param("champName") String champName);

    @Select("select * from\n" +
            "             (select rownum rnum, A.*\n" +
            "                from (select community.bno, community.TITLE, community.CONTENT, community.WRITEDATE, community.GOOD,\n" +
            "                                   community.BAD, community.COUNT, community.CATEGORY,\n" +
            "                                   member.NICKNAME, member.image, community.champname, champ.IMAGE_HEAD champImage\n" +
            "                            from COMMUNITY community, MEMBER member, CHAMP_SKILL champ\n" +
            "                            where community.MEMBERKEY = member.MEMBERKEY\n" +
            "                              and community.CHAMPNAME = champ.NAME\n" +
            "                              and community.CATEGORY = #{category}\n" +
            "                            order by community.WRITEDATE desc) A)" +
            "where rnum between ${page}1 - 10 and ${page}0")
    List<Community> findByCategoryBuildCommunity(Community community);



    @Select("select * from\n" +
            "                         (select rownum rnum, A.*\n" +
            "                            from (select community.bno, community.TITLE, community.CONTENT, community.WRITEDATE, community.GOOD,\n" +
            "                                               community.BAD, community.COUNT, community.CATEGORY,\n" +
            "                                               member.NICKNAME, member.image, community.champname, champ.IMAGE_HEAD champImage\n" +
            "                                        from COMMUNITY community, MEMBER member, CHAMP_SKILL champ\n" +
            "                                        where community.MEMBERKEY = member.MEMBERKEY\n" +
            "                                          and community.CATEGORY = #{category}\n" +
            "                                          and community.CHAMPNAME = champ.NAME\n" +
            "                                          and community.title like '%${title}%'\n" +
            "                                        order by community.WRITEDATE desc) A)\n" +
            "            where rnum between ${page}1 - 10 and ${page}0")
    List<Community> findByTitleBuildCommunity(Community community);

    @Select("select * from\n" +
            "                         (select rownum rnum, A.*\n" +
            "                            from (select community.bno, community.TITLE, community.CONTENT, community.WRITEDATE, community.GOOD,\n" +
            "                                               community.BAD, community.COUNT, community.CATEGORY,\n" +
            "                                               member.NICKNAME, member.image, community.champname, champ.IMAGE_HEAD champImage\n" +
            "                                        from COMMUNITY community, MEMBER member, CHAMP_SKILL champ\n" +
            "                                        where community.MEMBERKEY = member.MEMBERKEY\n" +
            "                                          and community.CATEGORY = #{category}\n" +
            "                                          and community.CHAMPNAME = champ.NAME\n" +
            "                                          and member.nickname like '%${nickName}%'\n" +
            "                                        order by community.WRITEDATE desc) A)\n" +
            "            where rnum between ${page}1 - 10 and ${page}0")
    List<Community> findByNickNameBuildCommunity(Community community);

    @Select("select * from\n" +
            "             (select rownum rnum, A.*\n" +
            "                from (select community.bno, community.TITLE, community.CONTENT, community.WRITEDATE, community.GOOD,\n" +
            "                                   community.BAD, community.COUNT, community.CATEGORY,\n" +
            "                                   member.NICKNAME, member.image, community.champname\n" +
            "                            from COMMUNITY community, MEMBER member\n" +
            "                            where community.MEMBERKEY = member.MEMBERKEY\n" +
            "                              and community.CATEGORY = '자유 게시판'\n" +
            "                            order by community.WRITEDATE desc) A)\n" +
            "where rnum between ${page}1 - 10 and ${page}0")
    List<Community> findByCategoryFreeCommunity(Community community);

    @Select("select * from\n" +
            "                         (select rownum rnum, A.*\n" +
            "                            from (select community.bno, community.TITLE, community.CONTENT, community.WRITEDATE, community.GOOD,\n" +
            "                                               community.BAD, community.COUNT, community.CATEGORY,\n" +
            "                                               member.NICKNAME, member.image, community.champname\n" +
            "                                        from COMMUNITY community, MEMBER member\n" +
            "                                        where community.MEMBERKEY = member.MEMBERKEY\n" +
            "                                          and community.CATEGORY = #{category}\n" +
            "                                          and community.title like '%${title}%'\n" +
            "                                        order by community.WRITEDATE desc) A)\n" +
            "            where rnum between ${page}1 - 10 and ${page}0")
    List<Community> findByTitleFreeCommunity(Community community);

    @Select("select * from\n" +
            "                         (select rownum rnum, A.*\n" +
            "                            from (select community.bno, community.TITLE, community.CONTENT, community.WRITEDATE, community.GOOD,\n" +
            "                                               community.BAD, community.COUNT, community.CATEGORY,\n" +
            "                                               member.NICKNAME, member.image, community.champname\n" +
            "                                        from COMMUNITY community, MEMBER member\n" +
            "                                        where community.MEMBERKEY = member.MEMBERKEY\n" +
            "                                          and community.CATEGORY = #{category}\n" +
            "                                          and member.nickname like '%${nickName}%'\n" +
            "                                        order by community.WRITEDATE desc) A)\n" +
            "            where rnum between ${page}1 - 10 and ${page}0")
    List<Community> findByNickNameFreeCommunity(Community community);

    @Select("select count(*) " +
            "from COMMUNITY  " +
            "where CATEGORY = #{category}")
    CommunityCount findByCategoryAllContentCount(Community community);

    @Select("select count(*) "+
            "from COMMUNITY community, MEMBER member  " +
            "where CATEGORY = #{category}" +
            "  and community.MEMBERKEY = member.MEMBERKEY" +
            "  and community.title like '%${title}%'")
    CommunityCount findByTitleContentCount(Community community);

    @Select("select count(*)\n" +
            "            from COMMUNITY community, MEMBER member\n" +
            "            where CATEGORY = #{category}\n" +
            "              and community.MEMBERKEY = member.MEMBERKEY" +
            "              and member.nickname like '%${nickName}%'")
    CommunityCount findByNickNameContentCount(Community community);

    @Select("select member.memberkey, community.bno, community.title, community.CONTENT, community.WRITEDATE, community.good, community.bad,\n" +
            "       community.COUNT, community.CATEGORY , member.INTRODUCE, member.IMAGE, member.nickname\n" +
            "from COMMUNITY community, MEMBER member\n" +
            "where community.MEMBERKEY = member.MEMBERKEY\n" +
            " and bno = #{bno}")
    CommunityDetail findByBnoContent(@Param("bno") int bno);

    @Delete("delete from COMMUNITY where bno = #{bno}")
    void deleteByBnoContent(CommunityDetail communityDetail);

    @Update("update COMMUNITY set title = #{title}, CONTENT = #{content} where bno = #{bno}")
    void reviseByBnoFreeContent(CommunityDetail communityDetail);

    @Update("update COMMUNITY set title = #{title}, CONTENT = #{content}, CHAMPNAME = #{champName} where bno = #{bno}")
    void reviseByBnoBuildContent(BuildEdit buildEdit);

    @Select("select community.memberkey, bno, base_no baseNo, upper_base_no upperBaseNo, content, writedate, member.image, member.nickname\n" +
            "            from COMMUNITY_COMMENT_SIM community, MEMBER member\n" +
            "            where community.MEMBERKEY = member.MEMBERKEY\n" +
            "              and community.bno = #{bno}\n" +
            "            order by base_no, upper_base_no")
    List<CommunityComment> findByBnoComment(@Param("bno") int bno);

    @Insert("insert into COMMUNITY_COMMENT_SIM(MEMBERKEY, BNO, BASE_NO, CONTENT, WRITEDATE) " +
            "select #{memberKey}, #{bno}, nvl(max(BASE_NO), 0) + 1, #{content}, sysdate " +
            "from COMMUNITY_COMMENT_SIM " +
            "where bno = #{bno}")
    void newComment(CommunityComment communityComment);

    @Insert("insert into COMMUNITY_COMMENT_SIM(MEMBERKEY, BNO, BASE_NO, CONTENT, WRITEDATE, UPPER_BASE_NO)\n" +
            "    select #{memberKey}, #{bno}, #{baseNo}, #{content}, sysdate, nvl(max(UPPER_BASE_NO), 0) + 1\n" +
            "    from COMMUNITY_COMMENT_SIM\n" +
            "    where BASE_NO = #{baseNo}")
    void newUnderComment(CommunityComment communityComment);

    @Update("update COMMUNITY_COMMENT_SIM set CONTENT = #{content} where BASE_NO = #{baseNo} and UPPER_BASE_NO = #{upperBaseNo}")
    void updateComment(CommunityComment communityComment);

    @Delete("delete from COMMUNITY_COMMENT_SIM where base_no = #{baseNo}")
    void deleteComment(CommunityComment communityComment);

    @Delete("delete from COMMUNITY_COMMENT_SIM where base_no = #{baseNo} and upper_base_no = #{upperBaseNo}")
    void deleteUnderComment(CommunityComment communityComment);

    @Update("update COMMUNITY " +
            "set count = (select count from COMMUNITY where bno = #{bno}) + 1 " +
            "where BNO = #{bno}")
    void countUp(int bno);

    @Update("update COMMUNITY " +
            "set ${goodBad} = (select ${goodBad} from COMMUNITY where bno = #{bno}) + 1\n" +
            "where bno = #{bno}")
    void goodOrBadUp(GoodOrBad goodOrBad);

    @Select("select community.* , member.NICKNAME, champ.IMAGE_FULL image\n" +
            "from COMMUNITY community, MEMBER member, CHAMP_SKILL champ\n" +
            "where community.MEMBERKEY = member.MEMBERKEY\n" +
            "  and community.CHAMPNAME = champ.name\n" +
            "  and community.CHAMPNAME = #{champName}" +
            "  and ROWNUM < 8")
    List<Community> findByChampNameContent(Community community);

    @Select("select * from NOTICE where rownum < 11 order by bno desc")
    List<Notice> getNotice();

    @Select("select * from NOTICE where bno = #{bno}")
    Notice findByBnoNotice(@Param("bno") int bno);

    @Insert("insert into NOTICE(title, content, writedate, bno) \n" +
            "values (#{title}, #{content}, sysdate, NOTICE_BNO_SEQ.nextval)")
    void createNewNotice(Notice notice);
}
