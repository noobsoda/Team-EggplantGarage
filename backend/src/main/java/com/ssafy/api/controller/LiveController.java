package com.ssafy.api.controller;

import com.ssafy.api.request.LiveRegisterPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.LiveService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpSession;
import java.util.HashMap;

/**
 * 라이브 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "라이브 API", tags = {"Live"})
@RestController
@RequestMapping("/api/v1/lives")
public class LiveController {
    private final Logger logger;
    private final UserService userService;
    private final LiveService liveService;

    @Autowired
    public LiveController(Logger logger, UserService userService, LiveService liveService) {
        this.logger = logger;
        this.userService = userService;
        this.liveService = liveService;
    }

    @PostMapping("")
    @ApiOperation(value = "방 생성", notes = "방을 생성한다.")
    @ApiResponses({@ApiResponse(code = 201, message = "Created"), @ApiResponse(code = 401, message = "만료됨"), @ApiResponse(code = 403, message = "인증 실패"),  @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<? extends BaseResponseBody> getCategoryInfo(@RequestBody @ApiParam(value = "방 생성 정보", required = true) LiveRegisterPostReq liveRegisterInfo,
         @ApiIgnore Authentication authentication, HttpSession session, @RequestParam @RequestPart(value = "image", required = true)MultipartFile img) {

        BaseResponseBody baseResponseBody = new BaseResponseBody();

        // multipartfile 변수는 form과 일치시켜 준다. 여러장을 넣고싶으면 arraylist필요
        String realPath = session.getServletContext().getRealPath("/save");
        System.out.println(realPath);

        String thumbnailUrl = img.getOriginalFilename();



        //유저 확인
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);
        if (user == null) baseResponseBody.of(401, "세션이 만료된 사용자입니다.");
        else {
            //url 중복 체크
            if (liveService.getLiveByUrl(liveRegisterInfo.getUrl())) baseResponseBody.of(409, "방송 url이 중복됩니다");
                //db에 저장 및 생성
            else {
                liveService.CreateLive(liveRegisterInfo, user, thumbnailUrl);
                baseResponseBody.of(201, "방 생성 성공");
            }
        }

        return ResponseEntity.status(baseResponseBody.getStatusCode()).body(baseResponseBody);



    }

}
