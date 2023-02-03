package com.ssafy.api.service;

import com.ssafy.api.request.ReviewWritePostReq;
import com.ssafy.api.response.ReviewRes;
import com.ssafy.db.entity.Product;
import com.ssafy.db.entity.Review;
import com.ssafy.db.repository.ProductRepository;
import com.ssafy.db.repository.ReviewRepository;
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
    ProductRepository productRepository;

    @Override
    public Review writeReview(ReviewWritePostReq reviewWriteInfo) {
        Product product = productRepository.findById(reviewWriteInfo.getProductId()).get();

        Review review = Review.builder()
                .product(product)
                .content(reviewWriteInfo.getContent())
                .score(reviewWriteInfo.getScore())
                .isSeller(reviewWriteInfo.isSeller())
                .isVisible(reviewWriteInfo.isVisible())
                .build();
        return reviewRepository.save(review);
    }

    @Override
    public List<ReviewRes> getSellerReviews(long sellerId) {
        List<Review> reviewList = reviewRepository.findByProduct_Live_User_IdAndIsSellerTrueOrderByCreatedAtDesc(sellerId).get();
        return ReviewRes.of(reviewList);
    }

    @Override
    public List<ReviewRes> getBuyerReviews(long buyerId) {
        List<Review> reviewList = reviewRepository.findByProduct_BuyerIdAndIsSellerFalseOrderByCreatedAtDesc(buyerId).get();
        return ReviewRes.of(reviewList);
    }

    @Override
    public ReviewRes getReview(long id) {
        Review review = reviewRepository.findOById(id).get();
        return ReviewRes.of(review);
    }
}
