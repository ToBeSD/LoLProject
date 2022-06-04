package com.korea.teamps.repository;

import com.korea.teamps.domain.Champ;

import java.util.List;

public interface ChampRepository {
    Champ findStatistics();

    Champ findBasicStat();

    Champ findPatchHistory();

    List<Champ> findAllChampImage();

    List<Champ> findAllChampRank();
}
