package com.korea.teamps.domain;


public class ChampRateSummary {
    private String name;
    private String line;
    private double psScore;
    private double psScoreBefore;
    private double winRate;
    private double pickRate;
    private double banRate;

    public ChampRateSummary(String name, String line, double psScore, double psScoreBefore, double winRate, double pickRate, double banRate) {
        this.name = name;
        this.line = line;
        this.psScore = psScore;
        this.psScoreBefore = psScoreBefore;
        this.winRate = winRate;
        this.pickRate = pickRate;
        this.banRate = banRate;
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

    public double getPsScore() {
        return psScore;
    }

    public void setPsScore(double psScore) {
        this.psScore = psScore;
    }

    public double getPsScoreBefore() {
        return psScoreBefore;
    }

    public void setPsScoreBefore(double psScoreBefore) {
        this.psScoreBefore = psScoreBefore;
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

    public double getBanRate() {
        return banRate;
    }

    public void setBanRate(double banRate) {
        this.banRate = banRate;
    }

}
