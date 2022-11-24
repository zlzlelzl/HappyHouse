package com.ssafy.vue.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.vue.model.FavoriteDto;
import com.ssafy.vue.model.HouseDealDto;
import com.ssafy.vue.model.HouseInfoDto;
import com.ssafy.vue.model.SearchResponseDto;
import com.ssafy.vue.model.SidoGugunCodeDto;

@Mapper
public interface HouseMapMapper {

	List<SidoGugunCodeDto> getSido() throws SQLException;

	List<SidoGugunCodeDto> getGugunInSido(String sido) throws SQLException;

	List<HouseInfoDto> getDongInGugun(String gugun) throws SQLException;

	List<HouseInfoDto> getAptInDong(String dong) throws SQLException;

	List<HouseDealDto> getAptDeal(String aptCode) throws SQLException;

	List<SearchResponseDto> getSearchList(String inputMsg) throws SQLException;

	List<HouseInfoDto> getAptInGugun(String gugun) throws SQLException;

	List<HouseInfoDto> getAptInSido(String sido) throws SQLException;

	List<HouseInfoDto> getAptByName(String name) throws SQLException;

	String getDongByName(String name) throws SQLException;

	String getGugunByName(String name) throws SQLException;

	String getSidoByName(String name) throws SQLException;
	
	HouseInfoDto getAptByAptCode(String aptCode) throws Exception ;

	List<HouseInfoDto> getFavoriteApt(FavoriteDto favoriteDto)throws Exception;
	
    List<HouseInfoDto> listFavoriteT(FavoriteDto favoriteDto) throws Exception;
}
