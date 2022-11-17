package com.ssafy.vue.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.vue.model.MemberDto;

public interface MemberService {

	public MemberDto login(MemberDto memberDto) throws Exception;

	public MemberDto userInfo(String userid) throws Exception;

	public void saveRefreshToken(String userid, String refreshToken) throws Exception;

	public Object getRefreshToken(String userid) throws Exception;

	public void deleRefreshToken(String userid) throws Exception;

	List<MemberDto> listMember(Map<String, Object> map) throws Exception;

	MemberDto getMember(String userId) throws Exception;

	void updateMember(MemberDto memberDto) throws Exception;

	void deleteMember(String userid) throws Exception;

	void joinMember(MemberDto memberDto) throws Exception;

}
