package com.ssafy.api.service;

import com.ssafy.api.request.ReviewWritePostReq;
import com.ssafy.db.entity.Review;

import java.util.List;

public interface ReviewService {
    Review writeReview(ReviewWritePostReq review);
    Review getReviewByProductId(long productId);
    List<Review> getReviewByIsSeller(long sellerId);
}
