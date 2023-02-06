package com.ssafy.api.response;

import com.ssafy.db.entity.ChatMessage;
import com.ssafy.db.entity.ChatRoom;
import com.ssafy.db.entity.User;
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
    @ApiModelProperty(name = "ChatRoom receiverId")
    long receiverId;
    @ApiModelProperty(name = "ChatRoom receiverName")
    String receiverName;
    @Builder
    class Message {
        boolean isSender;
        String content;
        LocalDateTime sendTime;
    }
    List<Message> messageList;

    public static ChatRoomDetailRes of(ChatRoom chatRoom, long senderId)  {
        List<ChatMessage> chatMessageList = chatRoom.getChatMessageList();
        List<Message> msgList = new ArrayList<>();
        boolean IsFirstUserSender = (chatRoom.getFirstUser().getId() == senderId) ? true : false;
        for (ChatMessage chatMessage : chatMessageList) {
            boolean isSender = (chatMessage.isFirstUser() == IsFirstUserSender) ? true : false;
            Message msg = Message.builder()
                    .isSender(isSender)
                    .content(chatMessage.getContent())
                    .sendTime(chatMessage.getCreatedAt())
                    .build();
            msgList.add(msg);
        }
        User receiver = (IsFirstUserSender) ? chatRoom.getSecondUser() : chatRoom.getFirstUser();
        ChatRoomDetailRes res = ChatRoomDetailRes.builder()
                .receiverId(receiver.getId())
                .receiverName(receiver.getName())
                .messageList(msgList)
                .build();
        return res;
    }
}