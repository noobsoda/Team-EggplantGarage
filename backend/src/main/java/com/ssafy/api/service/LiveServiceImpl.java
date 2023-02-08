package com.ssafy.api.service;

import com.ssafy.api.request.*;
import com.ssafy.api.response.*;
import com.ssafy.common.util.DistanceModule;
import com.ssafy.common.util.LocationDistance;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.checkerframework.checker.nullness.Opt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("liveService")
public class LiveServiceImpl implements LiveService {

    private final LiveRepository liveRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final LiveCategoryRepository liveCategoryRepository;
    private final UserLiveRepository userLiveRepository;
    private final ProductRepository productRepository;
    private final FavoriteRepository favoriteRepository;

    @Autowired
    public LiveServiceImpl(LiveRepository liveRepository, CategoryRepository categoryRepository, UserRepository userRepository, LiveCategoryRepository liveCategoryRepository, UserLiveRepository userLiveRepository
            , ProductRepository productRepository, FavoriteRepository favoriteRepository) {
        this.liveRepository = liveRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.liveCategoryRepository = liveCategoryRepository;
        this.userLiveRepository = userLiveRepository;
        this.productRepository = productRepository;
        this.favoriteRepository = favoriteRepository;
    }

    @Override
    public Live CreateLive(LiveRegisterPostReq liveRegisterInfo, User user) {
        Double stableLat = 36.354963;
        Double stableLon = 127.297375;
        if (liveRegisterInfo.getLatitude() != null) {
            stableLat = liveRegisterInfo.getLatitude();
        }
        if (liveRegisterInfo.getLongitude() != null) {
            stableLon = liveRegisterInfo.getLongitude();
        }

        Live live = Live.builder()
                .sessionId(liveRegisterInfo.getSessionId())
                .title(liveRegisterInfo.getTitle())
                .description(liveRegisterInfo.getDescription())
                .url(liveRegisterInfo.getUrl())
                .isLive(liveRegisterInfo.isLive())
                .latitude(stableLat)
                .longitude(stableLon)
                .user(user)
                .build();

        //유저라이브 헬퍼 테이블에 본인도 넣어주기
        UserLive userLive = UserLive.builder()
                .live(live)
                .user(user)
                .build();
        userLiveRepository.save(userLive);

        liveRepository.save(live);

        return live;
    }

    //url 중복 체크할 메서드
    public boolean getLiveCheckSessionIdBySessionId(String sessionId) {
        // 디비에 방송 url 정보 조회
        Optional<Live> oLive = liveRepository.findBySessionId(sessionId);
        if (!oLive.isPresent())
            return false;
        return true;
    }

