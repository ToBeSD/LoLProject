package com.korea.teamps.domain;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class WriteContent {

    private String title;
    private String content;
    private String category;

    private String champName;

    public WriteContent(String title, String content, String category, String champName) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.champName = champName;
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

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public String getChampName() {
        return champName;
    }

    public void setChampName(String champName) {
        this.champName = champName;
    }
}
