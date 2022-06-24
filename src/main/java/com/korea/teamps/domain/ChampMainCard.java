package com.korea.teamps.domain;

import lombok.NoArgsConstructor;


public class ChampMainCard {
    private String  name;
    private String line;
    private double w;
    private double wBefore;
    private double winVari;
    private double p;
    private double pBefore;
    private double pickVari;
    private double b;
    private double bBefore;
    private double banVari;
    private String image;

    public ChampMainCard(String name, String line, double w, double wBefore, double winVari, double p, double pBefore, double pickVari, double b, double bBefore, double banVari, String image) {
        this.name = name;
        this.line = line;
        this.w = w;
        this.wBefore = wBefore;
        this.winVari = winVari;
        this.p = p;
        this.pBefore = pBefore;
        this.pickVari = pickVari;
        this.b = b;
        this.bBefore = bBefore;
        this.banVari = banVari;
        this.image = image;
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

    public double getW() {
        return w;
    }

    public void setW(double w) {
        this.w = w;
    }

    public double getwBefore() {
        return wBefore;
    }

    public void setwBefore(double wBefore) {
        this.wBefore = wBefore;
    }

    public double getWinVari() {
        return winVari;
    }

    public void setWinVari(double winVari) {
        this.winVari = winVari;
    }

    public double getP() {
        return p;
    }

    public void setP(double p) {
        this.p = p;
    }

    public double getpBefore() {
        return pBefore;
    }

    public void setpBefore(double pBefore) {
        this.pBefore = pBefore;
    }

    public double getPickVari() {
        return pickVari;
    }

    public void setPickVari(double pickVari) {
        this.pickVari = pickVari;
    }

    public double getB() {
        return b;
    }

    public void setB(double b) {
        this.b = b;
    }

    public double getbBefore() {
        return bBefore;
    }

    public void setbBefore(double bBefore) {
        this.bBefore = bBefore;
    }

    public double getBanVari() {
        return banVari;
    }

    public void setBanVari(double banVari) {
        this.banVari = banVari;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
