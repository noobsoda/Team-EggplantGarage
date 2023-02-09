package com.ssafy.api.service;

import com.ssafy.api.request.FavoritePostReq;
import com.ssafy.api.response.FavoriteGetInfo;
import com.ssafy.api.response.LiveContent;
import com.ssafy.db.entity.Favorite;
import com.ssafy.db.entity.Live;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.FavoriteRepository;
import com.ssafy.db.repository.LiveRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("favoriteService")
public class FavoriteServiceImpl implements FavoriteService{
    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final LiveRepository liveRepository;

    @Autowired
    public FavoriteServiceImpl(FavoriteRepository favoriteRepository, UserRepository userRepository, LiveRepository liveRepository){
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.liveRepository = liveRepository;
    }
    @Override
    public boolean postFavorite(FavoritePostReq favoritePostInfo) {
        Optional<User> oUser = userRepository.findById(favoritePostInfo.getUserId());
        User user = oUser.orElse(null);

        Optional<Live> oLive = liveRepository.findById(favoritePostInfo.getLiveId());
        Live live = oLive.orElse(null);

        if(user == null || live == null){
            return false;
        }

        Favorite favorite = Favorite.builder()
                .user(user)
                .live(live)
                .build();
        favoriteRepository.save(favorite);

        return true;
    }

    @Override
    public List<FavoriteGetInfo> getFavoriteLiveByUserId(Long userId) {
        Optional<List<Favorite>> oFavoriteList = favoriteRepository.findByUser_id(userId);
        List<Favorite> favoriteList = oFavoriteList.orElse(null);
        if(favoriteList == null)
            return null;

        List<FavoriteGetInfo> favoriteGetInfoList = new ArrayList<>();
        for(Favorite favorite : favoriteList) {
            FavoriteGetInfo favoriteGetInfo = FavoriteGetInfo.builder()
                    .liveId(favorite.getLive().getId())
                    .userId(favorite.getUser().getId())
                    .build();


            favoriteGetInfoList.add(favoriteGetInfo);
        }

        return favoriteGetInfoList;
    }

    @Override
    public List<LiveContent> getFavoriteLive(List<LiveContent> liveContentList, List<FavoriteGetInfo> favoriteGetInfoList) {
        List<LiveContent> liveContentRes = new ArrayList<>();
        for(LiveContent liveContent : liveContentList){
            for(FavoriteGetInfo favoriteGetInfo : favoriteGetInfoList){
                //라이브 콘텐츠의 라이브 아이디와 유저가 찜한 라이브 아이디가 겹치면 add
                if(liveContent.getId() == favoriteGetInfo.getLiveId()){
                    liveContentRes.add(liveContent);
                    break;
                }


            }
        }
        return liveContentRes;
    }

    @Override
    public boolean deleteFavorite(Long userId, Long liveId) {
        Optional<User> oUser = userRepository.findById(userId);
        User user = oUser.orElse(null);

        Optional<Live> oLive = liveRepository.findById(liveId);
        Live live = oLive.orElse(null);

        Optional<List<Favorite>> oFavoriteList = favoriteRepository.findByUser_idAndLive_id(userId, liveId);
        List<Favorite> favoriteList = oFavoriteList.orElse(null);

        if(user == null || live == null || favoriteList.size() == 0){
            return false;
        }


        favoriteRepository.deleteAll(favoriteList);
        return true;
    }

    @Override
    public boolean postFavoriteIsFavorite(Long userId, Long liveId) {
        Optional<List<Favorite>> oFavoriteList = favoriteRepository.findByUser_idAndLive_id(userId, liveId);
        List<Favorite> favoriteList = oFavoriteList.orElse(null);
        if(favoriteList == null || favoriteList.size() == 0)
            return false;

        return true;
    }
}
