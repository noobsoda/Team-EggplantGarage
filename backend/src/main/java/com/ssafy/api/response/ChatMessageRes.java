package com.ssafy.api.response;

import com.ssafy.db.entity.ChatMessage;
import com.ssafy.db.entity.ChatRoom;
import io.swagger.annotations.ApiModel;
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
public class ChatMessageRes {
    long senderId;
    String content;
    LocalDateTime sendTime;

    public static ChatMessageRes of(ChatMessage chatMessage)  {
        ChatMessageRes res = ChatMessageRes.builder()
                .senderId(chatMessage.getSenderId())
                .content(chatMessage.getContent())
                .sendTime(chatMessage.getCreatedAt())
                .build();
        return res;
    }

    public static List<ChatMessageRes> of(ChatRoom chatRoom)  {
        List<ChatMessage> chatMessageList = chatRoom.getChatMessageList();
        List<ChatMessageRes> resList = new ArrayList<>();
        for (ChatMessage chatMessage : chatMessageList) {
            resList.add(ChatMessageRes.of(chatMessage));
        }
        return resList;
    }
}