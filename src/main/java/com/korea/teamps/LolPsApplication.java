package com.korea.teamps;

import com.korea.teamps.domain.ChampBasicStat;
import org.apache.ibatis.type.MappedTypes;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MappedTypes({ChampBasicStat.class})
@MapperScan("com.korea.teamps.repository")
@SpringBootApplication
public class LolPsApplication {

	public static void main(String[] args) {
		SpringApplication.run(LolPsApplication.class, args);
	}

}
