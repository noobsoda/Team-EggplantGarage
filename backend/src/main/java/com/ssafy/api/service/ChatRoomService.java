package com.ssafy.api.service;

import com.ssafy.api.request.LiveRegisterPostReq;
import com.ssafy.api.response.ChatRoomRes;
import com.ssafy.db.entity.ChatRoom;

public interface ChatRoomService {
    ChatRoomRes createChatRoom(long fromUserId, long toUserId);
    ChatRoomRes getChatRoombyUserId(long fromUserId, long toUserId);
}
