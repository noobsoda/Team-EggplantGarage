package com.ssafy.api.controller;

import com.ssafy.api.request.ChatRoomPostReq;
import com.ssafy.api.response.ChatRoomRes;
import com.ssafy.api.service.ChatRoomService;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "채팅방 API", tags = {"ChatRoom."})
@RestController
@RequestMapping("/api/v1/chatroom")
public class ChatRoomController {
    private final Logger logger;
    private final ChatRoomService chatRoomService;
    @Autowired
    public ChatRoomController(Logger logger, ChatRoomService chatRoomService) {
        this.logger = logger;
        this.chatRoomService = chatRoomService;
    }

    @PostMapping()
    @ApiOperation(value = "채팅방 입장", notes = "채팅방에 입장합니다.")
    @ApiResponses({@ApiResponse(code = 201, message = "입장 성공"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<ChatRoomRes> joinChatRoom(@RequestBody @ApiParam(value = "채팅방 정보", required = true) ChatRoomPostReq chatRoomPostReq) {
        long fromUserId = chatRoomPostReq.getFromUserID();
        long toUserId = chatRoomPostReq.getToUserID();
        ChatRoomRes res = chatRoomService.getChatRoombyUserId(fromUserId, toUserId);
        if(res == null){
            res = chatRoomService.createChatRoom(fromUserId, toUserId);
        }
        return ResponseEntity.status(200).body(res);
    }
}
