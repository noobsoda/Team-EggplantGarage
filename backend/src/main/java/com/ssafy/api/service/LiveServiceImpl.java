package com.ssafy.api.service;

import com.ssafy.api.request.*;
import com.ssafy.api.response.*;
import com.ssafy.common.exception.CustomException;
import com.ssafy.common.util.DistanceModule;
import com.ssafy.common.util.LocationDistance;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.ssafy.common.error.ErrorCode.*;

@Service("liveService")
@RequiredArgsConstructor
public class LiveServiceImpl implements LiveService {

    private final LiveRepository liveRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final LiveCategoryRepository liveCategoryRepository;
    private final UserLiveRepository userLiveRepository;
    private final ProductRepository productRepository;
    private final FavoriteRepository favoriteRepository;
    private static final int MAX_PAGE = 10;

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

        liveRepository.save(live);

        // 유저라이브 헬퍼 테이블에 본인도 넣어주기
        UserLive userLive = UserLive.builder()
                .live(live)
                .user(user)
                .build();
        userLiveRepository.save(userLive);

        liveRepository.save(live);

        return live;
    }

    /**
     * sessionId 중복을 체크하는 메서드
     */
    // url 중복 체크할 메서드
    public boolean getLiveCheckSessionIdBySessionId(String sessionId) {
        // 디비에 방송 url 정보 조회
        Optional<Live> oLive = liveRepository.findBySessionId(sessionId);
        Live live = oLive.orElseThrow(() -> new CustomException(LIVE_NOT_FOUND));

        return true;
    }

    /**
     * 라이브 아이디에 썸네일 이미지 주소를 넣어주는 메소드
     */

    @Override
    public boolean postLiveByThumbnailUrl(Long liveId, String thumbnailUrl) {

        Optional<Live> oLive = liveRepository.findById(liveId);
        Live live = oLive.orElseThrow(() -> new CustomException(LIVE_NOT_FOUND));

        if (!live.isLive())
            throw new CustomException(ALREADY_LIVE_END);

        live.setThumbnailUrl(thumbnailUrl);
        liveRepository.save(live);

        return true;
    }

    @Override
    public boolean postLiveByCategories(LiveCategoriesReq liveCategoriesReq) {
        Optional<Live> oLive = liveRepository.findById(liveCategoriesReq.getLiveId());
        Live live = oLive.orElseThrow(() -> new CustomException(LIVE_NOT_FOUND));

        if (!live.isLive()) {
            throw new CustomException(ALREADY_LIVE_END);
        }

        // 현재 라이브를 하고 있을 때만 카테고리 넣어주기
        else {
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

        return true;
    }

    @Override
    public List<LiveContent> getLiveListByTitle(String title) {
        List<Live> liveList = liveRepository.findAllByTitleContains(title);

        if (liveList == null || liveList.isEmpty())
            throw new CustomException(LIVE_NOT_FOUND);

        List<LiveContent> Content = new ArrayList<>();
        for (Live live : liveList) {
            if (!live.isLive())
                continue;
            // 라이브 카테고리 헬퍼 테이블 순회
            List<LiveCategory> liveCategories = live.getLiveCategoryList();
            List<Category> categoryList = new ArrayList<>();

            for (LiveCategory liveCategory : liveCategories) {
                // 카테고리 아이디와 연관된 카테고리 테이블 조회

                if (liveCategory.getCategory() == null) {
                    throw new CustomException(CATEGORY_NOT_FOUND);
                }

                categoryList.add(Category.builder()
                        .id(liveCategory.getCategory().getId())
                        .name(liveCategory.getCategory().getName())
                        .build());
            }
            // 라이브 카테고리 조회 끝

            // Live 와 연관된 유저 조회

            List<UserLive> userLiveList = userLiveRepository.findAllByLive_id(live.getId());

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

    /**
     * 유저 라이브 참가 API
     */
    @Override
    public boolean postUserLiveByLiveId(LiveUserJoinReq liveUserJoinReq) {
        if (liveUserJoinReq.getUserId() == null || liveUserJoinReq.getLiveId() == null)
            throw new CustomException(INVALID_PARAMETER);
        // 유저 라이브 참가
        Optional<Live> oLive = liveRepository.findById(liveUserJoinReq.getLiveId());
        Live live = oLive
                .orElseThrow(() -> new CustomException(LIVE_NOT_FOUND));

        Optional<User> oUser = userRepository.findById(liveUserJoinReq.getUserId());
        User user = oUser
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        List<UserLive> userLiveList = userLiveRepository.findAllByUser_idAndLive_id(liveUserJoinReq.getUserId(),
                liveUserJoinReq.getLiveId());

        // 유저 라이브 중복이 있다면
        if (!userLiveList.isEmpty())
            throw new CustomException(ALREADY_SAVED_USER);

        // 이미 죽어있는 방송이면 들어가면 안됨
        if (!live.isLive()) {
            throw new CustomException(ALREADY_LIVE_END);
        }

        UserLive userLive = UserLive.builder()
                .user(user)
                .live(live)
                .build();
        userLiveRepository.save(userLive);

        return true;

    }

    /**
     * 유저 라이브 테이블에서 유저를 삭제한다.
     */
    @Override
    public boolean deleteUserLiveByLiveId(LiveUserJoinReq liveUserJoinReq) {
        // 라이브 아이디 조회
        List<UserLive> userLiveList = userLiveRepository.findAllByUser_idAndLive_id(liveUserJoinReq.getUserId(),
                liveUserJoinReq.getLiveId());

        if (userLiveList == null || userLiveList.isEmpty())
            throw new CustomException(USER_LIVE_NOT_FOUND);

        userLiveRepository.deleteAll(userLiveList);
        return true;
    }

    /**
     * 라이브 끝내기 API
     * 라이브를 찜한 유저 테이블 데이터 삭제
     * 라이브에 참가한 유저 테이블 데이터 삭제
     */

    @Override
    public boolean patchLiveEndById(Long liveId) {
        // 라이브 상태 false 로 변경
        Optional<Live> oLive = liveRepository.findById(liveId);
        Live live = oLive.orElseThrow(() -> new CustomException(LIVE_NOT_FOUND));

        if (!live.isLive())
            throw new CustomException(ALREADY_LIVE_END);
        live.setLive(false);

        // 라이브에 찜한 유저의 찜 테이블에서 전부 삭제
        List<Favorite> favoriteList = favoriteRepository.findByLive_id(liveId);
        favoriteRepository.deleteAll(favoriteList);
        // 라이브에 참가한 유저, 유저라이브 테이블에서 전부 삭제
        // 라이브 아디와 유저 아디가 판매자 본인과 만났을 경우 라이브 유저 전부 삭제해서 주석처리
        List<UserLive> userLiveList = userLiveRepository.findAllByLive_id(liveId);
        userLiveRepository.deleteAll(userLiveList);

        liveRepository.save(live);
        return true;
    }

    /**
     * @param liveContentList 타이틀을 검색한 라이브 리스트
     * @param category        필터링할 카테고리
     * @return 카테고리로 필터링된 값
     */
    @Override
    public List<LiveContent> searchCategoryLiveList(List<LiveContent> liveContentList, String category) {
        List<LiveContent> tempLiveContentList = new ArrayList<>();
        for (LiveContent liveContent : liveContentList) {
            for (Category tempCategory : liveContent.getCategories()) {
                if (tempCategory.getName().equals(category)) {
                    // 해당 카테고리에 값과 맞다면
                    tempLiveContentList.add(liveContent);
                    break;
                }
            }

        }

        return tempLiveContentList;
    }

    /**
     * @param liveContentList 제목, 카테고리 등으로 필터링된 값
     * @param location        현재 구매자의 위치
     * @param isNational      true 면 전국, false 면 지역 5km 이내
     * @return 필터링되고 정렬된 값
     */
    @Override
    public List<DistanceModule> searchLocationLiveList(List<LiveContent> liveContentList, Location location,
            boolean isNational) {
        List<DistanceModule> distanceModuleList = new ArrayList<>();
        for (LiveContent liveContent : liveContentList) {
            // 라이브 아이디로 lat,lon 조회
            Optional<Live> oLive = liveRepository.findById(liveContent.getId());
            Live live = oLive.orElse(null);
            if (live == null)
                continue;

            if (location.getLatitude() == null || location.getLongitude() == null)
                throw new CustomException(INVALID_PARAMETER);
            // 킬로미터(Kilo Meter) 단위
            double distanceKiloMeter = LocationDistance.distance(location.getLatitude(), location.getLongitude(),
                    live.getLatitude(), live.getLongitude(), "kilometer");

            // 전국이면
            if (isNational) {
                distanceModuleList.add(new DistanceModule(distanceKiloMeter, liveContent));
            } else {// 전국이 아니면 5km 이내
                if (distanceKiloMeter <= 5) {
                    distanceModuleList.add(new DistanceModule(distanceKiloMeter, liveContent));
                }
            }

        }

        return distanceModuleList;
    }

    /**
     * @param liveContentList 필터링(제목, 카테고리 등등)된 값
     * @param userJoinSort    유저수로 정렬할 값 ASC, DESC
     * @return 정렬된 값
     */
    @Override
    public List<LiveContent> searchSortUserJoinLiveList(List<LiveContent> liveContentList, String userJoinSort) {
        // 오름차순 정렬
        if (userJoinSort.equals("ASC")) {
            liveContentList.sort((o1, o2) -> o1.getJoinUsersNum() - o2.getJoinUsersNum());
            // 내림차순 정렬
        } else if (userJoinSort.equals("DESC")) {
            liveContentList.sort((o1, o2) -> o2.getJoinUsersNum() - o1.getJoinUsersNum());

        }
        return liveContentList;
    }

    /**
     * @param liveContentListInfo 필터링된 최종 값
     * @param page                페이지 적용해서 10페이지씩 가져온다.
     * @return 페이징으로 뽑아낸 값
     */

    @Override
    public List<LiveContent> setPageaLiveList(List<LiveContent> liveContentListInfo, int page) {
        List<LiveContent> liveContentList = new ArrayList<>();
        int size = liveContentListInfo.size();

        if (size <= page * MAX_PAGE && size <= (page - 1) * MAX_PAGE) {
            return null;
        } else if (size > (page - 1) * MAX_PAGE && size < page * MAX_PAGE) {
            for (int i = ((page - 1) * MAX_PAGE); i < liveContentListInfo.size(); i++) {
                liveContentList.add(liveContentListInfo.get(i));
            }
        } else {
            for (int i = ((page - 1) * MAX_PAGE); i < (page) * MAX_PAGE; i++) {
                liveContentList.add(liveContentListInfo.get(i));
            }
        }
        return liveContentList;
    }

    /**
     * @param liveId 조회할 라이브 아이디
     * @return 라이브 상세보기 값
     */
    // 방 상세보기 가져올 메서드
    @Override
    public LiveDetailGetRes getLiveDetailBySessionId(Long liveId) {
        // 디비에 방송 url 정보 조회
        Optional<Live> oLive = liveRepository.findById(liveId);
        Live live = oLive.orElseThrow(() -> new CustomException(LIVE_NOT_FOUND));

        if (live == null)
            return null;

        // 라이브 카테고리 헬퍼 테이블 순회
        List<LiveCategory> liveCategories = live.getLiveCategoryList();
        List<Category> categoryList = new ArrayList<>();

        for (LiveCategory liveCategory : liveCategories) {
            // 카테고리 아이디와 연관된 카테고리 테이블 조회
            if (liveCategory.getCategory() == null)
                continue;
            categoryList.add(Category.builder()
                    .id(liveCategory.getCategory().getId())
                    .name(liveCategory.getCategory().getName())
                    .build());
        }
        // 라이브 카테고리 조회 끝

        // Live 와 연관된 유저 조회
        User user = live.getUser();

        List<UserLive> userLiveList = userLiveRepository.findAllByLive_id(live.getId());
        List<UserEntryRes> userEntryList = new ArrayList<>();

        for (UserLive userLive : userLiveList) {
            // 유저 아이디와 연관된 유저 테이블 조회

            UserEntryRes userEntryRes = UserEntryRes.builder()
                    .id(userLive.getUser().getId())
                    .nickname(userLive.getUser().getNickname())
                    .build();

            userEntryList.add(userEntryRes);
        }
        // 라이브 아이디와 연관된 상품 테이블 조회
        Optional<List<Product>> oProduct = productRepository.findByLive_Id(live.getId());
        List<Product> productList = oProduct.orElse(null);

        List<LiveProductInfo> liveProductInfoList = new ArrayList<>();
        //productList 가 없을수도 있으니
        assert productList != null;
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
                    .isApproval(product.isApproval())
                    .build();

            liveProductInfoList.add(liveProductInfo);
        }

        // 불러온 값 넣어주기

        return LiveDetailGetRes.builder()
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

    }
}
