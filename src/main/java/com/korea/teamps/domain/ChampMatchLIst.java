package com.korea.teamps.domain;

public class ChampMatchLIst {
    private String name;
    private String count;
    private double winRate;
    private String image;

    public ChampMatchLIst(String name, String count, int winRate, String image) {
        this.name = name;
        this.count = count;
        this.winRate = winRate;
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public double getWinRate() {
        return winRate;
    }

    public void setWinRate(double winRate) {
        this.winRate = winRate;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
