package com.korea.teamps.domain;

public class ChampSkillSeq {
    private String name;
    private String line;
    private String skill1;
    private String skill2;
    private String skill3;
    private String skill4;
    private String skill5;
    private String skill6;
    private String skill7;
    private String skill8;
    private String skill9;
    private String skill10;
    private String skill11;
    private double winRate;
    private double pickRate;
    private String count;
    private int whatLevel;


    public ChampSkillSeq(String name, String line, String skill1, String skill2, String skill3, String skill4, String skill5, String skill6, String skill7, String skill8, String skill9, String skill10, String skill11, double winRate, double pickRate, String count, int whatLevel) {
        this.name = name;
        this.line = line;
        this.skill1 = skill1;
        this.skill2 = skill2;
        this.skill3 = skill3;
        this.skill4 = skill4;
        this.skill5 = skill5;
        this.skill6 = skill6;
        this.skill7 = skill7;
        this.skill8 = skill8;
        this.skill9 = skill9;
        this.skill10 = skill10;
        this.skill11 = skill11;
        this.winRate = winRate;
        this.pickRate = pickRate;
        this.count = count;
        this.whatLevel = whatLevel;
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

    public String getSkill4() {
        return skill4;
    }

    public void setSkill4(String skill4) {
        this.skill4 = skill4;
    }

    public String getSkill5() {
        return skill5;
    }

    public void setSkill5(String skill5) {
        this.skill5 = skill5;
    }

    public String getSkill6() {
        return skill6;
    }

    public void setSkill6(String skill6) {
        this.skill6 = skill6;
    }

    public String getSkill7() {
        return skill7;
    }

    public void setSkill7(String skill7) {
        this.skill7 = skill7;
    }

    public String getSkill8() {
        return skill8;
    }

    public void setSkill8(String skill8) {
        this.skill8 = skill8;
    }

    public String getSkill9() {
        return skill9;
    }

    public void setSkill9(String skill9) {
        this.skill9 = skill9;
    }

    public String getSkill10() {
        return skill10;
    }

    public void setSkill10(String skill10) {
        this.skill10 = skill10;
    }

    public String getSkill11() {
        return skill11;
    }

    public void setSkill11(String skill11) {
        this.skill11 = skill11;
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

    public int getWhatLevel() {
        return whatLevel;
    }

    public void setWhatLevel(int whatLevel) {
        this.whatLevel = whatLevel;
    }
}
