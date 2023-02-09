package com.ssafy.api.controller;

import com.ssafy.api.request.FavoriteDeleteReq;
import com.ssafy.api.request.FavoritePostReq;
import com.ssafy.api.response.FavoriteGetInfo;
import com.ssafy.api.response.FavoriteIsFavoritePostRes;
import com.ssafy.api.response.FavoriteLiveGetRes;
import com.ssafy.api.response.LiveContent;
import com.ssafy.api.service.FavoriteService;
import com.ssafy.api.service.LiveService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(value = "찜 API", tags = {"Favorite."})
@RestController
@RequestMapping("/api/v1/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final LiveService liveService;

    @Autowired
    public FavoriteController(FavoriteService favoriteService, LiveService liveService) {
        this.favoriteService = favoriteService;
        this.liveService = liveService;
    }

    //찜하기 추가
    @PostMapping()
    @ApiOperation(value = "찜 추가", notes = "유저가 찜 버튼을 눌렀을 때 찜 테이블에 추가한다.")
    public ResponseEntity<? extends BaseResponseBody> postFavoriteInfo(@RequestBody @ApiParam(value = "찜 정보", required = true) FavoritePostReq favoritePostInfo) {
        if (favoriteService.postFavorite(favoritePostInfo)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "찜 넣기 성공"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "해당 유저나 라이브가 없습니다"));
        }

    }

    //찜 조회
    @GetMapping("{userId}")
    @ApiOperation(value = "찜 목록 조회", notes = "유저가 찜한 모든 라이브들을 조회한다.")
    public ResponseEntity<FavoriteLiveGetRes> getFavoriteInfo(@PathVariable @ApiParam(value = "유저 ID 정보", required = true) Long userId) {
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
    public ResponseEntity<? extends BaseResponseBody> deleteFavoriteInfo(@RequestBody @ApiParam(value = "찜 정보", required = true) FavoriteDeleteReq favoriteDeleteInfo) {
        if (favoriteService.deleteFavorite(favoriteDeleteInfo.getUserId(), favoriteDeleteInfo.getLiveId())) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "찜 삭제 성공"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "해당 유저나 라이브가 없습니다"));

        }


    }

    @PostMapping("/detail")
    @ApiOperation(value = "찜 여부 확인", notes = "유저가 선택한 라이브가 찜이 되있는지 확인한다..")
    public ResponseEntity<FavoriteIsFavoritePostRes> postFavoriteDetailInfo(@RequestBody @ApiParam(value = "찜 정보 여부", required = true) FavoritePostReq favoritePostInfo) {
        if (favoriteService.postFavoriteIsFavorite(favoritePostInfo.getUserId(), favoritePostInfo.getLiveId())) {
            return ResponseEntity.status(200).body(FavoriteIsFavoritePostRes.of(true));
        } else {
            return ResponseEntity.status(404).body(FavoriteIsFavoritePostRes.of(false));
        }


    }


}
