package com.ssafy.vue.model.service;

import java.util.List;

import com.ssafy.util.PageNavigation;
import com.ssafy.vue.model.QnaDto;
import com.ssafy.vue.model.BoardParameterDto;

public interface QnaService {
	public boolean writeArticle(QnaDto qnaDto) throws Exception;
	public List<QnaDto> listArticle(BoardParameterDto boardParameterDto) throws Exception;
	public PageNavigation makePageNavigation(BoardParameterDto boardParameterDto) throws Exception;
	
	public QnaDto getArticle(int articleno) throws Exception;
	public void updateHit(int articleno) throws Exception;
	public boolean modifyArticle(QnaDto qnaDto) throws Exception;
	public boolean deleteArticle(int articleno) throws Exception;
	public Integer getTotalCount(BoardParameterDto boardParameterDto) throws Exception;
}
