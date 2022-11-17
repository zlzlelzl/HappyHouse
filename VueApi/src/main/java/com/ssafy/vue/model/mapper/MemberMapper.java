package com.ssafy.vue.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.vue.model.MemberDto;

@Mapper
public interface MemberMapper {

	public MemberDto login(MemberDto memberDto) throws SQLException;

	public MemberDto userInfo(String userid) throws SQLException;

	public void saveRefreshToken(Map<String, String> map) throws SQLException;

	public Object getRefreshToken(String userid) throws SQLException;

	public void deleteRefreshToken(Map<String, String> map) throws SQLException;

	List<MemberDto> listMember(Map<String, Object> map) throws SQLException;

	MemberDto getMember(String userId) throws SQLException;

	void updateMember(MemberDto memberDto) throws SQLException;

	void deleteMember(String userId) throws SQLException;

	void joinMember(MemberDto memberDto) throws SQLException;

}
