package com.korea.teamps.domain;

public class BuildEdit {
    private int bno;
    private String title;
    private String champName;
    private String content;

    public BuildEdit(int bno, String title, String champName, String content) {
        this.bno = bno;
        this.title = title;
        this.champName = champName;
        this.content = content;
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

    public String getChampName() {
        return champName;
    }

    public void setChampName(String champName) {
        this.champName = champName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
