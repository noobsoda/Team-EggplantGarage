package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LiveRegisterPostReq")
public class LiveRegisterPostReq {

    @ApiModelProperty(name = "판매자 아이디", example = "2")
    private Long sellerId;
    @ApiModelProperty(name = "세션 아이디", example = "ses_YnDaGYNcd7")
    private String sessionId;
    @ApiModelProperty(name = "방송 제목", example = "GarageSale Open")
    private String title;
    @ApiModelProperty(name = "방송 설명", example = "Do you know GarageSale?")
    private String description;
    @ApiModelProperty(name = "방송 주소", example = "https://localhost/")
    private String url;
    @ApiModelProperty(name = "방송 여부", example = "true")
    private boolean isLive;
    @ApiModelProperty(name = "방송 위도", example = "105.11")
    private Double latitude;
    @ApiModelProperty(name = "방송 경도", example = "202.22")
    private Double longitude;
    


}
