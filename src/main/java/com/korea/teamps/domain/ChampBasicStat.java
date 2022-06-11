package com.korea.teamps.domain;

public class ChampBasicStat {
    private String champName;
    private String stat;
    private String statStart;
    private String statFinal;
    private String statRank;

    ChampBasicStat(String champName, String stat, String statStart, String statFinal, String statRank) {
        this.champName = champName;
        this.stat = stat;
        this.statStart = statStart;
        this.statFinal = statFinal;
        this.statRank = statRank;
    }

    public String getChampName() {
        return champName;
    }

    public void setChampName(String champName) {
        this.champName = champName;
    }

    public String getStat() {
        return stat;
    }

    public void setStat(String stat) {
        this.stat = stat;
    }

    public String getStatStart() {
        return statStart;
    }

    public void setStatStart(String statStart) {
        this.statStart = statStart;
    }

    public String getStatFinal() {
        return statFinal;
    }

    public void setStatFinal(String statFinal) {
        this.statFinal = statFinal;
    }

    public String getStatRank() {
        return statRank;
    }

    public void setStatRank(String statRank) {
        this.statRank = statRank;
    }
}