package com.ssafy.api.controller;

import com.ssafy.api.request.ReviewWritePostReq;
import com.ssafy.api.service.ReviewService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Review;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "리뷰 API", tags = {"Review."})
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    private final Logger logger;

    @Autowired
    public ReviewController(Logger logger) {
        this.logger = logger;
    }

    @Autowired
    ReviewService reviewService;

    @PostMapping()
    @ApiOperation(value = "리뷰 생성", notes = "리뷰를 등록합니다.")
    @ApiResponses({@ApiResponse(code = 201, message = "생성 성공"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<? extends BaseResponseBody> writeReview(@RequestBody @ApiParam(value = "리뷰 정보", required = true) ReviewWritePostReq reviewWriteInfo) {

        Review review = reviewService.writeReview(reviewWriteInfo);

        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Created"));
    }
}
