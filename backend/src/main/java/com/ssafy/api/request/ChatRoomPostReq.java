package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ChatRoomCreatePostReq")
public class ChatRoomPostReq {
    @ApiModelProperty(name = "보내는 유저 아이디", required = true, example = "1")
    long senderId;
    @ApiModelProperty(name = "받는 유저 아이디", required = true, example = "2")
    long receiverId;
}
