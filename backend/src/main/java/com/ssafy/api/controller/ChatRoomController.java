package com.ssafy.api.controller;

import com.ssafy.api.request.ChatRoomCreatePostReq;
import com.ssafy.api.service.ChatRoomService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
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
    private  final UserService userService;

    @Autowired
    public ChatRoomController(Logger logger, ChatRoomService chatRoomService, UserService userService) {
        this.logger = logger;
        this.chatRoomService = chatRoomService;
        this.userService = userService;
    }

    @PostMapping()
    @ApiOperation(value = "채팅방 생성", notes = "채팅방을 생성합니다.")
    @ApiResponses({@ApiResponse(code = 201, message = "생성 성공"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<? extends BaseResponseBody> createChatRoom(@RequestBody @ApiParam(value = "채팅방 정보", required = true) ChatRoomCreatePostReq chatRoomCreatePostReq) {
        User toUser = userService.getUserById(chatRoomCreatePostReq.getToUserID());
        User fromUser = userService.getUserById(chatRoomCreatePostReq.getFromUserID());
        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Created"));
    }

}
