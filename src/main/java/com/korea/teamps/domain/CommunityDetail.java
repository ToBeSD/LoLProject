package com.korea.teamps.domain;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class CommunityDetail {
    private int memberKey;
    private int bno;
    private String title;
    private String content;
    private String writeDate;
    private int good;
    private int bad;
    private int count;
    private String category;
    private String introduce;
    private String image;
    private String nickName;



    public CommunityDetail(int memberKey, int bno, String title, String content, String writeDate, int good, int bad, int count, String category, String introduce, String image, String nickName) {
        this.memberKey = memberKey;
        this.bno = bno;
        this.title = title;
        this.content = content;
        this.writeDate = writeDate;
        this.good = good;
        this.bad = bad;
        this.count = count;
        this.category = category;
        this.introduce = introduce;
        this.image = image;
        this.nickName = nickName;
    }

    public int getBno() {
        return bno;
    }

    public void setBno(int bno) {
        this.bno = bno;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public int getGood() {
        return good;
    }

    public void setGood(int good) {
        this.good = good;
    }

    public int getBad() {
        return bad;
    }

    public void setBad(int bad) {
        this.bad = bad;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
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

    public int getMemberKey() {
        return memberKey;
    }

    public void setMemberKey(int memberKey) {
        this.memberKey = memberKey;
    }
}
