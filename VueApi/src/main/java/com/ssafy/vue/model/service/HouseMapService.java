package com.ssafy.vue.model.service;

import java.util.List;

import com.ssafy.vue.model.FavoriteDto;
import com.ssafy.vue.model.HouseDealDto;
import com.ssafy.vue.model.HouseInfoDto;
import com.ssafy.vue.model.SearchResponseDto;
import com.ssafy.vue.model.SidoGugunCodeDto;

public interface HouseMapService {

	List<SidoGugunCodeDto> getSido() throws Exception;

	List<SidoGugunCodeDto> getGugunInSido(String sido) throws Exception;

	List<HouseInfoDto> getDongInGugun(String gugun) throws Exception;

	List<HouseInfoDto> getAptInDong(String dong) throws Exception;

	List<HouseDealDto> getAptDeal(String aptCode) throws Exception;

	List<SearchResponseDto> getSearchList(String inputMsg) throws Exception;

	List<HouseInfoDto> getAptInGugun(String gugun) throws Exception;

	List<HouseInfoDto> getAptInSido(String sido) throws Exception;

	List<HouseInfoDto> getAptByName(String name) throws Exception;

	String getDongByName(String name) throws Exception;

	String getGugunByName(String name) throws Exception;

	String getSidoByName(String name) throws Exception;

  HouseInfoDto getAptByAptCode(String aptCode) throws Exception;

  List<HouseInfoDto> getFavoriteApt(FavoriteDto favoriteDto) throws Exception;

  List<HouseInfoDto> listFavoriteT(FavoriteDto favoriteDto)throws Exception;;
}
