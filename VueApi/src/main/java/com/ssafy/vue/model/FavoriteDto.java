package com.ssafy.vue.model;

public class FavoriteDto {
    private String user_id;
    private String dongCode;
    private String aptName;
    private String reg_time;

    public FavoriteDto(String user_id, String dongCode, String aptName, String reg_time) {
        this.user_id = user_id;
        this.dongCode = dongCode;
        this.aptName = aptName;
        this.reg_time = reg_time;
    }

    public FavoriteDto() {
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getDongCode() {
        return dongCode;
    }

    public void setDongCode(String dongCode) {
        this.dongCode = dongCode;
    }

    public String getAptName() {
        return aptName;
    }

    public void setAptName(String aptName) {
        this.aptName = aptName;
    }

    public String getReg_time() {
        return reg_time;
    }

    public void setReg_time(String reg_time) {
        this.reg_time = reg_time;
    }

    @Override
    public String toString() {
        return "FavoriteDto [user_id=" + user_id + ", dongCode=" + dongCode + ", aptName=" + aptName + ", reg_time="
                + reg_time + "]";
    }

}
