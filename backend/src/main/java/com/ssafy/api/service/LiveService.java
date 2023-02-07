package com.ssafy.api.service;

import com.ssafy.api.request.LiveCategoriesReq;
import com.ssafy.api.request.LiveUserJoinReq;
import com.ssafy.api.request.LiveRegisterPostReq;
import com.ssafy.api.request.Location;
import com.ssafy.api.response.LiveContent;
import com.ssafy.api.response.LiveDetailGetRes;
import com.ssafy.api.response.LiveListGetRes;
import com.ssafy.db.entity.Live;
import com.ssafy.db.entity.User;

import java.util.List;

public interface LiveService {
    Live CreateLive(LiveRegisterPostReq liveRegisterInfo, User user);

    LiveDetailGetRes getLiveDetailBySessionId(String sessionId);

    boolean getLiveCheckUrlByUrl(String url);

    boolean postLiveByThumbnailUrl(Long sellerId, String thumbnailUrl);

    boolean postLiveByCategories(Long id, LiveCategoriesReq liveCategoriesReq);

    List<LiveContent>  getLiveList(String title);

    boolean postUserLiveByLiveId(LiveUserJoinReq liveUserJoinReq);

    boolean deleteUserLiveByLiveId(LiveUserJoinReq liveUserJoinReq);

    boolean patchLiveEndById(Long liveId);

    List<LiveContent> searchCategoryLiveList(List<LiveContent> liveContentList, String category);

    List<LiveContent> searchLocationLiveList(List<LiveContent> liveContentList, Location location);
}
