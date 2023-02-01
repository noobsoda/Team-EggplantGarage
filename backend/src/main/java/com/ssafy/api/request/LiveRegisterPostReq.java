package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("LiveRegisterPostReq")
public class LiveRegisterPostReq {

    @ApiModelProperty(name = "세션 아이디", example = "ses_YnDaGYNcd7")
    private String session_id;
    @ApiModelProperty(name = "방송 제목", example = "GarageSale Open")
    private String title;
    @ApiModelProperty(name = "방송 설명", example = "Do you know GarageSale?")
    private String description;
    @ApiModelProperty(name = "방송 주소", example = "https://localhost/")
    private String url;
    @ApiModelProperty(name = "방송 여부", example = "true")
    private boolean isLive;
    @ApiModelProperty(name = "방송 주소", example = "대전광역시 덕명구")
    private String location;


}
