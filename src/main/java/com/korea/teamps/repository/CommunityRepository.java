package com.korea.teamps.repository;

import com.korea.teamps.domain.Community;
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

    @Select("select TITLE, CONTENT, WRITEDATE, GOOD, BAD, COUNT, CATEGORY from COMMUNITY")
    List<Community> showAllFindByTitle();
}
