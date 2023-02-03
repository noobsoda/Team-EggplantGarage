package com.ssafy.api.service;

import com.ssafy.api.response.ChatRoomRes;
import com.ssafy.db.entity.ChatRoom;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ChatRoomRepository;
import com.ssafy.db.repository.UserRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("chatRoomService")
public class ChatRoomServiceImpl implements ChatRoomService{
    private final Logger logger;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    @Autowired
    public ChatRoomServiceImpl(Logger logger, ChatRoomRepository chatRoomRepository,UserRepository userRepository) {
        this.logger = logger;
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ChatRoomRes createChatRoom(long fromUserId, long toUserId) {
        User fromUser = userRepository.findById(fromUserId).orElse(null);
        User toUser = userRepository.findById(toUserId).orElse(null);
        ChatRoom chatRoom = ChatRoom.builder()
                .fromUser(fromUser)
                .toUser(toUser)
                .build();
        return ChatRoomRes.of(chatRoom);
    }

    @Override
    public ChatRoomRes getChatRoombyUserId(long fromUserId, long toUserId) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findOneByUsersId(fromUserId, toUserId);
        return ChatRoomRes.of(chatRoom.orElse(null));
    }
}
