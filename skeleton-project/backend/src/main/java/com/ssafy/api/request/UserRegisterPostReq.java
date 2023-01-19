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
	@ApiModelProperty(name="유저 ID", example="ssafy_web")
	String userEmail;
	@ApiModelProperty(name="유저 Password", example="your_password")
	String userPassword;
	@ApiModelProperty(name="유저 Name", example="your_name")
	String userName;
	@ApiModelProperty(name="유저 Nickname", example="your_nickname")
	String userNickname;
	@ApiModelProperty(name="유저 Phone", example="010-1234-5678")
	String userPhone;
	@ApiModelProperty(name="유저 Bank", example="기업")
	String userBank;
	@ApiModelProperty(name="유저 Account", example="110-xxxxxxxxx")
	String userAccount;

}
