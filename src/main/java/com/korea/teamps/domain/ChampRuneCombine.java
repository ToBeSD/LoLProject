package com.korea.teamps.domain;

import lombok.NoArgsConstructor;

public class ChampRuneCombine {
    private String name;
    private String line;
    private String pick1;
    private String pick2;
    private String pick3;
    private String pick4;
    private String pick5;
    private String pick6;
    private double winRate;
    private double pickRate;

    public ChampRuneCombine(String name, String line, String pick1, String pick2, String pick3, String pick4, String pick5, String pick6, double winRate, double pickRate) {
        this.name = name;
        this.line = line;
        this.pick1 = pick1;
        this.pick2 = pick2;
        this.pick3 = pick3;
        this.pick4 = pick4;
        this.pick5 = pick5;
        this.pick6 = pick6;
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

    public String getPick4() {
        return pick4;
    }

    public void setPick4(String pick4) {
        this.pick4 = pick4;
    }

    public String getPick5() {
        return pick5;
    }

    public void setPick5(String pick5) {
        this.pick5 = pick5;
    }

    public String getPick6() {
        return pick6;
    }

    public void setPick6(String pick6) {
        this.pick6 = pick6;
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

}
