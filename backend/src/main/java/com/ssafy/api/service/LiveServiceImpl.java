package com.ssafy.api.service;

import com.ssafy.api.request.LiveCategoriesReq;
import com.ssafy.api.request.LiveCategoryReq;
import com.ssafy.api.request.LiveUserJoinReq;
import com.ssafy.api.request.LiveRegisterPostReq;
import com.ssafy.api.response.LiveContent;
import com.ssafy.api.response.LiveDetailGetRes;
import com.ssafy.api.response.LiveListGetRes;
import com.ssafy.api.response.UserEntryRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
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
    private final LiveCategoryRepository liveCategoryRepository;
    private final UserLiveRepository userLiveRepository;

    @Autowired
    public LiveServiceImpl(LiveRepository liveRepository, CategoryRepository categoryRepository, UserRepository userRepository, LiveCategoryRepository liveCategoryRepository, UserLiveRepository userLiveRepository) {
        this.liveRepository = liveRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.liveCategoryRepository = liveCategoryRepository;
        this.userLiveRepository = userLiveRepository;
    }

    @Override
    public Live CreateLive(LiveRegisterPostReq liveRegisterInfo, User user) {
        Live live = Live.builder()
                .session_id(liveRegisterInfo.getSession_id())
                .title(liveRegisterInfo.getTitle())
                .description(liveRegisterInfo.getDescription())
                .url(liveRegisterInfo.getUrl())
                .isLive(liveRegisterInfo.isLive())
                .location(liveRegisterInfo.getLocation())
                .user(user)
                .build();


        return liveRepository.save(live);
    }

    //url 중복 체크할 메서드
    public boolean getLiveCheckUrlByUrl(String url) {
        // 디비에 방송 url 정보 조회
        Optional<Live> oLive = liveRepository.findByUrl(url);
        if (!oLive.isPresent())
            return false;
        return true;
    }

    @Override
    public boolean postLiveByThumbnailUrl(Long sellerId, String thumbnailUrl) {

        List<Live> liveList = liveRepository.findAllByUser_Id(sellerId);


        if (liveList == null) return false;

        for (Live live : liveList) {
            //현재 라이브를 하고 있을 때만 썸네일 바꾸기
            if (live.isLive()) {
                live.setThumbnailUrl(thumbnailUrl);
                liveRepository.save(live);
            }
        }


        return true;
    }

    @Override
    public boolean postLiveByCategories(Long sellerId, LiveCategoriesReq liveCategoriesReq) {
        List<Live> liveList = liveRepository.findAllByUser_Id(sellerId);

        if (liveList == null) return false;

        for (Live live : liveList) {

            //현재 라이브를 하고 있을 때만 카테고리 넣어주기
            if (live.isLive()) {
                live.getLiveCategoryList();
                List<LiveCategory> liveCategoryList = new ArrayList<>();

                for (LiveCategoryReq liveCategoryReq : liveCategoriesReq.getLiveCategoryReqList()) {
                    Optional<Category> oCategory = categoryRepository.findByName(liveCategoryReq.getCategoryName());
                    Category category = oCategory.orElse(null);

                    liveCategoryList.add(LiveCategory.builder()
                            .category(category)
                            .live(live)
                            .build());

                }
                liveCategoryRepository.saveAll(liveCategoryList);


                liveRepository.save(live);
            }
        }
        return true;
    }

    @Override
    public LiveListGetRes getLiveList() {
        List<Live> liveList = liveRepository.findAll();

        if (liveList == null)
            return null;

        LiveListGetRes liveListGetRes = new LiveListGetRes();
        List<LiveContent> Content = new ArrayList<>();
        for (Live live : liveList) {
            //라이브 카테고리 헬퍼 테이블 순회
            List<LiveCategory> liveCategories = live.getLiveCategoryList();
            List<Category> categoryList = new ArrayList<>();

            for (Iterator<LiveCategory> it = liveCategories.iterator(); it.hasNext(); ) {
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

            LiveContent liveContent = LiveContent.builder()
                    .id(live.getId())
                    .categories(categoryList)
                    .joinUsersNum(userLiveList.size())
                    .owner(live.getUser().getNickname())
                    .createAt(live.getCreatedAt())
                    .thumbnailUrl(live.getThumbnailUrl())
                    .title(live.getTitle())
                    .description(live.getDescription())
                    .isActive(live.isLive())
                    .build();

            Content.add(liveContent);
        }
        liveListGetRes.setLiveContentList(Content);

        return liveListGetRes;
    }

    @Override
    public boolean postUserLiveByLiveId(LiveUserJoinReq liveUserJoinReq) {
        //라이브 아이디 조회
        Optional<Live> oLive = liveRepository.findById(liveUserJoinReq.getLiveId());
        Live live = oLive.orElse(null);

        Optional<User> oUser = userRepository.findById(liveUserJoinReq.getUserId());
        User user = oUser.orElse(null);

        if(user == null || live == null)
            return false;

        UserLive userLive = UserLive.builder()
                .user(user)
                .live(live)
                .build();
        userLiveRepository.save(userLive);
        return true;
    }

    @Override
    public boolean deleteUserLiveByLiveId(LiveUserJoinReq liveUserJoinReq) {
        //라이브 아이디 조회
        List<UserLive> userLiveList = userLiveRepository.findAllByUser_idAndLive_id(liveUserJoinReq.getUserId(), liveUserJoinReq.getLiveId());
        if(userLiveList.isEmpty())
            return false;

        userLiveRepository.deleteAll(userLiveList);
        return true;
    }

    //라이브 상태 끝내기
    @Override
    public boolean patchLiveEndById(Long liveId) {
        //라이브 상태 false로 변경
        Optional<Live> oLive = liveRepository.findById(liveId);
        Live live = oLive.orElse(null);
        if(live == null)
            return false;
        live.setLive(false);
        
        //라이브에 참가한 유저, 유저라이브 테이블에서 전부 삭제
        List<UserLive> userLiveList = userLiveRepository.findAllByLive_id(liveId);
        userLiveRepository.deleteAll(userLiveList);

        liveRepository.save(live);
        return true;
    }

    //방 상세보기 가져올 메서드
    @Override
    public LiveDetailGetRes getLiveDetailByUrl(String url) {
        // 디비에 방송 url 정보 조회
        Optional<Live> oLive = liveRepository.findByUrl(url);
        if (!oLive.isPresent())
            return null;
        Live live = oLive.orElse(null);

        //라이브 카테고리 헬퍼 테이블 순회
        List<LiveCategory> liveCategories = live.getLiveCategoryList();
        List<Category> categoryList = new ArrayList<>();

        for (Iterator<LiveCategory> it = liveCategories.iterator(); it.hasNext(); ) {
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

        for (Iterator<UserLive> it = userLiveList.iterator(); it.hasNext(); ) {
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
