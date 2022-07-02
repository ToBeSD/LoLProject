package com.korea.teamps.domain;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Member {

    private int memberKey;
    private String email;
    private String password;
    private String nickname;
    private String image;
    private String introduce;
    private String admin;

    public Member(int memberKey, String email, String password, String nickname, String image, String introduce, String admin) {
        this.memberKey = memberKey;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.image = image;
        this.introduce = introduce;
        this.admin = admin;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public String getAdmin() {
        return admin;
    }

    public void setAdmin(String admin) {
        this.admin = admin;
    }
}
