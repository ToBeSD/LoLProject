package com.korea.teamps.domain;

import lombok.NoArgsConstructor;

public class ChampRuneShard {
    private String name;
    private String line;
    private String pick1;
    private String pick2;
    private String pick3;
    private double winRate;
    private double pickRate;


    public ChampRuneShard(String name, String line, String pick1, String pick2, String pick3, double winRate, double pickRate) {
        this.name = name;
        this.line = line;
        this.pick1 = pick1;
        this.pick2 = pick2;
        this.pick3 = pick3;
        this.winRate = winRate;
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

    public double getWinRate() {
        return winRate;
    }

    public void setWinRate(double winRate) {
        this.winRate = winRate;
    }

    public double getPickRate() {
        return pickRate;
    }

    public void setPickRate(double pickRate) {
        this.pickRate = pickRate;
    }

    public String getPick1() {
        return pick1;
    }

    public void setPick1(String pick1) {
        this.pick1 = pick1;
    }

    public String getPick2() {
        return pick2;
    }

    public void setPick2(String pick2) {
        this.pick2 = pick2;
    }

    public String getPick3() {
        return pick3;
    }

    public void setPick3(String pick3) {
        this.pick3 = pick3;
    }
}
