package com.ssafy.api.response;

import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="User Email")
	String userEmail;
	@ApiModelProperty(name="User Name")
	String userName;
	@ApiModelProperty(name="User Nickname")
	String userNickname;
	@ApiModelProperty(name="User Phone")
	String userPhone;
	@ApiModelProperty(name="User Bank")
	String userBank;
	@ApiModelProperty(name="User Accound")
	String userAccount;
	@ApiModelProperty(name="User CreateAt")
	LocalDateTime createAt;


	
	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserEmail(user.getUserEmail());
		res.setUserName(user.getUserName());
		res.setUserNickname(user.getUserNickname());
		res.setUserPhone(user.getUserPhone());
		res.setUserBank(user.getUserBank());
		res.setUserAccount(user.getUserAccount());
		res.setCreateAt(user.getCreateAt());

		return res;
	}
}
