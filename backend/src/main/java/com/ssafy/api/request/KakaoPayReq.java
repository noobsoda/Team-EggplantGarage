package com.ssafy.api.request;

import lombok.Data;

@Data
public class KakaoPayReq {
    private Long bundleId;
    private String pcOrMobile;
}
