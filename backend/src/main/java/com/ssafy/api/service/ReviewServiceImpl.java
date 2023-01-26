package com.ssafy.api.service;

import com.ssafy.api.request.ReviewWritePostReq;
import com.ssafy.db.entity.Review;
import com.ssafy.db.repository.ReviewRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("reviewService")
public class ReviewServiceImpl implements ReviewService{
    private final Logger logger;

    public ReviewServiceImpl(Logger logger) {
        this.logger = logger;
    }

    @Autowired
    ReviewRepository reviewRepository;

    @Override
    public Review writeReview(ReviewWritePostReq reviewWriteInfo) {
        Review review = new Review();
        review.setProduct_id(reviewWriteInfo.getProduct_id());
        review.setContent(reviewWriteInfo.getContent());
        review.setScore(reviewWriteInfo.getScore());
        review.set_seller(reviewWriteInfo.is_seller());
        review.set_visible(reviewWriteInfo.is_visible());
        return reviewRepository.save(review);
    }
}
