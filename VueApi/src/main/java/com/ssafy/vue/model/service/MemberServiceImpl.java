package com.ssafy.vue.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.vue.model.MemberDto;
import com.ssafy.vue.model.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {

//	@Autowired
//	private SqlSession sqlSession;

	private MemberMapper memberMapper;

	@Autowired
	private MemberServiceImpl(MemberMapper memberMapper) {
		this.memberMapper = memberMapper;
	}

	@Override
	public MemberDto login(MemberDto memberDto) throws Exception {
		if (memberDto.getUserid() == null || memberDto.getUserpwd() == null)
			return null;
		return memberMapper.login(memberDto);
//		return sqlSession.getMapper(MemberMapper.class).login(memberDto);
	}

	@Override
	public MemberDto userInfo(String userid) throws Exception {
//		return sqlSession.getMapper(MemberMapper.class).userInfo(userid);
		return memberMapper.userInfo(userid);
	}

	@Override
	public void saveRefreshToken(String userid, String refreshToken) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put("token", refreshToken);
//		sqlSession.getMapper(MemberMapper.class).saveRefreshToken(map);
		memberMapper.saveRefreshToken(map);
	}

	@Override
	public Object getRefreshToken(String userid) throws Exception {
//		return sqlSession.getMapper(MemberMapper.class).getRefreshToken(userid);
		return memberMapper.getRefreshToken(userid);
	}

	@Override
	public void deleRefreshToken(String userid) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put("token", null);
//		sqlSession.getMapper(MemberMapper.class).deleteRefreshToken(map);
		memberMapper.deleteRefreshToken(map);
	}

	@Override
	public List<MemberDto> listMember(Map<String, Object> map) throws Exception {
		return memberMapper.listMember(map);
	}

	@Override
	public MemberDto getMember(String userId) throws Exception {
		return memberMapper.getMember(userId);
	}

	@Override
	public void updateMember(MemberDto memberDto) throws Exception {
		memberMapper.updateMember(memberDto);
	}

	@Override
	public void deleteMember(String userId) throws Exception {
		memberMapper.deleteMember(userId);
	}

	@Override
	public void joinMember(MemberDto memberDto) throws Exception {
//		sqlSession.getMapper(MemberMapper.class).joinMember(memberDto);
		memberMapper.joinMember(memberDto);
	}
}
