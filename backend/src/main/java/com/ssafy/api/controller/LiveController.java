package com.ssafy.api.controller;

import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 라이브 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "라이브 API", tags = {"Live"})
@RestController
@RequestMapping("/api/v1/lives")
public class LiveController {
    private final Logger logger;
    private final UserService userService;
    @Autowired
    public LiveController(Logger logger, UserService userService) {
        this.logger = logger;
        this.userService = userService;
    }
    @GetMapping("/categories")
    @ApiOperation(value = "카테고리 전원 조회", notes = "모든 방의 카테고리를 조회한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"), @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<UserRes> getCategoryInfo() {




        return null;
    }
}
