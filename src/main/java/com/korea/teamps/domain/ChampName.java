package com.korea.teamps.domain;

public class ChampName {
    private String name;
    private String headImage;


    public ChampName(String name, String headImage) {
        this.name = name;
        this.headImage = headImage;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHeadImage() {
        return headImage;
    }

    public void setHeadImage(String headImage) {
        this.headImage = headImage;
    }
}
