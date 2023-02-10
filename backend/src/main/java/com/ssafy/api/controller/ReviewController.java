package com.ssafy.api.controller;

import com.ssafy.api.request.ReviewWritePostReq;
import com.ssafy.api.response.ReviewRes;
import com.ssafy.api.service.ReviewService;
import com.ssafy.common.model.response.CommonResponse;
import com.ssafy.common.model.response.ResponseService;
import com.ssafy.db.entity.Review;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.omg.CORBA.COMM_FAILURE;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "리뷰 API", tags = {"Review."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    private final Logger logger;

    ReviewService reviewService;

    ResponseService responseService;

    @PostMapping()
    @ApiOperation(value = "리뷰 생성", notes = "리뷰를 등록합니다.")
    @ApiResponses({@ApiResponse(code = 201, message = "생성 성공"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<? extends CommonResponse> writeReview(@RequestBody @ApiParam(value = "리뷰 정보", required = true) ReviewWritePostReq reviewWriteInfo) {
        Review review = reviewService.writeReview(reviewWriteInfo);
        return ResponseEntity.status(201).body(responseService.getSuccessResponse(201, "리뷰 생성 성공"));
    }

    @GetMapping("/seller/{sellerId}")
    @ApiOperation(value = "판매자 리뷰 조회", notes = "판매자 리뷰 정보를 응답한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "리뷰 없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<ReviewRes>> getReviewBySellerId(@ApiParam(value = "판매자 id", required = true) @PathVariable("sellerId") long sellerId) {

        List<ReviewRes> resList = reviewService.getSellerReviews(sellerId);

        return ResponseEntity.status(200).body(resList);
    }

    @GetMapping("/buyer/{buyerId}")
    @ApiOperation(value = "구매자 리뷰 조회", notes = "구매자 리뷰 정보를 응답한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "리뷰 없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<ReviewRes>> getReviewBuyerId(@ApiParam(value = "구매자 id", required = true) @PathVariable("buyerId") long buyerId) {

        List<ReviewRes> resList = reviewService.getBuyerReviews(buyerId);

        return ResponseEntity.status(200).body(resList);
    }

    @GetMapping("/{reviewId}")
    @ApiOperation(value = "리뷰 1건 조회", notes = "1건의 리뷰 정보를 응답한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "리뷰 없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<ReviewRes> getReview(@ApiParam(value = "리뷰 id", required = true) @PathVariable("reviewId") long reviewId) {

        ReviewRes res = reviewService.getReview(reviewId);

        return ResponseEntity.status(200).body(res);
    }
}
