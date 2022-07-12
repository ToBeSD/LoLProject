package com.korea.teamps.domain;


import java.util.HashSet;
import java.util.Iterator;

public class HS {
    public static void main(String[] args) {
        HashSet<Integer> hSet = new HashSet<Integer>();

        hSet.add(10);
        hSet.add(20);
        hSet.add(30);
        hSet.add(30);
        hSet.add(20);
//        System.out.println(hSet);

        Iterator<Integer> itr = hSet.iterator();
        while (itr.hasNext()) {
            System.out.println(itr.next());
        }

        // 1. Iterator객체를 hashset에서 뽑아냅니다
        // 2. 배열을 돕니다.
        // 3. 다음순서 반복   

    }
}
