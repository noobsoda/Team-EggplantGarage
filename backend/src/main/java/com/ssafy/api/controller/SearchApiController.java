package com.ssafy.api.controller;

import com.ssafy.api.service.MySearchService;
import com.ssafy.db.entity.SearchHistory;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import com.ssafy.api.service.MyLiveService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@Api(tags = "검색 관련 API")
public class SearchApiController {
    private final MySearchService searchService;

    private final MyLiveService liveService;

    @GetMapping("/home/search")
    @ApiOperation(value = "해당 키워드로 라이브 검색하기", notes = "")
    public ResponseEntity<?> searchLive(@RequestParam String name,
                                        @PageableDefault(size = 1000, sort = "title", direction = Sort.Direction.ASC) Pageable pageable) {
        SearchHistory searchHistory = new SearchHistory(null, "라이브", 0);
        searchService.addScoreNum(searchHistory);


    }
}
