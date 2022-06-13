package com.korea.teamps.domain;

public class Community {

    private String title;
    private String content;
    private String writeDate;
    private int good;
    private int bad;
    private int count;
    private String category;

    public Community(String title, String content, String writeDate, int good, int bad, int count, String category) {
        this.title = title;
        this.content = content;
        this.writeDate = writeDate;
        this.good = good;
        this.bad = bad;
        this.count = count;
        this.category = category;
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
}
