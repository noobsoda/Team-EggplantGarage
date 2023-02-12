package com.ssafy.api.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FavoriteIsFavoritePostRes {
    private boolean isFavorite;
    public static FavoriteIsFavoritePostRes of(boolean isFavorite){
        FavoriteIsFavoritePostRes favoriteIsFavoritePostRes = new FavoriteIsFavoritePostRes();
        favoriteIsFavoritePostRes.setFavorite(isFavorite);
        return favoriteIsFavoritePostRes;
    }
}
