package com.ssafy.api.service;

import com.ssafy.api.response.ChatRoomDetailRes;
import com.ssafy.api.response.ChatRoomRes;

import java.util.List;

public interface ChatService {
    ChatRoomRes createChatRoom(long fromUserId, long toUserId);
    ChatRoomRes getChatRoombyUserId(long fromUserId, long toUserId);
    List<ChatRoomRes> getChatRoomListByMyID(long userId);
    ChatRoomDetailRes getChatMessageListById(long chatRoomId, long myId);
}
