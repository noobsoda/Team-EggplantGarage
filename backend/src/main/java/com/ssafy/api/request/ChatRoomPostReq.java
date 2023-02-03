package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ChatRoomCreatePostReq")
public class ChatRoomPostReq {
    @ApiModelProperty(name = "보내는 사람", required = true, example = "1")
    long fromUserID;
    @ApiModelProperty(name = "받는 사람", required = true, example = "2")
    long toUserID;
}
