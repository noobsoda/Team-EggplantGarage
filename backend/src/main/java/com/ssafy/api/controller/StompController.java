package com.ssafy.api.controller;

import com.ssafy.api.request.ChatMessageSendReq;
import com.ssafy.api.request.LiveChatReq;
import com.ssafy.api.service.ChatService;
import com.ssafy.db.entity.ChatMessage;
import com.ssafy.db.entity.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompController {
    private final ChatService chatService;
    private final SimpMessagingTemplate template; // 특정 Broker로 메세지를 전달

    // STOMP subscribe destination : /sub/chat/room/{chatRoomId}
    // STOMP send destination : /pub/chat/message
    @MessageMapping(value = "/room/message") // 매핑될 엔드포인트 : applicationDestinationPrefixes + MessageMapping's value
    // MessageMapping로 요청(pub)이 들어오고 SendTo(sub)로 응답이 나간다.
    public void sendMessageToRoom(@Payload ChatMessageSendReq chatMessageSendReq) {
        ChatMessage chatMessage = chatService.saveMessage(chatMessageSendReq);
        ChatRoom chatRoom = chatService.updateChatRoom(chatMessage);
        // 클라이언트에서 "/pub/message"의 경로로 메시지를 보내는 요청을 하면,
        // StompChatController가 받아서 "/sub/chat/room/{chatRoomId}"를 구독하고 있는 클라이언트에게 메시지를 전달.
        template.convertAndSend("/sub/room/" + chatRoom.getId(), chatMessageSendReq);
    }

    @MessageMapping("/live/message/{roomId}")
    public void sendMessageToLive(@Payload LiveChatReq liveChatReq) {
        // @Payload: 헤더와 메타 데이터를 제외한 실제 사용에 있어서 필요한 데이터
        template.convertAndSend("/sub/live/" + liveChatReq.getRoomId(), liveChatReq);
    }

    @MessageMapping("/live/addUser/{roomId}")
    public void addUser(@Payload LiveChatReq liveChatReq) {
        template.convertAndSend("/sub/live/" + liveChatReq.getRoomId(), liveChatReq);
    }
}