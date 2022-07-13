package com.korea.teamps.repository;

import com.korea.teamps.domain.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ChampRepository {
    @Select("select t.* , image.IMAGE_FULL\n" +
            "            from (\n" +
            "                select tier.name,\n" +
            "                       tier.line,\n" +
            "                       tier.win_rate                            w,\n" +
            "                       tier_before.win_rate                     w_before,\n" +
            "                       (tier_before.win_rate - tier.win_rate)   win_vari,\n" +
            "                       tier.pick_rate                           p,\n" +
            "                       tier_before.pick_rate                    p_before,\n" +
            "                       (tier_before.pick_rate - tier.pick_rate) pick_vari,\n" +
            "                       tier.ban_rate                            b,\n" +
            "                       tier_before.ban_rate                     b_before,\n" +
            "                       (tier_before.ban_rate - tier.ban_rate)   ban_vari\n" +
            "                from c_champ_tier tier,\n" +
            "                     c_champ_tier_before tier_before\n" +
            "                where tier.name = tier_before.name\n" +
            "                  and tier.line = tier_before.line\n" +
            "            ) t, CHAMP_SKILL image\n" +
            "            where t.name = image.name\n" +
            "             and( t.win_vari > 2 or t.win_vari < -2.5 )\n" +
            "             and ROWNUM < 9\n" +
            "            order by win_vari desc")
    List<ChampMainCard> findMainCard();

    @Select("select t.* , image.IMAGE_FULL\n" +
            "            from (\n" +
            "                select tier.name,\n" +
            "                       tier.line,\n" +
            "                       tier.win_rate                            w,\n" +
            "                       tier_before.win_rate                     w_before,\n" +
            "                       (tier_before.win_rate - tier.win_rate)   win_vari,\n" +
            "                       tier.pick_rate                           p,\n" +
            "                       tier_before.pick_rate                    p_before,\n" +
            "                       (tier_before.pick_rate - tier.pick_rate) pick_vari,\n" +
            "                       tier.ban_rate                            b,\n" +
            "                       tier_before.ban_rate                     b_before,\n" +
            "                       (tier_before.ban_rate - tier.ban_rate)   ban_vari\n" +
            "                from c_champ_tier tier,\n" +
            "                     c_champ_tier_before tier_before\n" +
            "                where tier.name = tier_before.name\n" +
            "                  and tier.line = tier_before.line\n" +
            "            ) t, CHAMP_SKILL image\n" +
            "            where t.name = image.name\n" +
            "              and t.name = #{name}\n" +
            "              and t.line = #{line}\n" +
            "            order by win_vari desc")
    ChampMainCard findByNameMainCard(ChampMainCard champMainCard);

    @Select("select name, stat, STAT_START startStat, STAT_FINAL finalStat, STAT_RANK statRank from C_BASICSTAT where name = #{name}")
    List<ChampBasicStat> findByNameBasicStat(ChampBasicStat champBasicStat);

    @Select("select champ name, SHOW_NAME skillName, SKILL_KEY skillKey, FUNCTION, image from SKILL_INFO where champ = #{name}")
    List<ChampBasicSkill> findByNameBasicSkill(ChampBasicSkill champBasicSkill);

    @Select("SELECT craw.name, craw.VERSION2 version, craw.SKILL_KEY, image.SHOW_NAME skillName, craw.FUNCTION content, image.IMAGE\n" +
            "FROM c_patch_history craw, SKILL_INFO image\n" +
            "WHERE craw.name = image.champ\n" +
            "  and craw.SKILL_KEY = image.SKILL_KEY\n" +
            "  and craw.name = #{name}")
    List<ChampPatchHistory> findPatchHistory(ChampPatchHistory champPatchHistory);

    @Select("SELECT tier.*, image.IMAGE_HEAD\n" +
            "FROM c_champ_tier tier, champ_skill image\n" +
            "WHERE tier.name = image.name\n" +
            "  AND tier.NAME = #{name}\n" +
            "  AND tier.line = #{line}\n" +
            "ORDER BY tier.ps_score desc")
    ChampRank findByLineNameChampRank(ChampRank champRank);

    @Select("SELECT tier.name, tier.line, tier.PS_SCORE, tierbefore.PS_SCORE b_ps_score, tier.WIN_RATE, tier.PICK_RATE, tier.BAN_RATE\n" +
            "            FROM c_champ_tier tier, C_CHAMP_TIER_BEFORE tierbefore\n" +
            "            WHERE tier.name = tierbefore.name\n" +
            "              AND tier.NAME = #{name}\n" +
            "              AND tier.line = #{line}" +
            "              AND rownum = 1")
    ChampRateSummary findByLineNameChampRateSummary(ChampRateSummary champRateSummary);

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

    @Select("select * from C_HIGH_PICK where name = #{name}")
    List<ChampHighPick> findByNameHighPick(ChampHighPick champHighPick);
    @Select("select * from C_HIGH_PICK where name = #{name} order by pickrate desc")
    List<ChampHighPick> findByNameHighPickDesc(ChampHighPick champHighPick);

    @Select("select * from\n" +
            "             (select *\n" +
            "              from c_high_pick\n" +
            "              where name like '%${name}%'\n" +
            "              order by pickrate desc)\n" +
            "         where rownum = 1")
    ChampHighPick findByNameHighPickOne(ChampHighPick champHighPick);

    @Select("select name, IMAGE_HEAD\n" +
            "from CHAMP_SKILL\n" +
            "where name like '%${name}%'\n" +
            "  and rownum = 1")
    ChampName findByNameHeadImage(@Param("name") String name);

    @Select("select name, IMAGE_HEAD from CHAMP_SKILL")
    List<ChampName> getAllChampNameAndImage();

    @Select("select image_D\n" +
            "from rune_info\n" +
            "where (\n" +
            "    select build\n" +
            "    from rune_info\n" +
            "    where (\n" +
            "        select c_rune_combine.pick1\n" +
            "        from c_rune_combine\n" +
            "        where name = #{name}\n" +
            "        and (\n" +
            "            select max(c_rune_combine.win_rate)\n" +
            "            from c_rune_combine\n" +
            "            where name = #{name}\n" +
            "            and line = #{line}\n" +
            "            AND c_rune_combine.pick_rate > 5)\n" +
            "            = c_rune_combine.win_rate) = name) = build")
    List<RuneSummary> findByNameLineRuneType(@Param("name") String name, @Param("line") String line);

    @Select("select image\n" +
            "            from rune_info_assist\n" +
            "            where (\n" +
            "                select build from rune_info_assist\n" +
            "                where (\n" +
            "                    select c_rune_combine.pick5\n" +
            "                    from c_rune_combine\n" +
            "                    where name = #{name}\n" +
            "                      and (\n" +
            "                              select max(c_rune_combine.pick_rate)\n" +
            "                              from c_rune_combine\n" +
            "                              where name = #{name}\n" +
            "                                and line = #{line}\n" +
            "                                AND c_rune_combine.pick_rate > 5) = c_rune_combine.pick_rate) = name) = build")
    List<RuneSummary> findByNameLineSubRuneSummary(@Param("name") String name, @Param("line") String line);

    @Select("select match.enemy name, match.line, match.COUNT count, match.WIN_RATE winRate, image.IMAGE_HEAD image\n" +
            "from C_CHAMP_MATCH match, CHAMP_SKILL image\n" +
            "where match.enemy = image.name\n" +
            "and match.name = #{name}\n" +
            "and match.line = #{line}\n" +
            "and match.WIN_RATE < 50\n" +
            "order by match.WIN_RATE")
    List<ChampMatchLIst> findByNameHardMatch(ChampMatchLIst champMatchLIst);

    @Select("select match.enemy name, match.line, match.COUNT count, match.WIN_RATE winRate, image.IMAGE_HEAD image\n" +
            "from C_CHAMP_MATCH match, CHAMP_SKILL image\n" +
            "where match.enemy = image.name\n" +
            "and match.name = #{name}\n" +
            "and match.line = #{line}\n" +
            "and match.WIN_RATE > 50\n" +
            "order by match.WIN_RATE desc")
    List<ChampMatchLIst> findByNameEasyMatch(ChampMatchLIst champMatchLIst);

    @Select("select craw.name, craw.line, image.IMAGE pick1, image2.IMAGE pick2, craw.WIN_RATE, craw.PICK_RATE, craw.COUNT\n" +
            "from C_SPELL_ITEM craw, ITEM_INFO image, ITEM_INFO image2\n" +
            "where craw.pick1 = image.name\n" +
            "and craw.pick2 = image2.name\n" +
            "and craw.CATEGORY = '스펠'\n" +
            "and craw.name = #{name}\n" +
            "and craw.line = #{line}" +
            "order by craw.PICK_RATE desc")
    List<ChampItemSelect> findByNameSpell(ChampItemSelect champItemSelect);

    @Select("select craw.name, craw.line, image.IMAGE pick1, nvl(image2.IMAGE, '없음') pick2, craw.WIN_RATE, craw.PICK_RATE, craw.COUNT\n" +
            "from C_SPELL_ITEM craw, ITEM_INFO image, ITEM_INFO image2\n" +
            "where craw.pick1 = image.name\n" +
            "and nvl(craw.pick2, '없음') = image2.name\n" +
            "and craw.CATEGORY = '스타트 아이템'\n" +
            "and craw.name = #{name}\n" +
            "and craw.line = #{line}" +
            "order by craw.PICK_RATE desc")
    List<ChampItemSelect> findByNameStartItem(ChampItemSelect champItemSelect);

    @Select("select craw.name, craw.line, image.IMAGE pick1, nvl(image2.IMAGE, '없음') pick2, craw.WIN_RATE, craw.PICK_RATE, craw.COUNT\n" +
            "from C_SPELL_ITEM craw, ITEM_INFO image, ITEM_INFO image2\n" +
            "where craw.pick1 = image.name\n" +
            "and nvl(craw.pick2, '없음') = image2.name\n" +
            "and craw.CATEGORY = '신발'\n" +
            "and craw.name = #{name}\n" +
            "and craw.line = #{line}" +
            "order by craw.PICK_RATE desc")
    List<ChampItemSelect> findByNameShoes(ChampItemSelect champItemSelect);

    @Select("select craw.name, craw.line, craw.rank, image.IMAGE item, craw.WIN_RATE, craw.PICK_RATE, craw.COUNT\n" +
            "from C_CORE_EACH craw, ITEM_INFO image\n" +
            "where craw.pick = image.name\n" +
            "and craw.name = #{name}\n" +
            "and craw.rank = #{rank}\n" +
            "and craw.line = #{line}" +
            "order by craw.PICK_RATE desc")
    List<ChampCoreEach> findByCoreCoreEach(ChampCoreEach champCoreEach);

    @Select("select craw.name, craw.line, craw.RANK, image1.IMAGE item1, image2.IMAGE item2, nvl(image3.IMAGE, '없음') item3, nvl(image4.IMAGE, '없음') item4, craw.WIN_RATE, craw.PICK_RATE, craw.COUNT\n" +
            "from C_CORE_COMBINE craw, ITEM_INFO image1, ITEM_INFO image2, ITEM_INFO image3, ITEM_INFO image4\n" +
            "where craw.pick1 = image1.name\n" +
            "  and craw.pick2 = image2.name\n" +
            "  and nvl(craw.pick3, '없음') = image3.name\n" +
            "  and nvl(craw.pick4, '없음') = image4.name\n" +
            "  and craw.name = #{name}\n" +
            "  and craw.rank = #{rank}\n" +
            "  and craw.line = #{line}" +
            "order by craw.PICK_RATE desc")
    List<ChampCoreCombine> findByCoreCoreCombine(ChampCoreCombine champCoreCombine);

    @Select("select craw.name, craw.line, image1.image skill1, image2.image skill2, image3.image skill3, craw.WIN_RATE, craw.PICK_RATE, craw.COUNT\n" +
            "from C_SKILL_MASTER craw, SKILL_INFO image1, SKILL_INFO image2, SKILL_INFO image3\n" +
            "where craw.pick1 = image1.name\n" +
            "  and craw.pick2 = image2.name\n" +
            "  and craw.pick3 = image3.name\n" +
            "  and craw.name = #{name}\n" +
            "  and craw.line = #{line}" +
            "order by craw.PICK_RATE desc")
    List<ChampSkillMaster> findByNameSkillMaster(ChampSkillMaster champSkillMaster);

    @Select("select craw.name, craw.line, image1.image skill1, image2.image skill2, image3.image skill3, nvl(image4.image, '없음') skill4, nvl(image5.image, '없음') skill5,\n" +
            "       nvl(image6.image, '없음') skill6, nvl(image7.image, '없음') skill7, nvl(image8.image, '없음') skill8, nvl(image9.image, '없음') skill9, nvl(image10.image, '없음') skill10,\n" +
            "       nvl(image11.image, '없음') skill11,craw.WIN_RATE, craw.PICK_RATE, craw.COUNT, craw.what_level\n" +
            "from C_SKILL_SEQ craw, SKILL_INFO image1, SKILL_INFO image2, SKILL_INFO image3, SKILL_INFO image4, SKILL_INFO image5, SKILL_INFO image6\n" +
            "   , SKILL_INFO image7, SKILL_INFO image8, SKILL_INFO image9, SKILL_INFO image10, SKILL_INFO image11\n" +
            "where craw.pick1 = image1.name\n" +
            "  and craw.pick2 = image2.name\n" +
            "  and craw.pick3 = image3.name\n" +
            "  and nvl(craw.pick4, '없음') = image4.name\n" +
            "  and nvl(craw.pick5, '없음') = image5.name\n" +
            "  and nvl(craw.pick6, '없음') = image6.name\n" +
            "  and nvl(craw.pick7, '없음') = image7.name\n" +
            "  and nvl(craw.pick8, '없음') = image8.name\n" +
            "  and nvl(craw.pick9, '없음') = image9.name\n" +
            "  and nvl(craw.pick10, '없음') = image10.name\n" +
            "  and nvl(craw.pick11, '없음') = image11.name\n" +
            "  and craw.name = #{name}\n" +
            "  and craw.line = #{line}\n" +
            "  and craw.WHAT_LEVEL = ${whatLevel}" +
            "order by craw.PICK_RATE desc")
    List<ChampSkillSeq> findByNameSkillSeq(ChampSkillSeq champSkillSeq);

    @Select("select craw.name, craw.line, image1.SKILL_KEY skill1, image2.SKILL_KEY skill2, image3.SKILL_KEY skill3, nvl(image4.SKILL_KEY, '없음') skill4, nvl(image5.SKILL_KEY, '없음') skill5,\n" +
            "                   nvl(image6.SKILL_KEY, '없음') skill6, nvl(image7.SKILL_KEY, '없음') skill7, nvl(image8.SKILL_KEY, '없음') skill8, nvl(image9.SKILL_KEY, '없음') skill9, nvl(image10.SKILL_KEY, '없음') skill10,\n" +
            "                   nvl(image11.SKILL_KEY, '없음') skill11,craw.WIN_RATE, craw.PICK_RATE, craw.COUNT, craw.what_level\n" +
            "            from C_SKILL_SEQ craw, SKILL_INFO image1, SKILL_INFO image2, SKILL_INFO image3, SKILL_INFO image4, SKILL_INFO image5, SKILL_INFO image6\n" +
            "               , SKILL_INFO image7, SKILL_INFO image8, SKILL_INFO image9, SKILL_INFO image10, SKILL_INFO image11\n" +
            "            where craw.pick1 = image1.name\n" +
            "              and craw.pick2 = image2.name\n" +
            "              and craw.pick3 = image3.name\n" +
            "              and nvl(craw.pick4, '없음') = image4.name\n" +
            "              and nvl(craw.pick5, '없음') = image5.name\n" +
            "              and nvl(craw.pick6, '없음') = image6.name\n" +
            "              and nvl(craw.pick7, '없음') = image7.name\n" +
            "              and nvl(craw.pick8, '없음') = image8.name\n" +
            "              and nvl(craw.pick9, '없음') = image9.name\n" +
            "              and nvl(craw.pick10, '없음') = image10.name\n" +
            "              and nvl(craw.pick11, '없음') = image11.name\n" +
            "              and craw.name = #{name}\n" +
            "              and craw.line = #{line}\n" +
            "              and craw.WHAT_LEVEL = 11\n" +
            "              and rownum = 1\n" +
            "            order by craw.PICK_RATE desc")
    ChampSkillSeq findByNameSkillSeqSummary(ChampSkillSeq champSkillSeq);

    @Select("select craw.name, craw.line, image1.image skill1, image2.image skill2, image3.image skill3, image4.image skill4, image5.image skill5,\n" +
            "       image6.image skill6, craw.WIN_RATE, craw.PICK_RATE\n" +
            "from C_RUNE_COMBINE craw, RUNE_INFO image1, RUNE_INFO image2, RUNE_INFO image3, RUNE_INFO image4, RUNE_INFO image5, RUNE_INFO image6\n" +
            "where craw.pick1 = image1.name\n" +
            "  and craw.pick2 = image2.name\n" +
            "  and craw.pick3 = image3.name\n" +
            "  and craw.pick4 = image4.name\n" +
            "  and craw.pick5 = image5.name\n" +
            "  and craw.pick6 = image6.name\n" +
            "  and craw.name = #{name}\n" +
            "  and craw.line = #{line}" +
            "order by craw.PICK_RATE desc")
    List<ChampRuneCombine> findByNameRuneCombine(ChampRuneCombine champRuneCombine);

    @Select("select *\n" +
            "    from (select craw.name, craw.line, image1.image skill1, image2.image skill2, image3.image skill3, image4.image skill4, image5.image skill5,\n" +
            "                   image6.image skill6, craw.WIN_RATE, craw.PICK_RATE\n" +
            "            from C_RUNE_COMBINE craw, RUNE_INFO image1, RUNE_INFO image2, RUNE_INFO image3, RUNE_INFO image4, RUNE_INFO image5, RUNE_INFO image6\n" +
            "            where craw.pick1 = image1.name\n" +
            "              and craw.pick2 = image2.name\n" +
            "              and craw.pick3 = image3.name\n" +
            "              and craw.pick4 = image4.name\n" +
            "              and craw.pick5 = image5.name\n" +
            "              and craw.pick6 = image6.name\n" +
            "              and craw.name = #{name}\n" +
            "              and craw.line = #{line}\n" +
            "            order by craw.PICK_RATE desc)\n" +
            "    where rownum = 1")
    ChampRuneCombine findByNameRuneCombineOne(ChampRuneCombine champRuneCombine);


    @Select("select craw.name, craw.line, image1.image pick1, image2.image pick2, image3.image pick3, craw.WIN_RATE, craw.PICK_RATE\n" +
            "from C_RUNE_SHARD craw, RUNE_INFO image1, RUNE_INFO image2, RUNE_INFO image3\n" +
            "where craw.pick1 = image1.name\n" +
            "  and craw.pick2 = image2.name\n" +
            "  and craw.pick3 = image3.name\n" +
            "  and craw.name = #{name}\n" +
            "  and craw.line = #{line}" +
            "order by craw.PICK_RATE desc")
    List<ChampRuneShard> findByNameRuneShard(ChampRuneShard champRuneShard);
}