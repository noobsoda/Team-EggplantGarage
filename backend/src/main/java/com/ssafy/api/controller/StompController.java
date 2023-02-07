package com.ssafy.api.controller;

import com.ssafy.api.request.ChatMessageSendReq;
import com.ssafy.api.request.LiveChatReq;
import com.ssafy.api.service.ChatService;
import com.ssafy.db.entity.ChatMessage;
import com.ssafy.db.entity.ChatRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class StompController {
    private final ChatService chatService;
    private final SimpMessagingTemplate template; // 특정 Broker로 메세지를 전달
    @Autowired
    public StompController(ChatService chatService, SimpMessagingTemplate template) {
        this.chatService = chatService;
        this.template = template;
    }

    // STOMP subscribe destination : /sub/chat/room/{chatRoomId}
    // STOMP send destination : /pub/chat/message
    @MessageMapping(value = "/room/message") // 매핑될 엔드포인트 : applicationDestinationPrefixes + MessageMapping's value
    // MessageMapping로 요청(pub)이 들어오고 SendTo(sub)로 응답이 나간다.
    public void sendMessageToRoom(@Payload ChatMessageSendReq chatMessageSendReq) {
        ChatMessage chatMessage = chatService.saveMessage(chatMessageSendReq);
        ChatRoom chatRoom = chatService.updateChatRoom(chatMessage);
        // 클라이언트에서 "/pub/message"의 경로로 메시지를 보내는 요청을 하면,
        // StompChatController가 받아서 "/sub/chat/room/{chatRoomId}"를 구독하고 있는 클라이언트에게 메시지를 전달.
        // template.convertAndSend("/sub/chat/room/" + chatRoom.getId(), ChatRoomDetailRes.of(chatRoom, chatMessageSendReq.getSenderId()));
        template.convertAndSend("/sub/room/" + chatRoom.getId(), chatMessageSendReq);
    }

    @MessageMapping("/live/message")
    public void sendMessageToLive(@Payload LiveChatReq liveChatReq) {
        System.out.println("controller: sendMessage");
        // @Payload: 헤더와 메타 데이터를 제외한 실제 사용에 있어서 필요한 데이터
        template.convertAndSend("/sub/live/" + liveChatReq.getRoomId(), liveChatReq);
    }

    @MessageMapping("/live/addUser")
    public void addUser(@Payload LiveChatReq liveChatReq, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("controller: addUser");
        System.out.println("roomId: " + liveChatReq.getRoomId());
        headerAccessor.getSessionAttributes().put("username", liveChatReq.getSender());
        template.convertAndSend("/sub/live/" + liveChatReq.getRoomId(), liveChatReq);
    }
}