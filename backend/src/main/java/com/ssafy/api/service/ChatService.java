package com.ssafy.api.service;

import com.ssafy.api.request.ChatMessageSendReq;
import com.ssafy.api.response.ChatMessageRes;
import com.ssafy.api.response.ChatRoomRes;
import com.ssafy.db.entity.ChatMessage;
import com.ssafy.db.entity.ChatRoom;

import java.util.List;

public interface ChatService {
    ChatRoomRes createChatRoom(long senderId, long receiverId);
    ChatRoomRes getChatRoombyUsersId(long senderId, long receiverId);
    List<ChatRoomRes> getChatRoomListByUserId(long userId);
    List<ChatMessageRes> getChatMessageByChatRoomId(long chatRoomId);
    ChatMessage saveMessage(ChatMessageSendReq chatMessageSendReq);
    ChatRoom updateChatRoom(ChatMessage chatMessage);
}
