package com.ssafy.api.controller;

import com.ssafy.api.dto.LiveCategoryDto;
import com.ssafy.api.service.*;
import com.ssafy.api.service.MyLiveService;
import com.ssafy.api.service.UserService;
import com.ssafy.api.service.list.CategoryListWord;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.Lives;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "라이브 카테고리 관련 APIs")
public class LiveCategoryApiController {

    private final MyLiveService liveService;

    private final JwtTokenUtil jwtTokenUtil;

    private final MySearchService searchService;

    private final UserService userService;
//    private final UserInfoService userInfoService;

    // Category별 라이브 검색
    @GetMapping("/home/category/{categoryName}")
    @ApiOperation(value = "카테고리 이름을 통해 라이브쇼를 검색합니다.", notes = "")
    public ResponseEntity categoryLiveshow(@PathVariable("categoryName") String categoryName,
                                           @PageableDefault(size = 50, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
                                          HttpServletRequest request) {
        // 카테고리 분류
        String category = CategoryListWord.CATEGORY_LIST_WORD.getOrDefault(categoryName, "인기");

        // 회원, 비회원(유효하지 않은 토큰) 구분
        String token = request.getHeader("Authorization");
        List<Lives> lives = new ArrayList<>();
        if (token == null || !jwtTokenUtil.validateToken(token)) {
            List<Lives> livesList = searchService.liveCategoryApiController(category, pageable);

            List<LiveCategoryDto> response = lives.stream().map(x -> new LiveCategoryDto((x)).collect(Collectors.toList()));

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            Long useSeq = jwtTokenUtil.getUserSeq(token);
            List<Lives> playrooms = searchService.categoryLive(category, pageable);
            List<LiveCategoryDto> response = new ArrayList<>();
            }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


//    }

    @GetMapping("/lives/{conferenceId}/usercount")
    @ApiOperation(value = "라이브쇼 유저 수를 가져옵니다.", notes = "")
    public ResponseEntity categoryLive(@PathVariable("liveId") Long liveId) {
        Lives lives = liveService.getLiveList(liveId);
        if (lives == null || lives.getUser() == null) return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

        return ResponseEntity.status(HttpStatus.OK).body(lives.getUser().size());
    }


}
