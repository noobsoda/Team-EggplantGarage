package com.ssafy.api.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteLiveGetRes {
    private List<LiveContent> liveContentList;

    public static FavoriteLiveGetRes of(List<LiveContent> liveContentList){
        FavoriteLiveGetRes favoriteLiveGetRes = new FavoriteLiveGetRes();
        favoriteLiveGetRes.setLiveContentList(liveContentList);
        return favoriteLiveGetRes;
    }


}
