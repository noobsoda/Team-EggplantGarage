package com.ssafy.api.controller;

import com.ssafy.api.request.ChatMessageSendReq;
import com.ssafy.api.request.ChatRoomPostReq;
import com.ssafy.api.response.ChatRoomDetailRes;
import com.ssafy.api.response.ChatRoomRes;
import com.ssafy.api.service.ChatService;
import com.ssafy.db.entity.ChatRoom;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Api(value = "채팅방 API", tags = {"ChatRoom."})
@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {
    private final Logger logger;
    private final ChatService chatRoomService;
    private SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    @Autowired
    public ChatController(Logger logger, ChatService chatRoomService) {
        this.logger = logger;
        this.chatRoomService = chatRoomService;
    }

    @PostMapping("/join")
    @ApiOperation(value = "채팅방 입장", notes = "채팅방에 입장합니다.")
    @ApiResponses({@ApiResponse(code = 201, message = "입장 성공"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<ChatRoomRes> joinChatRoom(@RequestBody @ApiParam(value = "채팅방 정보", required = true) ChatRoomPostReq chatRoomPostReq) {
        long fromUserId = chatRoomPostReq.getFromUserID();
        long toUserId = chatRoomPostReq.getToUserID();
        ChatRoomRes res = chatRoomService.getChatRoombyUsersId(fromUserId, toUserId);
        if(res == null){
            res = chatRoomService.createChatRoom(fromUserId, toUserId);
        }
        return ResponseEntity.status(200).body(res);
    }

    @GetMapping(value = "/list/{userId}")
    @ApiOperation(value = "채팅방 목록 조회", notes = "채팅방 목록을 조회합니다.")
    public ResponseEntity<List<ChatRoomRes>> getChatRoomList(HttpServletResponse response, @PathVariable("userId") Long userId) {
        List<ChatRoomRes> resList = chatRoomService.getChatRoomListByMyId(userId);
        return ResponseEntity.status(200).body(resList);
    }
    @GetMapping(value = "/message/{chatRoomId}")
    @ApiOperation(value = "채팅방 메시지 조회",notes = "채팅방 메시지를 조회합니다." )
    public ResponseEntity<ChatRoomDetailRes> getChatRoomDetailRes(@PathVariable("chatRoomId") long chatRoomId, long myId) {
        ChatRoomDetailRes res = chatRoomService.getChatMessageListById(chatRoomId, myId);
        return ResponseEntity.status(200).body(res);
    }
    @MessageMapping(value = "/message")
    @SendTo("/message/send")
    public void sendMessage(@Payload ChatMessageSendReq message) {
        chatRoomService.saveMessage(message);
    }

}
