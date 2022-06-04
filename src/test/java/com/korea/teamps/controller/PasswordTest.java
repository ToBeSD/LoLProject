package com.korea.teamps.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PasswordTest {

    @Autowired
    PasswordEncoder passwordEncoder;

    @DisplayName("비밀번호 암호화 테스트")
    @Test
    public void passwordTest() {

        String pass = "tlagustjq1234";
        String encode = passwordEncoder.encode(pass);
        System.out.println("encode : " + encode);

        boolean matches = passwordEncoder.matches(pass, "$2a$10$UJi.UbVBA7Nh0yA1PIZhqeVck4cVq1rafD119WCDkDmL1MruKBDTC");
        assertEquals(true, matches);

        System.out.println("matches : " + matches);

    }
}