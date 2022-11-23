package com.ssafy.vue.model.service;

import java.util.List;

import com.ssafy.vue.model.FavoriteDto;

public interface FavoriteService {
    public boolean writeFavorite(FavoriteDto favoriteDto) throws Exception;

    public List<FavoriteDto> listFavorite() throws Exception;

    public boolean deleteFavorite(FavoriteDto favoriteDto) throws Exception;
}
