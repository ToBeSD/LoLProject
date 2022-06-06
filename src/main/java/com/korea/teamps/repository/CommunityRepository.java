package com.korea.teamps.repository;

import com.korea.teamps.domain.Community;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommunityRepository {
    Community findAllTitle();
}
