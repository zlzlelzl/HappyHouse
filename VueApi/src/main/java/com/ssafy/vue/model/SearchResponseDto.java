package com.ssafy.vue.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "SearchResponseDto : 검색 자동완성 정보", description = "검색 자동완성 파라미터정보.")
public class SearchResponseDto {

	@ApiModelProperty(value = "검색 문자열")
	private String name;
	@ApiModelProperty(value = "(0 = 시) (1 = 구군) (2 = 도) (3 = 아파트이름)")
	private int type;
	@ApiModelProperty(value = "지도의 줌 레벨")
	private int maxlevel;
	
	public SearchResponseDto() {
		super();
	}

	public SearchResponseDto(String name, int type, int maxlevel) {
		super();
		this.name = name;
		this.type = type;
		this.maxlevel = maxlevel;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getMaxlevel() {
		return maxlevel;
	}
	public void setMaxlevel(int maxlevel) {
		this.maxlevel = maxlevel;
	}
	

}

