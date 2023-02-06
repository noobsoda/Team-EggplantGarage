package com.ssafy.api.response;

import com.ssafy.db.entity.ChatRoom;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@ApiModel("ChatRoomResponse")
public class ChatRoomRes {
    @ApiModelProperty(name = "ChatRoom id")
    long chatRoomId;
    @ApiModelProperty(name = "ChatRoom toUserId")
    long toUserId;
    @ApiModelProperty(name = "ChatRoom toUserName")
    String toUserName;
    @ApiModelProperty(name = "ChatRoom lastSendMessage")
    String lastSendMessage;
    @ApiModelProperty(name = "ChatRoom lastSendTime")
    LocalDateTime lastSendTime;

    public static ChatRoomRes of(ChatRoom chatRoom)  {
        ChatRoomRes res = ChatRoomRes.builder()
                .chatRoomId(chatRoom.getId())
                .toUserId(chatRoom.getToUser().getId())
                .toUserName(chatRoom.getToUser().getName())
                .lastSendMessage(chatRoom.getLastSendMessage())
                .lastSendTime(chatRoom.getLastSendTime())
                .build();
        return res;
    }

    public static List<ChatRoomRes> of(List<ChatRoom> chatRoomList)  {
        List<ChatRoomRes> resList = new ArrayList<>();
        for (ChatRoom chatRoom: chatRoomList) {
            resList.add(ChatRoomRes.of(chatRoom));
        }
        return resList;
    }
}
