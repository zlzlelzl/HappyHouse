package com.ssafy.vue.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.vue.model.HouseDealDto;
import com.ssafy.vue.model.HouseInfoDto;
import com.ssafy.vue.model.SearchResponseDto;
import com.ssafy.vue.model.SidoGugunCodeDto;
import com.ssafy.vue.model.mapper.HouseMapMapper;

@Service
public class HouseMapServiceImpl implements HouseMapService {

	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<SidoGugunCodeDto> getSido() throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getSido();
	}

	@Override
	public List<SidoGugunCodeDto> getGugunInSido(String sido) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getGugunInSido(sido);
	}

	@Override
	public List<HouseInfoDto> getDongInGugun(String gugun) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getDongInGugun(gugun);
	}

	@Override
	public List<HouseInfoDto> getAptInDong(String dong) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getAptInDong(dong);
	}

	@Override
	public List<HouseDealDto> getAptDeal(String aptCode) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getAptDeal(aptCode);
	}

	@Override
	public List<SearchResponseDto> getSearchList(String inputMsg) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getSearchList(inputMsg);
	}

	@Override
	public List<HouseInfoDto> getAptInGugun(String gugun) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getAptInGugun(gugun);
	}

	@Override
	public List<HouseInfoDto> getAptInSido(String sido) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getAptInSido(sido);
	}

	@Override
	public List<HouseInfoDto> getAptByName(String name) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getAptByName(name);
	}

	@Override
	public String getDongByName(String name) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getDongByName(name);
	}

	@Override
	public String getGugunByName(String name) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getGugunByName(name);
	}

	@Override
	public String getSidoByName(String name) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getSidoByName(name);
	}

	@Override
	public HouseInfoDto getAptByAptCode(String aptCode) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getAptByAptCode(aptCode);
	}

}
