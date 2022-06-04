package com.korea.teamps.repository;

import com.korea.teamps.domain.Community;
import org.springframework.jdbc.datasource.DataSourceUtils;

import javax.sql.DataSource;
import java.sql.Connection;

public class JdbcCommunityRepository implements CommunityRepository{
    private final DataSource dataSource;

    public JdbcCommunityRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    private Connection getConnection() {
        return DataSourceUtils.getConnection(dataSource);
    }

    @Override
    public Community findAllTitle() {
        return null;
    }
}
