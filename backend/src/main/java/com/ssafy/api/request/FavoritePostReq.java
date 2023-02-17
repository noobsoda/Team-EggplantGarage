package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FavoritePostReq {
    private Long userId;
    private Long liveId;
}
