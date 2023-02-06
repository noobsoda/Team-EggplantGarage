package com.ssafy.api.controller;

import com.ssafy.api.request.*;
import com.ssafy.api.response.LiveContent;
import com.ssafy.api.response.LiveDetailGetRes;
import com.ssafy.api.response.LiveListGetRes;
import com.ssafy.api.service.FileService;
import com.ssafy.api.service.LiveService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;

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
    public ResponseEntity<? extends BaseResponseBody> postLiveCreate(@RequestBody @ApiParam(value = "방 생성 정보", required = true) LiveRegisterPostReq liveRegisterInfo,
                                                                     @PathVariable("email") String email) {

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
            liveService.CreateLive(liveRegisterInfo, user);
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "방 생성 성공"));
        }


    }

    @PostMapping("/save/img/{email}")
    @ApiOperation(value = "이미지 저장", notes = "이미지 DB 저장 후, idx 반환")
    public ResponseEntity<? extends BaseResponseBody> postSaveImg(MultipartFile img, @PathVariable("email") String email) {
        if (img.isEmpty()) {
            return ResponseEntity.status(204).body(BaseResponseBody.of(204, "이미지가 없습니다"));
        }
        Path path = fileService.fileSave(img);
        String thumbnailUrl = path.toString();
        //이메일로 아이디 찾고
        User user = userService.getUserByEmail(email);
        //그 아이디로 셀러 아이디 조회하고 해당 객체에 이미지 넣기
        if (liveService.postLiveByThumbnailUrl(user.getId(), thumbnailUrl)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "이미지 넣기 성공"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "해당 라이브가 없습니다"));

        }

    }

    @GetMapping("/detail")
    @ApiOperation(value = "방 상세정보 조회", notes = "방의 상세 정보와 유저 목록을 조회한다.")
    public ResponseEntity<LiveDetailGetRes> getLiveDetailInfo(@RequestBody HashMap<String, String> sessionMap) {
        String sessionId = sessionMap.get("sessionId");

        LiveDetailGetRes liveDetailGetRes = liveService.getLiveDetailBySessionId(sessionId);
        //상품도 추가로 보여주기

        return ResponseEntity.status(200).body(liveDetailGetRes);
    }

    //카테고리 넣기
    @PostMapping("/category/{email}")
    @ApiOperation(value = "방 카테고리 저장", notes = "방의 카테고리를 저장한다..")
    public ResponseEntity<? extends BaseResponseBody> postLiveCategory(@RequestBody @ApiParam(value = "방 생성 정보", required = true) LiveCategoriesReq liveCategoriesReq,
                                                                       @PathVariable("email") String email) {

        //이메일로 아이디 찾고
        User user = userService.getUserByEmail(email);

        if (liveService.postLiveByCategories(user.getId(), liveCategoriesReq)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "카테고리 넣기 성공"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "해당 라이브가 없습니다"));

        }
    }

    @GetMapping("/search")
    @ApiOperation(value = "방 검색 목록 조회", notes = "모든 방의 검색 목록을 조회한다")
    public ResponseEntity<LiveListGetRes> getLiveSearchListInfo(@RequestBody @ApiParam(value = "방 검색 정보", required = true) LiveAllInfoGetReq liveAllInfoGetReq) {
        List<LiveContent> liveContentList;
        //제목기준으로 방 목록 조회하기
        if(liveAllInfoGetReq.getTitle() == null){
            liveContentList = liveService.getLiveList("");
        }
        else{
            liveContentList = liveService.getLiveList(liveAllInfoGetReq.getTitle());
        }

        //카테고리 기준으로 방 목록 조회하기
        if(liveAllInfoGetReq.getCategory() != null && liveAllInfoGetReq.getCategory() != ""){
            liveContentList = liveService.searchCategoryLiveList(liveContentList, liveAllInfoGetReq.getCategory());
        }

        //위도 경도 기준 5km 이내 있는 라이브 조회
        if(liveAllInfoGetReq.getLatitude() == null || liveAllInfoGetReq.getLongitude() == null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        else if(liveAllInfoGetReq.getLatitude() != 0 && liveAllInfoGetReq.getLongitude() != 0){
            Location location = Location.builder()
                    .latitude(liveAllInfoGetReq.getLatitude())
                    .longitude(liveAllInfoGetReq.getLongitude())
                    .build();
            liveContentList = liveService.searchLocationLiveList(liveContentList, location);
        }




        if (liveContentList == null) {
            return ResponseEntity.status(404).body(null);
        } else {
            return ResponseEntity.status(200).body(LiveListGetRes.of(liveContentList));

        }

    }

    //참가자 조인
    @PostMapping("/userlive")
    @ApiOperation(value = "유저 방 참가", notes = "유저의 방 참가")
    public ResponseEntity<? extends BaseResponseBody> postLiveUserJoin(@RequestBody @ApiParam(value = "유저 참가 정보", required = true) LiveUserJoinReq LiveUserJoinReq) {


        if (liveService.postUserLiveByLiveId(LiveUserJoinReq)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "유저 참가 성공"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "해당 라이브나 유저가 없습니다"));
        }

    }

    @DeleteMapping("/userlive")
    @ApiOperation(value = "유저 방 퇴장", notes = "유저의 라이브 퇴장")
    public ResponseEntity<? extends BaseResponseBody> deleteLiveUserQuit(@RequestBody @ApiParam(value = "유저 참가 정보", required = true) LiveUserJoinReq LiveUserJoinReq) {


        if (liveService.deleteUserLiveByLiveId(LiveUserJoinReq)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "유저 라이브 나가기 성공"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "해당 라이브나 유저가 없습니다"));
        }

    }

    //라이브 종료
    @PatchMapping("/{liveid}")
    @ApiOperation(value = "라이브 끝내기", notes = "해당 라이브를 끝냅니다")
    public ResponseEntity<? extends BaseResponseBody> patchLiveEnd(@PathVariable("liveid") Long liveId) {

        //방 목록 조회하기
        if (liveService.patchLiveEndById(liveId)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "라이브를 성공적으로 끝냈습니다"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "해당 라이브나 유저가 없습니다"));
        }

    }


}

