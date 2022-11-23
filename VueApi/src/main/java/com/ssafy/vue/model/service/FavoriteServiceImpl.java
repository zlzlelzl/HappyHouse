package com.ssafy.vue.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.vue.model.FavoriteDto;
import com.ssafy.vue.model.mapper.FavoriteMapper;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public boolean writeFavorite(FavoriteDto favoriteDto) throws Exception {
        return sqlSession.getMapper(FavoriteMapper.class).writeFavorite(favoriteDto) == 1;
    }

    @Override
    public List<FavoriteDto> listFavorite() throws Exception {
        return sqlSession.getMapper(FavoriteMapper.class).listFavorite();
    }

    @Override
    public boolean deleteFavorite(FavoriteDto favoriteDto) throws Exception {
        return sqlSession.getMapper(FavoriteMapper.class).deleteFavorite(favoriteDto) == 1;
    }

}
