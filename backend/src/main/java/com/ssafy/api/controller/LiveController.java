package com.ssafy.api.controller;

import com.ssafy.api.request.LiveRegisterPostReq;
import com.ssafy.api.response.LiveDetailGetRes;
import com.ssafy.api.service.FileService;
import com.ssafy.api.service.LiveService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Live;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
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
    private final FileService fileService;

    @Autowired
    public LiveController(Logger logger, UserService userService, LiveService liveService, FileService fileService) {
        this.logger = logger;
        this.userService = userService;
        this.liveService = liveService;
        this.fileService = fileService;
    }

    @PostMapping("/{email}")
    @ApiOperation(value = "방 생성", notes = "방을 생성한다.")
    @ApiResponses({@ApiResponse(code = 201, message = "Created"), @ApiResponse(code = 401, message = "만료됨"), @ApiResponse(code = 403, message = "인증 실패"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<? extends BaseResponseBody> postLiveCreate(@ApiParam(value = "방 생성 정보", required = true) LiveRegisterPostReq liveRegisterInfo,
        MultipartFile img, @PathVariable("email") String email) {

        Path path = fileService.fileSave(img);
        String thumbnailUrl = path.toString();

        //유저 확인
        User user = userService.getUserByEmail(email);
        if (user == null)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "세션이 만료된 사용자입니다."));
        //url 중복 체크
        if (liveService.getLiveCheckUrlByUrl(liveRegisterInfo.getUrl())) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "방송 url이 중복됩니다"));
        }
        //db에 저장 및 생성
        else {
            liveService.CreateLive(liveRegisterInfo, user, thumbnailUrl);
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "방 생성 성공"));
        }


    }
    @GetMapping("/detail")
    @ApiOperation(value = "방 상세정보 조회", notes = "방의 상세 정보와 유저 목록을 조회한다.")
    public ResponseEntity<LiveDetailGetRes> getLiveDetailInfo(@RequestBody HashMap<String, String> urlMap){
        String url = urlMap.get("url");

        LiveDetailGetRes liveDetailGetRes = liveService.getLiveDetailByUrl(url);

        logger.info("msg:{}", liveDetailGetRes);

        /*LiveDetailGetRes liveDetailGetRes = LiveDetailGetRes.builder()

                .build();*/

        return ResponseEntity.status(200).body(liveDetailGetRes);
    }


}
