package com.korea.teamps.domain;

import lombok.NoArgsConstructor;

public class ChampRuneType {
    private String name;
    private String line;
    private String mainRuneType;
    private String subRuneType;

    public ChampRuneType(String name, String line, String mainRuneType, String subRuneType) {
        this.name = name;
        this.line = line;
        this.mainRuneType = mainRuneType;
        this.subRuneType = subRuneType;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getMainRuneType() {
        return mainRuneType;
    }

    public void setMainRuneType(String mainRuneType) {
        this.mainRuneType = mainRuneType;
    }

    public String getSubRuneType() {
        return subRuneType;
    }

    public void setSubRuneType(String subRuneType) {
        this.subRuneType = subRuneType;
    }

}
