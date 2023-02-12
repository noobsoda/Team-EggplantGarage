package com.ssafy.api.service;

import com.ssafy.api.request.FavoritePostReq;
import com.ssafy.api.response.FavoriteGetInfo;
import com.ssafy.api.response.LiveContent;

import java.util.List;

public interface FavoriteService {
    boolean postFavorite(FavoritePostReq favoritePostinfo);

    List<FavoriteGetInfo> getFavoriteLiveByUserId(Long userId);

    List<LiveContent> getFavoriteLive(List<LiveContent> liveContentList, List<FavoriteGetInfo> favoriteGetInfo);

    boolean deleteFavorite(Long userId, Long liveId);

    boolean postFavoriteIsFavorite(Long userId, Long liveId);
}
