package com.ssafy.api.controller;

import com.ssafy.api.request.ProductsRegisterPostReq;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Api(value = "상품 API", tags = {"Product"})
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    private final Logger logger;
    private final UserService userService;

    public ProductController(Logger logger, UserService userService) {
        this.logger = logger;
        this.userService = userService;
    }

    @PostMapping("/{id}")
    @ApiOperation(value = "상품 등록", notes = "현재 라이브에 상품을 등록한다..")
    @ApiResponses({@ApiResponse(code = 201, message = "Created"), @ApiResponse(code = 401, message = "만료됨"), @ApiResponse(code = 403, message = "인증 실패"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<? extends BaseResponseBody> postProductCreate(@RequestParam @ApiParam(value = "방 생성 정보", required = true) ProductsRegisterPostReq productRegisterPostReq,
                                                                        @RequestParam MultipartFile img, @PathVariable("id") String id) {

        //유저 확인

        /*if (user == null)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "세션이 만료된 사용자입니다."));
        //url 중복 체크
        if (liveService.getLiveCheckUrlByUrl(liveRegisterInfo.getUrl())) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "방송 url이 중복됩니다"));
        }
        //db에 저장 및 생성
        else {
            liveService.CreateLive(liveRegisterInfo, user);
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "방 생성 성공"));
        }*/

        return null;
    }


}
