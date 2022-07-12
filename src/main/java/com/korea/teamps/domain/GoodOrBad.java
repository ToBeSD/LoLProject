package com.korea.teamps.domain;


public class GoodOrBad {

    private String goodBad;
    private int bno;


    public GoodOrBad(String goodBad, int bno) {
        this.goodBad = goodBad;
        this.bno = bno;
    }

    public String getGoodBad() {
        return goodBad;
    }

    public void setGoodBad(String goodBad) {
        this.goodBad = goodBad;
    }

    public int getBno() {
        return bno;
    }

    public void setBno(int bno) {
        this.bno = bno;
    }
}
