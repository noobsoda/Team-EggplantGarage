package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LiveAllInfoGetReq {
    private String title;
    private String category;
    private Double latitude;
    private Double longitude;

}
