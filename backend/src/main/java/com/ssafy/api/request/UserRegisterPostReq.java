package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
    @ApiModelProperty(name = "유저 ID", example = "ssafy_web")
    String email;
    @ApiModelProperty(name = "유저 Password", example = "your_password")
    String password;
    @ApiModelProperty(name = "유저 Name", example = "your_name")
    String name;
    @ApiModelProperty(name = "유저 Nickname", example = "your_nickname")
    String nickname;
    @ApiModelProperty(name = "유저 Phone", example = "010-1234-5678")
    String phoneNumber;
    @ApiModelProperty(name = "유저 bankName", example = "기업")
    String bankName;
    @ApiModelProperty(name = "유저 bankAddress", example = "110-xxxxxxxxx")
    String bankAddress;

}
