package com.ssafy.api.service;

import com.ssafy.api.request.ReviewWritePostReq;
import com.ssafy.db.entity.Product;
import com.ssafy.db.entity.Review;
import com.ssafy.db.repository.ProductRepository;
import com.ssafy.db.repository.ProductRepositorySupport;
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
    ProductRepository productRepository;

    @Autowired
    ReviewRepositorySupport reviewRepositorySupport;

    @Autowired
    ProductRepositorySupport productRepositorySupport;

    @Override
    public Review writeReview(ReviewWritePostReq reviewWriteInfo) {
        Review review = new Review();
        Product product = productRepository.findById(reviewWriteInfo.getProductId()).get();

        review.setProduct(product);
        review.setContent(reviewWriteInfo.getContent());
        review.setScore(reviewWriteInfo.getScore());
        review.setSeller(reviewWriteInfo.isSeller());
        review.setVisible(reviewWriteInfo.isVisible());
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getSellerReviews(long sellerId) {
        List<Review> reviewList = reviewRepositorySupport.findReviewBySellerId(sellerId).get();
        return reviewList;
    }

    @Override
    public List<Review> getBuyerReviews(long buyerId) {
        List<Review> reviewList = reviewRepositorySupport.findReviewByBuyerId(buyerId).get();
        return reviewList;
    }
}
