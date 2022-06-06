package com.korea.teamps.repository;

import com.korea.teamps.domain.ChampBasicStat;
import com.korea.teamps.domain.ChampPatchHistory;
import com.korea.teamps.domain.ChampRank;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ChampRepository {
    @Select("select * from C_BASICSTAT where name = #{name}")
    List<ChampBasicStat> findBasicStat(@Param("name") String name);

    @Select("SELECT * FROM c_patch_history WHERE name = #{name}")
    List<ChampPatchHistory> findPatchHistory(@Param("name") String name);

    List<ChampBasicStat> findAllChampImage();

    @Select("SELECT * FROM c_champ_tier WHERE line = #{line}")
    List<ChampRank> findByLineChampRank(@Param("line") String line);

    @Select("select tier.*, image.IMAGE_HEAD\n" +
            "from C_CHAMP_TIER tier, CHAMP_SKILL image\n" +
            "where tier.name = image.name\n" +
            "order by tier.PS_SCORE desc")
    List<ChampRank> findAllChampRank();
}
