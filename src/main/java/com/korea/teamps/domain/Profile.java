package com.korea.teamps.domain;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Profile {
    private String image;

    public Profile(String image) {
        this.image = image;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
