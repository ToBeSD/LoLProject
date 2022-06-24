package com.korea.teamps.domain;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class WriteContent {

    private String title;
    private String content;
    private String category;

    public WriteContent(String title, String content, String category) {
        this.title = title;
        this.content = content;
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

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }
}
