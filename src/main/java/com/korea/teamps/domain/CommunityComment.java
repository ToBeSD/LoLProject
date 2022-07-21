package com.korea.teamps.domain;


import lombok.NoArgsConstructor;

@NoArgsConstructor
public class CommunityComment {
    private int memberKey;
    private int bno;
    private int baseNo;
    private int upperBaseNo;
    private String content;
    private String writeDate;
    private String image;
    private String nickName;

    public CommunityComment(int memberKey, int bno, int baseNo, int upperBaseNo, String content, String writeDate, String image, String nickName) {
        this.memberKey = memberKey;
        this.bno = bno;
        this.baseNo = baseNo;
        this.upperBaseNo = upperBaseNo;
        this.content = content;
        this.writeDate = writeDate;
        this.image = image;
        this.nickName = nickName;
    }

    public int getMemberKey() {
        return memberKey;
    }

    public void setMemberKey(int memberKey) {
        this.memberKey = memberKey;
    }

    public int getBno() {
        return bno;
    }

    public void setBno(int bno) {
        this.bno = bno;
    }

    public int getBaseNo() {
        return baseNo;
    }

    public void setBaseNo(int baseNo) {
        this.baseNo = baseNo;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getWriteDate() {
        return writeDate;
    }

    public void setWriteDate(String writeDate) {
        this.writeDate = writeDate;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public int getUpperBaseNo() {
        return upperBaseNo;
    }

    public void setUpperBaseNo(int upperBaseNo) {
        this.upperBaseNo = upperBaseNo;
    }
}
