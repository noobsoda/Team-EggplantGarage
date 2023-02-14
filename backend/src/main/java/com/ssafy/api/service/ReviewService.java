package com.ssafy.api.service;

import com.ssafy.api.request.ReviewWritePostReq;
import com.ssafy.api.response.ReviewRes;
import com.ssafy.db.entity.Review;

import java.util.List;

public interface ReviewService {
    boolean writeReview(ReviewWritePostReq review);
    List<ReviewRes> getSellerReviews(long sellerId);
    List<ReviewRes> getBuyerReviews(long buyerId);

    ReviewRes getReview(long id);
}
