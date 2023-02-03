package com.ssafy.api.response;

import com.ssafy.db.entity.ChatRoom;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ApiModel("ChatRoomResponse")
public class ChatRoomRes {
    @ApiModelProperty(name = "ChatRoom id")
    long id;
    @ApiModelProperty(name = "ChatRoom toUserName")
    String toUserName;
    @ApiModelProperty(name = "ChatRoom lastSendMessage")
    String lastSendMessage;
    @ApiModelProperty(name = "ChatRoom lastSendTime")
    LocalDateTime lastSendTime;

    public static ChatRoomRes of(ChatRoom chatRoom)  {
        ChatRoomRes res = ChatRoomRes.builder()
                .id(chatRoom.getId())
                .toUserName(chatRoom.getToUser().getName())
                .lastSendMessage(chatRoom.getLastSendMessage())
                .lastSendTime(chatRoom.getLastSendTime())
                .build();
        return res;
    }
}
