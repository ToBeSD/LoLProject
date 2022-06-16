package com.korea.teamps.domain;

public class ChampCoreEach {
    private String name;
    private String line;
    private String rank;
    private String item;
    private double winRate;
    private double pickRate;
    private String count;

    public ChampCoreEach(String name, String line, String rank, String item, double winRate, double pickRate, String count) {
        this.name = name;
        this.line = line;
        this.rank = rank;
        this.item = item;
        this.winRate = winRate;
        this.pickRate = pickRate;
        this.count = count;
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

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
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

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }
}
