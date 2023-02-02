package com.ssafy.api.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LiveListGetRes {
    private List<LiveContent> liveContentList;
}
