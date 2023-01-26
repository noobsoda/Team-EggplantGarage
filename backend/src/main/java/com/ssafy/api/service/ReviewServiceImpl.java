package com.ssafy.api.service;

import com.ssafy.api.request.ReviewWritePostReq;
import com.ssafy.db.entity.Review;
import com.ssafy.db.repository.ReviewRepository;
import com.ssafy.db.repository.ReviewRepositorySupport;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("reviewService")
public class ReviewServiceImpl implements ReviewService{
    private final Logger logger;

    public ReviewServiceImpl(Logger logger) {
        this.logger = logger;
    }

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ReviewRepositorySupport reviewRepositorySupport;

    @Override
    public Review writeReview(ReviewWritePostReq reviewWriteInfo) {
        Review review = new Review();
        review.setProductId(reviewWriteInfo.getProductId());
        review.setContent(reviewWriteInfo.getContent());
        review.setScore(reviewWriteInfo.getScore());
        review.setSeller(reviewWriteInfo.isSeller());
        review.setVisible(reviewWriteInfo.isVisible());
        return reviewRepository.save(review);
    }

    @Override
    public Review getReviewByProductId(long productId) {
        Review review = reviewRepositorySupport.findReviewByProductId(productId).get();
        return review;
    }

    @Override
    public List<Review> getReviewByIsSeller(long sellerId) {
        List<Review> reviewList = reviewRepositorySupport.findReviewByIsSeller(sellerId).get();
        return reviewList;
    }
}
