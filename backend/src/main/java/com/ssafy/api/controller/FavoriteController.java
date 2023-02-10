package com.ssafy.api.controller;

import com.ssafy.api.request.FavoriteDeleteReq;
import com.ssafy.api.request.FavoritePostReq;
import com.ssafy.api.response.FavoriteGetInfo;
import com.ssafy.api.response.FavoriteIsFavoritePostRes;
import com.ssafy.api.response.FavoriteLiveGetRes;
import com.ssafy.api.response.LiveContent;
import com.ssafy.api.service.FavoriteService;
import com.ssafy.api.service.LiveService;
import com.ssafy.common.error.ErrorCode;
import com.ssafy.common.exception.CustomException;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.model.response.CommonResponse;
import com.ssafy.common.model.response.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(value = "찜 API", tags = {"Favorite."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final LiveService liveService;
    private final ResponseService responseService;

    //찜하기 추가
    @PostMapping()
    @ApiOperation(value = "찜 추가", notes = "유저가 찜 버튼을 눌렀을 때 찜 테이블에 추가한다.")
    public CommonResponse postFavoriteInfo(@RequestBody @ApiParam(value = "찜 정보", required = true) FavoritePostReq favoritePostInfo) {
        favoriteService.postFavorite(favoritePostInfo);
        return responseService.getSuccessResponse(200, "찜 넣기 성공");

    }

    //찜 조회
    @GetMapping("{userId}")
    @ApiOperation(value = "찜 목록 조회", notes = "유저가 찜한 모든 라이브들을 조회한다.")
    public ResponseEntity<FavoriteLiveGetRes> getFavoriteInfo(@PathVariable @ApiParam(value = "유저 ID 정보", required = true) Long userId) {
        if (userId == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        //전체 방 목록 받아오기
        List<LiveContent> liveContentList = liveService.getLiveListByTitle("");

        //유저가 찜한 라이브 아이디 구해오기
        List<FavoriteGetInfo> favoriteGetInfoList = favoriteService.getFavoriteLiveByUserId(userId);

        //라이브 아이디와 똑같은 방 목록만 빼오기
        liveContentList = favoriteService.getFavoriteLive(liveContentList, favoriteGetInfoList);


        return ResponseEntity.status(200).body(FavoriteLiveGetRes.of(liveContentList));
    }

    //찜하기 삭제
    @DeleteMapping()
    @ApiOperation(value = "찜 삭제", notes = "유저가 선택한 라이브의 찜을 삭제한다.")
    public CommonResponse deleteFavoriteInfo(@RequestBody @ApiParam(value = "찜 정보", required = true) FavoriteDeleteReq favoriteDeleteInfo) {
        if (favoriteDeleteInfo.getUserId() == null || favoriteDeleteInfo.getLiveId() == null) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        favoriteService.deleteFavorite(favoriteDeleteInfo.getUserId(), favoriteDeleteInfo.getLiveId());
        return responseService.getSuccessResponse(200, "찜 삭제 성공");


    }

    @PostMapping("/detail")
    @ApiOperation(value = "찜 여부 확인", notes = "유저가 선택한 라이브가 찜이 되있는지 확인한다..")
    public ResponseEntity<FavoriteIsFavoritePostRes> postFavoriteDetailInfo(@RequestBody @ApiParam(value = "찜 정보 여부", required = true) FavoritePostReq favoritePostInfo) {
        if (favoritePostInfo.getUserId() == null || favoritePostInfo.getLiveId() == null) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        favoriteService.postFavoriteIsFavorite(favoritePostInfo.getUserId(), favoritePostInfo.getLiveId());
        return ResponseEntity.status(200).body(FavoriteIsFavoritePostRes.of(true));

        //라이브 아디나 유저 아이디가 아예 없는 경우 예외 처리 할것


    }


}
