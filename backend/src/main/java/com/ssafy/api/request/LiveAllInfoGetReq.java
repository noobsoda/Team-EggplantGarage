package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LiveAllInfoGetReq {
    private boolean national;
    private String joinUserSort;
    private String distanceSort;
    private String title;
    private String category;
    private Double latitude;
    private Double longitude;

}
