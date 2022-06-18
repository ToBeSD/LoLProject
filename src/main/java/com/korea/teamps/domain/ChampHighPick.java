package com.korea.teamps.domain;

public class ChampHighPick {
    private String name;
    private String line;
    private String pickRate;

    public ChampHighPick(String name, String line, String pickRate) {
        this.name = name;
        this.line = line;
        this.pickRate = pickRate;
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

    public String getPickRate() {
        return pickRate;
    }

    public void setPickRate(String pickRate) {
        this.pickRate = pickRate;
    }

}
