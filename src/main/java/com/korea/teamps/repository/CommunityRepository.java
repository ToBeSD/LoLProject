package com.korea.teamps.repository;

import com.korea.teamps.domain.Community;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CommunityRepository {

    @Insert("insert into community values (361979, bno_seq.nextval, #{title}, #{content}, sysdate, 1, 1, 1, #{category})")
    void insertContent(Community community);

    @Select("select TITLE, CONTENT, WRITEDATE, GOOD, BAD, COUNT, CATEGORY from COMMUNITY;")
    List<Community> showAllFindByTitle(Community community);
}
