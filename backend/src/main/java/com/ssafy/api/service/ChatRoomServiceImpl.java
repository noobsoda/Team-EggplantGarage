package com.ssafy.api.service;

import com.ssafy.api.request.LiveRegisterPostReq;
import com.ssafy.db.entity.ChatRoom;
import com.ssafy.db.repository.ChatRoomRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("chatRoomService")
public class ChatRoomServiceImpl implements ChatRoomService{
    private final Logger logger;
    private final ChatRoomRepository chatRoomRepository;

    @Autowired
    public ChatRoomServiceImpl(Logger logger, ChatRoomRepository chatRoomRepository) {
        this.logger = logger;
        this.chatRoomRepository = chatRoomRepository;
    }

    @Override
    public ChatRoom CreateChatRoom(LiveRegisterPostReq liveRegisterInfo) {

    }

}
