package com.ssafy.api.response;

import com.ssafy.db.entity.ChatMessage;
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
@ApiModel("ChatRoomDetailResponse")
public class ChatRoomDetailRes {
    @ApiModelProperty(name = "ChatRoom id")
    long chatRoomId;
    @ApiModelProperty(name = "ChatRoom toUserId")
    long toUserId;
    @ApiModelProperty(name = "ChatRoom toUserName")
    String toUserName;
    @Builder
    class Message {
        boolean isMe;
        String content;
        LocalDateTime sendTime;
    }
    List<Message> messageList;

    public static ChatRoomDetailRes of(ChatRoom chatRoom, long myId)  {
        List<ChatMessage> chatMessageList = chatRoom.getChatMessageList();
        List<Message> msgList = new ArrayList<>();
        for (ChatMessage chatMessage : chatMessageList) {
            boolean isMe = (chatMessage.getChatRoom().getFromUser().getId() == myId) ? true : false;
            Message msg = Message.builder()
                    .isMe(isMe)
                    .content(chatMessage.getContent())
                    .sendTime(chatMessage.getCreatedAt())
                    .build();
            msgList.add(msg);
        }

        ChatRoomDetailRes res = ChatRoomDetailRes.builder()
                .chatRoomId(chatRoom.getId())
                .toUserId(chatRoom.getToUser().getId())
                .toUserName(chatRoom.getToUser().getName())
                .messageList(msgList)
                .build();
        return res;
    }
}