package com.ssafy.api.response;

import com.ssafy.db.entity.Live;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LiveListGetRes {
    private List<LiveContent> liveContentList;

    public static LiveListGetRes of(List<LiveContent> liveContentList){
        LiveListGetRes liveListGetRes = new LiveListGetRes();
        liveListGetRes.setLiveContentList(liveContentList);
        return liveListGetRes;
    }
}
