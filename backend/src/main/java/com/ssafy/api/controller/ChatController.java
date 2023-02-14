package com.ssafy.api.controller;

import com.ssafy.api.request.ChatRoomPostReq;
import com.ssafy.api.response.ChatMessageRes;
import com.ssafy.api.response.ChatRoomRes;
import com.ssafy.api.service.ChatService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Api(value = "채팅방 API", tags = {"Chat."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
public class ChatController {
    private final Logger logger;
    private final ChatService chatService;

    @PostMapping("")
    @ApiOperation(value = "채팅방 입장", notes = "채팅방에 입장합니다.")
    @ApiResponses({@ApiResponse(code = 201, message = "입장 성공"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<ChatRoomRes> joinChatRoom(@RequestBody @ApiParam(value = "채팅방 정보", required = true) ChatRoomPostReq chatRoomPostReq) {
        long senderId = chatRoomPostReq.getSenderId();
        long receiverId = chatRoomPostReq.getReceiverId();

        ChatRoomRes res = chatService.createChatRoom(senderId, receiverId);
        return ResponseEntity.status(200).body(res);
    }

    @GetMapping(value = "/list/{userId}")
    @ApiOperation(value = "채팅방 목록 조회", notes = "채팅방 목록을 조회합니다.")
    public ResponseEntity<List<ChatRoomRes>> getChatRoomList(HttpServletResponse response, @PathVariable("userId") Long userId) {
        List<ChatRoomRes> resList = chatService.getChatRoomListByUserId(userId);
        return ResponseEntity.status(200).body(resList);
    }

    @GetMapping(value = "/message/{chatRoomId}")
    @ApiOperation(value = "채팅방 메시지 조회", notes = "채팅방 메시지를 조회합니다.")
    public ResponseEntity<List<ChatMessageRes>> getChatMessageList(@PathVariable("chatRoomId") long chatRoomId) {
        List<ChatMessageRes> resList = chatService.getChatMessageByChatRoomId(chatRoomId);
        return ResponseEntity.status(200).body(resList);
    }
}