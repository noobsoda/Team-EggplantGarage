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
public class UserRes {

    @ApiModelProperty(name = "User Id")
    Long id;

    @ApiModelProperty(name = "User Email")
    String email;
    @ApiModelProperty(name = "User Name")
    String name;
    @ApiModelProperty(name = "User Nickname")
    String nickname;
    @ApiModelProperty(name = "phoneNumber")
    String phoneNumber;
    @ApiModelProperty(name = "bankName")
    String bankName;
    @ApiModelProperty(name = "bankAddress")
    String bankAddress;
    @ApiModelProperty(name = "User CreateAt")
    LocalDateTime createAt;


    public static UserRes of(User user) {
        UserRes res = new UserRes();
        res.setId(user.getId());
        res.setEmail(user.getEmail());
        res.setName(user.getName());
        res.setNickname(user.getNickname());
        res.setPhoneNumber(user.getPhoneNumber());
        res.setBankName(user.getBankName());
        res.setBankAddress(user.getBankAddress());
        res.setCreateAt(user.getCreatedAt());

        return res;
    }
}
