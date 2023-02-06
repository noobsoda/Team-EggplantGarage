package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("ChatMessageSendReq")
public class ChatMessageSendReq {
    @ApiModelProperty(name = "채팅방 아이디", required = true, example = "1")
    long chatRoomID;
    @ApiModelProperty(name = "보내는 사람", required = true, example = "2")
    long fromUserId;
    @ApiModelProperty(name = "받는 사람", required = true, example = "3")
    long toUserId;
    @ApiModelProperty(name = "메시지 내용", required = true, example = " 안녕하세요.")
    private String content;
}
