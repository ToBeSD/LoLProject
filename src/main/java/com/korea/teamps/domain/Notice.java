package com.korea.teamps.domain;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Notice {
    private String title;
    private String content;
    private String writeDate;
    private int bno;

    public Notice(String title, String content, String writeDate, int bno) {
        this.title = title;
        this.content = content;
        this.writeDate = writeDate;
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

    public int getBno() {
        return bno;
    }

    public void setBno(int bno) {
        this.bno = bno;
    }

}
