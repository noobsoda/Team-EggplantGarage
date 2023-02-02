package com.ssafy.api.service;

import com.ssafy.api.request.ReviewWritePostReq;
import com.ssafy.db.entity.Review;

import java.util.List;

public interface ReviewService {
    Review writeReview(ReviewWritePostReq review);
    List<Review> getSellerReviews(long sellerId);
    List<Review> getBuyerReviews(long buyerId);
}
