package com.ssafy.vue.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.vue.model.FavoriteDto;

@Mapper
public interface FavoriteMapper {
    public int writeFavorite(FavoriteDto favoriteDto) throws Exception;

    public List<FavoriteDto> listFavorite() throws Exception;

    public int deleteFavorite(FavoriteDto favoriteDto) throws Exception;
    
}
