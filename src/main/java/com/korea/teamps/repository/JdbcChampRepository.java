package com.korea.teamps.repository;

import com.korea.teamps.domain.Champ;
import org.springframework.jdbc.datasource.DataSourceUtils;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.List;

public class JdbcChampRepository implements ChampRepository{
    private final DataSource dataSource;

    public JdbcChampRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    private Connection getConnection() {
        return DataSourceUtils.getConnection(dataSource);
    }


    @Override
    public Champ findStatistics() {
        return null;
    }

    @Override
    public Champ findBasicStat() {
        return null;
    }

    @Override
    public Champ findPatchHistory() {
        return null;
    }

    @Override
    public List<Champ> findAllChampImage() {
        return null;
    }

    @Override
    public List<Champ> findAllChampRank() {
        return null;
    }
}
