package com.ssafy.vue.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "SearchResponseDto : 검색 자동완성 정보", description = "검색 자동완성 파라미터정보.")
public class SearchResponseDto {

    @ApiModelProperty(value = "검색 문자열")
    private String name;
    @ApiModelProperty(value = "시, 구군, 도, 아파트이름")
    private String type;
    @ApiModelProperty(value = "지도의 줌 레벨")
    private int maxlevel;
    @ApiModelProperty(value = "검색어로 찾기")
    private String query;

    public SearchResponseDto() {
    }

    public SearchResponseDto(String name, String type, int maxlevel, String query) {
        this.name = name;
        this.type = type;
        this.maxlevel = maxlevel;
        this.query = query;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getMaxlevel() {
        return maxlevel;
    }

    public void setMaxlevel(int maxlevel) {
        this.maxlevel = maxlevel;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    @Override
    public String toString() {
        return "SearchResponseDto [name=" + name + ", type=" + type + ", maxlevel=" + maxlevel + ", query=" + query
                + "]";
    }

}
