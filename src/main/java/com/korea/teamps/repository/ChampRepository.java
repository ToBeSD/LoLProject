package com.korea.teamps.repository;

import com.korea.teamps.domain.*;
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

    @Select("SELECT tier.*, image.IMAGE_HEAD\n" +
            "FROM c_champ_tier tier, champ_skill image\n" +
            "WHERE tier.name = image.name\n" +
            "AND tier.line = #{line}" +
            "ORDER BY tier.ps_score desc")
    List<ChampRank> findByLineChampRank(ChampRank champRank);

    @Select("select tier.*, image.IMAGE_HEAD\n" +
            "from C_CHAMP_TIER tier, CHAMP_SKILL image\n" +
            "where tier.name = image.name\n" +
            "order by tier.PS_SCORE desc")
    List<ChampRank> findAllChampRank();

    @Select("select match.enemy name, match.COUNT count, match.WIN_RATE winRate, image.IMAGE_HEAD image\n" +
            "from C_CHAMP_MATCH match, CHAMP_SKILL image\n" +
            "where match.enemy = image.name\n" +
            "and match.name = #{name}\n" +
            "and match.line = '탑'\n" +
            "and match.WIN_RATE < 50\n" +
            "order by match.WIN_RATE")
    List<ChampMatchLIst> findByNameHardMatch(ChampMatchLIst champMatchLIst);

    @Select("select match.enemy name, match.COUNT count, match.WIN_RATE winRate, image.IMAGE_HEAD image\n" +
            "from C_CHAMP_MATCH match, CHAMP_SKILL image\n" +
            "where match.enemy = image.name\n" +
            "and match.name = #{name}\n" +
            "and match.line = '탑'\n" +
            "and match.WIN_RATE > 50\n" +
            "order by match.WIN_RATE desc")
    List<ChampMatchLIst> findByNameEasyMatch(ChampMatchLIst champMatchLIst);

    @Select("select craw.name, craw.line, image.IMAGE pick1, image2.IMAGE pick2, craw.WIN_RATE, craw.PICK_RATE, craw.COUNT\n" +
            "from C_SPELL_ITEM craw, ITEM_INFO image, ITEM_INFO image2\n" +
            "where craw.pick1 = image.name\n" +
            "and craw.pick2 = image2.name\n" +
            "and craw.CATEGORY = '스펠'\n" +
            "and craw.name = #{name}\n" +
            "and craw.line = '탑'")
    List<ChampItemSelect> findByNameSpell(ChampItemSelect champItemSelect);

    @Select("select craw.name, craw.line, image.IMAGE pick1, image2.IMAGE pick2, craw.WIN_RATE, craw.PICK_RATE, craw.COUNT\n" +
            "from C_SPELL_ITEM craw, ITEM_INFO image, ITEM_INFO image2\n" +
            "where craw.pick1 = image.name\n" +
            "and craw.pick2 = image2.name\n" +
            "and craw.CATEGORY = '스타트아이템'\n" +
            "and craw.name = #{name}\n" +
            "and craw.line = '탑'")
    List<ChampItemSelect> findByNameStartItem(ChampItemSelect champItemSelect);

    @Select("select craw.name, craw.line, image.IMAGE pick1, image2.IMAGE pick2, craw.WIN_RATE, craw.PICK_RATE, craw.COUNT\n" +
            "from C_SPELL_ITEM craw, ITEM_INFO image, ITEM_INFO image2\n" +
            "where craw.pick1 = image.name\n" +
            "and craw.pick2 = image2.name\n" +
            "and craw.CATEGORY = '신발'\n" +
            "and craw.name = #{name}\n" +
            "and craw.line = '탑'")
    List<ChampItemSelect> findByNameShoes(ChampItemSelect champItemSelect);
}