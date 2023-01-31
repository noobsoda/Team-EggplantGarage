package com.ssafy.db.repository;

import com.ssafy.db.entity.QProduct;
import com.ssafy.db.entity.QReview;
import com.ssafy.db.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;
import java.util.Optional;
@Repository
public class ReviewRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QReview qReview = QReview.review;
    QProduct qProduct = QProduct.product;

    public Optional<List<Review>> findByIsSellerTrue(long sellerId){
        List<Review> reviewList = jpaQueryFactory.selectFrom(qReview)
                .innerJoin(qReview.product, qProduct).on(qProduct.live.user.id.eq(sellerId))
                .where(qReview.isSeller.eq(true))
                .fetch();
        if(reviewList.isEmpty()) return Optional.empty();
        return Optional.ofNullable(reviewList);
    }
    public Optional<List<Review>> findByIsSellerFalse(long buyerId){
        List<Review> reviewList = jpaQueryFactory.selectFrom(qReview)
                .innerJoin(qReview.product, qProduct).on(qProduct.user.id.eq(buyerId))
                .where(qReview.isSeller.eq(false))
                .fetch();
        if(reviewList.isEmpty()) return Optional.empty();
        return Optional.ofNullable(reviewList);
    }
}

