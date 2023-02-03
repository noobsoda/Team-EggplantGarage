package com.ssafy.api.service;

import com.ssafy.api.request.LiveRegisterPostReq;
import com.ssafy.db.entity.ChatRoom;

public interface ChatRoomService {
    ChatRoom CreateChatRoom(LiveRegisterPostReq liveRegisterInfo);
}
