package com.korea.teamps.domain;

public class ChangePassword {
    private int memberKey;
    private String password;
    private String newPassword;

    public ChangePassword(int memberKey, String password, String newPassword) {
        this.memberKey = memberKey;
        this.password = password;
        this.newPassword = newPassword;
    }

    public int getMemberKey() {
        return memberKey;
    }

    public void setMemberKey(int memberKey) {
        this.memberKey = memberKey;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
