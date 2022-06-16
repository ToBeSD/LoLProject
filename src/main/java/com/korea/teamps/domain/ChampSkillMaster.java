package com.korea.teamps.domain;

public class ChampSkillMaster {
    private String name;
    private String line;
    private String skill1;
    private String skill2;
    private String skill3;
    private double winRate;
    private double pickRate;
    private String count;


    public ChampSkillMaster(String name, String line, String skill1, String skill2, String skill3, double winRate, double pickRate, String count) {
        this.name = name;
        this.line = line;
        this.skill1 = skill1;
        this.skill2 = skill2;
        this.skill3 = skill3;
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

    public String getSkill1() {
        return skill1;
    }

    public void setSkill1(String skill1) {
        this.skill1 = skill1;
    }

    public String getSkill2() {
        return skill2;
    }

    public void setSkill2(String skill2) {
        this.skill2 = skill2;
    }

    public String getSkill3() {
        return skill3;
    }

    public void setSkill3(String skill3) {
        this.skill3 = skill3;
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

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }
}
