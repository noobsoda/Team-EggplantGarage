package com.ssafy.api.service;

import com.ssafy.api.request.LiveRegisterPostReq;
import com.ssafy.api.response.LiveDetailGetRes;
import com.ssafy.api.response.UserEntryRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.CategoryRepository;
import com.ssafy.db.repository.LiveRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service("liveService")
public class LiveServiceImpl implements LiveService {

    private final LiveRepository liveRepository;
    private final CategoryRepository categoryRepository;

    private final UserRepository userRepository;

    @Autowired
    public LiveServiceImpl(LiveRepository liveRepository, CategoryRepository categoryRepository, UserRepository userRepository){
        this.liveRepository = liveRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }
    @Override
    public Live CreateLive(LiveRegisterPostReq liveRegisterInfo, User user, String thumbnailUrl) {
        Live live = new Live();
        live.setSession_id(liveRegisterInfo.getSession_id());
        live.setTitle(liveRegisterInfo.getTitle());
        live.setDescription(liveRegisterInfo.getDescription());
        live.setUrl(liveRegisterInfo.getUrl());
        live.setLive(liveRegisterInfo.isLive());
        live.setLocation(liveRegisterInfo.getLocation());
        live.setThumbnailUrl(thumbnailUrl);
        live.setUser(user);


        return liveRepository.save(live);
    }

    //url 중복 체크할 메서드
    public boolean getLiveCheckUrlByUrl(String url) {
        // 디비에 방송 url 정보 조회
        Optional<Live> oLive = liveRepository.findByUrl(url);
        if(!oLive.isPresent())
            return false;
        return true;
    }

    //방 상세보기 가져올 메서드
    @Override
    public LiveDetailGetRes getLiveDetailByUrl(String url) {
        // 디비에 방송 url 정보 조회
        Optional<Live> oLive = liveRepository.findByUrl(url);
        if(!oLive.isPresent())
            return null;
        Live live = oLive.get();

        //라이브 카테고리 헬퍼 테이블 순회
        List<LiveCategory> liveCategories = live.getLiveCategoryList();
        List<Category> categoryList = new ArrayList<>();

        for(Iterator<LiveCategory> it = liveCategories.iterator(); it.hasNext();){
            LiveCategory liveCategory = it.next();
            //카테고리 아이디와 연관된 카테고리 테이블 조회

            categoryList.add(Category.builder()
                            .id(liveCategory.getCategory().getId())
                            .name(liveCategory.getCategory().getName())
                            .build());
        }
        //라이브 카테고리 조회 끝

        //Live와 연관된 유저 조회
        User user = live.getUser();


        List<UserLive> userLiveList = live.getUserLiveList();
        List<UserEntryRes> userEntryList = new ArrayList<>();

        for(Iterator<UserLive> it = userLiveList.iterator(); it.hasNext();) {
            UserLive userLive = it.next();
            //유저 아이디와 연관된 유저 테이블 조회

            UserEntryRes userEntryRes = UserEntryRes.builder()
                    .id(userLive.getUser().getId())
                    .nickname(userLive.getUser().getNickname())
                    .build();

            userEntryList.add(userEntryRes);
        }

        
        //불러온 값 넣어주기
        LiveDetailGetRes liveDetailGetRes = LiveDetailGetRes.builder()
                .id(live.getId())
                .categories(categoryList)
                .seller_id(user.getId())
                .seller_nickname(user.getNickname())
                .createAt(live.getCreatedAt())
                .thumbnailUrl(live.getThumbnailUrl())
                .title(live.getTitle())
                .description(live.getDescription())
                .isLive(live.isLive())
                .userEntryResList(userEntryList)
                .build();



        return liveDetailGetRes;

    }
}
