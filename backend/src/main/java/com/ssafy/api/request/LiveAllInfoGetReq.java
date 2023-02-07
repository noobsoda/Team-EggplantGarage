package com.ssafy.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LiveAllInfoGetReq {
    @ApiModelProperty(name = "전국 true, 지역 false", example = "ture")
    private boolean isNational;
    @ApiModelProperty(name = "유저 정렬 옵션 ASC, DESC (대소문자 상관 없음)", example = "ASC")
    private String joinUserSort;
    @ApiModelProperty(name = "지역 정렬 옵션 ASC, DESC (대소문자 상관 없음)", example = "ASC")
    private String distanceSort;
    @ApiModelProperty(name = "타이틀 검색", example = "hi")
    private String title;
    @ApiModelProperty(name = "카테고리 검색", example = "디지털기기")
    private String category;
    @ApiModelProperty(name = "위도", example = "36.354463")
    private Double latitude;
    @ApiModelProperty(name = "경도", example = "127.324351")
    private Double longitude;

}
