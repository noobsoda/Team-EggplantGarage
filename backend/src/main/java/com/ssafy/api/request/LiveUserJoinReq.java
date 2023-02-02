package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LiveUserJoinReq {
    private Long userId;
    private Long liveId;
}
