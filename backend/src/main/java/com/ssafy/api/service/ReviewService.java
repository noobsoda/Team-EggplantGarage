package com.ssafy.api.service;

import com.ssafy.api.request.ReviewWritePostReq;
import com.ssafy.db.entity.Review;

public interface ReviewService {
    Review writeReview(ReviewWritePostReq review);
}
