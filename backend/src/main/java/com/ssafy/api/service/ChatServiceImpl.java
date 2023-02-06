package com.ssafy.api.service;

import com.ssafy.api.request.ChatMessageSendReq;
import com.ssafy.api.response.ChatRoomDetailRes;
import com.ssafy.api.response.ChatRoomRes;
import com.ssafy.db.entity.ChatMessage;
import com.ssafy.db.entity.ChatRoom;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ChatMessageRepository;
import com.ssafy.db.repository.ChatRoomRepository;
import com.ssafy.db.repository.UserRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service("chatRoomService")
public class ChatServiceImpl implements ChatService {
    private final Logger logger;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    @Autowired
    public ChatServiceImpl(Logger logger, ChatRoomRepository chatRoomRepository, ChatMessageRepository chatMessageRepository, UserRepository userRepository) {
        this.logger = logger;
        this.chatRoomRepository = chatRoomRepository;
        this.chatMessageRepository = chatMessageRepository;
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
    public ChatRoomRes getChatRoombyUsersId(long fromUserId, long toUserId) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findOneByUsersId(fromUserId, toUserId);
        return ChatRoomRes.of(chatRoom.orElse(null));
    }

    @Override
    public List<ChatRoomRes> getChatRoomListByMyId(long myId) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findOneByToUserIdOrFromUserId(myId);
        return ChatRoomRes.of(chatRoomList);
    }

    @Override
    public ChatRoomDetailRes getChatMessageListById(long chatRoomId, long myId) {
        ChatRoom chatRoom = chatRoomRepository.findByid(chatRoomId).orElse(null);
        return ChatRoomDetailRes.of(chatRoom, myId);
    }

    @Override
    public ChatMessage saveMessage(ChatMessageSendReq chatMessageSendReq) {
        ChatRoom chatRoom = chatRoomRepository.findByid(chatMessageSendReq.getChatRoomID()).orElse(null);
        ChatMessage chatMessage = ChatMessage.builder()
                .content(chatMessageSendReq.getContent())
                .createdAt(LocalDateTime.now())
                .chatRoom(chatRoom)
                .build();
        return chatMessageRepository.save(chatMessage);
    }
}
