package com.korea.teamps.domain;

public class Member {

    private int memberKey;
    private String email;
    private String password;
    private String nickname;



    public Member(int memberKey, String email, String password, String nickname) {
        this.memberKey = memberKey;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }

    public int getMemberKey() {
        return memberKey;
    }

    public void setMemberKey(int memberKey) {
        this.memberKey = memberKey;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }


}
