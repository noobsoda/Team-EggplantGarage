package com.ssafy.api.service;

import com.ssafy.api.request.ChatMessageSendReq;
import com.ssafy.api.response.ChatRoomDetailRes;
import com.ssafy.api.response.ChatRoomRes;
import com.ssafy.db.entity.ChatMessage;
import com.ssafy.db.entity.ChatRoom;

import java.util.List;

public interface ChatService {
    ChatRoomRes createChatRoom(long fromUserId, long toUserId);
    ChatRoomRes getChatRoombyUsersId(long fromUserId, long toUserId);
    List<ChatRoomRes> getChatRoomListByMyId(long userId);
    ChatRoomDetailRes getChatMessageListById(long chatRoomId, long myId);
    ChatMessage saveMessage(ChatMessageSendReq chatMessageSendReq);
}
