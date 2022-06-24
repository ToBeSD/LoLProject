package com.korea.teamps.domain;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Community {
    private int bno;
    private String title;
    private String content;
    private String writeDate;
    private int good;
    private int bad;
    private int count;
    private String category;
    private String nickName;
    private String image;

    public Community(int bno, String title, String content, String writeDate, int good, int bad, int count, String category, String nickName, String image) {
        this.bno = bno;
        this.title = title;
        this.content = content;
        this.writeDate = writeDate;
        this.good = good;
        this.bad = bad;
        this.count = count;
        this.category = category;
        this.nickName = nickName;
        this.image = image;
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

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getBno() {
        return bno;
    }

    public void setBno(int bno) {
        this.bno = bno;
    }
}
