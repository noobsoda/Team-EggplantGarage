package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@ApiModel("UserDeleteRequest")
public class UserDeleteReq {
    @ApiModelProperty(name="유저 Password", example="your_password")
    String password;
}
