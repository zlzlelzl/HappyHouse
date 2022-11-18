package com.ssafy.vue.model;

public class HouseDealDto {
    private String no;
    private String aptCode;
    private String dealAmount;
    private String dealYear;
    private String dealMonth;
    private String dealDay;
    private String area;
    private String floor;

    private String aptName;
    private String dongCode;
    private String dongName;
    private String roadName;
    private String roadNamebonbun;

    public HouseDealDto() {
        super();
        // TODO Auto-generated constructor stub
    }

    public HouseDealDto(String no, String aptCode, String dealAmount, String dealYear, String dealMonth, String dealDay,
            String area, String floor, String aptName, String dongCode, String dongName, String roadName,
            String roadNamebonbun) {
        super();
        this.no = no;
        this.aptCode = aptCode;
        this.dealAmount = dealAmount;
        this.dealYear = dealYear;
        this.dealMonth = dealMonth;
        this.dealDay = dealDay;
        this.area = area;
        this.floor = floor;
        this.aptName = aptName;
        this.dongCode = dongCode;
        this.dongName = dongName;
        this.roadName = roadName;
        this.roadNamebonbun = roadNamebonbun;
    }

    public String getNo() {
        return no;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public String getAptCode() {
        return aptCode;
    }

    public void setAptCode(String aptCode) {
        this.aptCode = aptCode;
    }

    public String getDealAmount() {
        return dealAmount;
    }

    public void setDealAmount(String dealAmount) {
        this.dealAmount = dealAmount;
    }

    public String getDealYear() {
        return dealYear;
    }

    public void setDealYear(String dealYear) {
        this.dealYear = dealYear;
    }

    public String getDealMonth() {
        return dealMonth;
    }

    public void setDealMonth(String dealMonth) {
        this.dealMonth = dealMonth;
    }

    public String getDealDay() {
        return dealDay;
    }

    public void setDealDay(String dealDay) {
        this.dealDay = dealDay;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getAptName() {
        return aptName;
    }

    public void setAptName(String aptName) {
        this.aptName = aptName;
    }

    public String getDongCode() {
        return dongCode;
    }

    public void setDongCode(String dongCode) {
        this.dongCode = dongCode;
    }

    public String getDongName() {
        return dongName;
    }

    public void setDongName(String dongName) {
        this.dongName = dongName;
    }

    public String getRoadName() {
        return roadName;
    }

    public void setRoadName(String roadName) {
        this.roadName = roadName;
    }

    public String getRoadNamebonbun() {
        return roadNamebonbun;
    }

    public void setRoadNamebonbun(String roadNamebonbun) {
        this.roadNamebonbun = roadNamebonbun;
    }

    @Override
    public String toString() {
        return "HouseDealDto [no=" + no + ", aptCode=" + aptCode + ", dealAmount=" + dealAmount + ", dealYear="
                + dealYear + ", dealMonth=" + dealMonth + ", dealDay=" + dealDay + ", area=" + area + ", floor=" + floor
                + ", aptName=" + aptName + ", dongCode=" + dongCode + ", dongName=" + dongName + ", roadName="
                + roadName + ", roadNamebonbun=" + roadNamebonbun + "]";
    }
}
