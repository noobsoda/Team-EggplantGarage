package com.ssafy.api.service;

import com.ssafy.api.request.ChatMessageSendReq;
import com.ssafy.api.response.ChatMessageRes;
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

@Service("chatService")
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
    public ChatRoomRes createChatRoom(long senderId, long receiverId) {
        User sender = userRepository.findById(senderId).orElse(null);
        User receiver = userRepository.findById(receiverId).orElse(null);
        ChatRoom chatRoom = ChatRoom.builder()
                .firstUser(sender)
                .secondUser(receiver)
                .build();
        return ChatRoomRes.of(chatRoomRepository.save(chatRoom), senderId);
    }

    @Override
    public ChatRoomRes getChatRoombyUsersId(long senderId, long receiverId) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findOneByUsersId(senderId, receiverId);
        return ChatRoomRes.of(chatRoom.orElse(null), senderId);
    }

    @Override
    public List<ChatRoomRes> getChatRoomListByUserId(long senderId) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findByFirstUserIdOrSecondUserId(senderId);
        return ChatRoomRes.of(chatRoomList, senderId);
    }

    @Override
    public List<ChatMessageRes> getChatMessageByChatRoomId(long chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findByid(chatRoomId).orElse(null);
        return ChatMessageRes.of(chatRoom);
    }

    @Override
    public ChatMessage saveMessage(ChatMessageSendReq chatMessageSendReq) {
        ChatRoom chatRoom = chatRoomRepository.findByid(chatMessageSendReq.getChatRoomId()).orElse(null);
        ChatMessage chatMessage = ChatMessage.builder()
                .senderId(chatMessageSendReq.getSenderId())
                .content(chatMessageSendReq.getContent())
                .createdAt(LocalDateTime.now())
                .chatRoom(chatRoom)
                .build();
        return chatMessageRepository.save(chatMessage);
    }

    @Override
    public ChatRoom updateChatRoom(ChatMessage chatMessage) {
        ChatRoom chatRoom = chatMessage.getChatRoom();
        chatRoom.setLastSendMessage(chatMessage.getContent());
        chatRoom.setLastSendTime(chatMessage.getCreatedAt());
        return chatRoomRepository.save(chatRoom);
    }
}
