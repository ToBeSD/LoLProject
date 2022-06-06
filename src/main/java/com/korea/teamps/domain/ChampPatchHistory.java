package com.korea.teamps.domain;

public class ChampPatchHistory {
    private String name;
    private String version1;
    private String version2;
    private String skillKey;
    private String content;

    ChampPatchHistory(String name, String version1, String version2, String skillKey, String content) {
        this.name = name;
        this.version1 = version1;
        this.version2 = version2;

        this.skillKey = skillKey;
        this.content = content;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSkillKey() {
        return skillKey;
    }

    public void setSkillKey(String skillKey) {
        this.skillKey = skillKey;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getVersion1() {
        return version1;
    }

    public void setVersion1(String version1) {
        this.version1 = version1;
    }

    public String getVersion2() {
        return version2;
    }

    public void setVersion2(String version2) {
        this.version2 = version2;
    }
}