    @Override
    public boolean postLiveByThumbnailUrl(String sessionId, String thumbnailUrl) {

        Optional<List<Live>> oLiveList = liveRepository.findAllBySessionId(sessionId);
        List<Live> liveList = oLiveList.orElse(null);

        if (liveList == null || liveList.size() == 0) return false;

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
    public boolean postLiveByCategories(LiveCategoriesReq liveCategoriesReq) {
        Optional<List<Live>> oLiveList = liveRepository.findAllBySessionId(liveCategoriesReq.getSessionId());
        List<Live> liveList = oLiveList.orElse(null);

        if (liveList == null || liveList.size() == 0) return false;

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
    public List<LiveContent> getLiveListByTitle(String title) {
        Optional<List<Live>> oliveList = liveRepository.findAllByTitleContains(title);
        List<Live> liveList = oliveList.orElse(null);

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

        return Content;
    }

    @Override
    public boolean postUserLiveByLiveId(LiveUserJoinReq liveUserJoinReq) {
        //라이브 아이디 조회
        Optional<Live> oLive = liveRepository.findById(liveUserJoinReq.getLiveId());
        Live live = oLive.orElse(null);

        Optional<User> oUser = userRepository.findById(liveUserJoinReq.getUserId());
        User user = oUser.orElse(null);

        if (user == null || live == null)
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
        if (userLiveList.isEmpty())
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
        if (live == null)
            return false;
        live.setLive(false);

        //라이브에 찜한 유저의 찜 테이블에서 전부 삭제
        Optional<List<Favorite>> oFavoriteList = favoriteRepository.findByLive_id(liveId);
        List<Favorite> favoriteList = oFavoriteList.orElse(null);
        favoriteRepository.deleteAll(favoriteList);
        //라이브에 참가한 유저, 유저라이브 테이블에서 전부 삭제
        //라이브 아디와 유저 아디가 판매자 본인과 만났을 경우 라이브 유저 전부 삭제해서 주석처리
        /*List<UserLive> userLiveList = userLiveRepository.findAllByLive_id(liveId);
        userLiveRepository.deleteAll(userLiveList);*/


        liveRepository.save(live);
        return true;
    }

    @Override
    public List<LiveContent> searchCategoryLiveList(List<LiveContent> liveContentList, String category) {
        List<LiveContent> tempLiveContentList = new ArrayList<>();
        for (LiveContent liveContent : liveContentList) {
            for (Category tempCategory : liveContent.getCategories()) {
                if (tempCategory.getName().equals(category)) {
                    //해당 카테고리에 값과 맞다면
                    tempLiveContentList.add(liveContent);
                    break;
                }
            }

        }


        return tempLiveContentList;
    }

    @Override
    public List<DistanceModule> searchLocationLiveList(List<LiveContent> liveContentList, Location location, boolean isNational) {
        List<DistanceModule> distanceModuleList = new ArrayList<>();
        for (LiveContent liveContent : liveContentList) {
            // 라이브 아이디로 lat,lon 조회
            Optional<Live> oLive = liveRepository.findById(liveContent.getId());
            Live live = oLive.orElse(null);
            if (live == null)
                continue;
            ;
            // 킬로미터(Kilo Meter) 단위
            double distanceKiloMeter =
                    LocationDistance.distance(location.getLatitude(), location.getLongitude(),
                            live.getLatitude(), live.getLongitude(), "kilometer");

            //전국이면
            if (isNational) {
                distanceModuleList.add(new DistanceModule(distanceKiloMeter, liveContent));
            } else {//전국이 아니면 5km 이내
                if (distanceKiloMeter <= 5) {
                    distanceModuleList.add(new DistanceModule(distanceKiloMeter, liveContent));
                }
            }

        }

        return distanceModuleList;
    }

    @Override
    public List<LiveContent> searchSortUserJoinLiveList(List<LiveContent> liveContentList, String userJoinSort) {
        //오름차순 정렬
        if(userJoinSort.equals("ASC")){
            Collections.sort(liveContentList, new Comparator<LiveContent>() {
                @Override
                public int compare(LiveContent o1, LiveContent o2) {
                    return o1.getJoinUsersNum() - o2.getJoinUsersNum();
                }
            });
            //내림차순 정렬
        }else if(userJoinSort.equals("DESC")){
            Collections.sort(liveContentList, new Comparator<LiveContent>() {
                @Override
                public int compare(LiveContent o1, LiveContent o2) {
                    return o2.getJoinUsersNum() - o1.getJoinUsersNum();
                }
            });

        }
        return liveContentList;
    }

    //방 상세보기 가져올 메서드
    @Override
    public LiveDetailGetRes getLiveDetailBySessionId(String sessionId) {
        // 디비에 방송 url 정보 조회
        Optional<Live> oLive = liveRepository.findBySessionId(sessionId);
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
        //라이브 아이디와 연관된 상품 테이블 조회
        Optional<List<Product>> oProduct = productRepository.findByLive_IdOrderByCreatedAtDesc(live.getId());
        List<Product> productList = oProduct.orElse(null);

        List<LiveProductInfo> liveProductInfoList = new ArrayList<>();
        for (Product product : productList) {

            LiveProductInfo liveProductInfo = LiveProductInfo.builder()
                    .id(product.getId())
                    .liveId(live.getId())
                    .sellerId(live.getUser().getId())
                    .name(product.getName())
                    .soldAt(product.getSoldAt())
                    .soldPrice(product.getSoldPrice())
                    .creatAt(product.getCreatedAt())
                    .isPaid(product.isPaid())
                    .initialPrice(product.getInitialPrice())
                    .leftTopX(product.getLeftTopX())
                    .leftTopY(product.getLeftTopY())
                    .rightBottomX(product.getRightBottomX())
                    .rightBottomY(product.getRightBottomY())
                    .imageUrl(product.getImageUrl())
                    .buyerId(product.getBuyerId())
                    .build();

            liveProductInfoList.add(liveProductInfo);
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
                .liveProductInfoList(liveProductInfoList)
                .build();


        return liveDetailGetRes;

    }
}
