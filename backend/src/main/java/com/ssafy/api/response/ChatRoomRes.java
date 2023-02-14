package com.ssafy.api.response;

import com.ssafy.db.entity.ChatRoom;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@ApiModel("ChatRoomResponse")
public class ChatRoomRes {
    @ApiModelProperty(name = "ChatRoom id")
    long chatRoomId;
    @ApiModelProperty(name = "ChatRoom receiverId")
    long receiverId;
    @ApiModelProperty(name = "ChatRoom receiverName")
    String receiverName;
    @ApiModelProperty(name = "ChatRoom lastSendMessage")
    String lastSendMessage;
    @ApiModelProperty(name = "ChatRoom lastSendTime")
    LocalDateTime lastSendTime;

    public static ChatRoomRes of(ChatRoom chatRoom, long senderId)  {
        System.out.println(chatRoom);
        if(chatRoom == null) return null;

        User receiver = (chatRoom.getFirstUser().getId() != senderId) ? chatRoom.getFirstUser() : chatRoom.getSecondUser();
        ChatRoomRes res = ChatRoomRes.builder()
                .chatRoomId(chatRoom.getId())
                .receiverId(receiver.getId())
                .receiverName(receiver.getNickname())
                .lastSendMessage(chatRoom.getLastSendMessage())
                .lastSendTime(chatRoom.getLastSendTime())
                .build();
        return res;
    }

    public static List<ChatRoomRes> of(List<ChatRoom> chatRoomList, long senderId)  {
        List<ChatRoomRes> resList = new ArrayList<>();
        for (ChatRoom chatRoom: chatRoomList) {
            resList.add(ChatRoomRes.of(chatRoom, senderId));
        }
        return resList;
    }
}
