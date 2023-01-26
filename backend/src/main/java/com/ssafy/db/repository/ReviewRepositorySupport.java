package com.ssafy.db.repository;

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

    public Optional<Review> findReviewByProductId(long ProductId) {
        Review review = jpaQueryFactory.select(qReview).from(qReview)
                .where(qReview.productId.eq(ProductId)).fetchOne();
        if(review == null) return Optional.empty();
        return Optional.ofNullable(review);
    }

    public Optional<List<Review>> findReviewByIsSeller(long sellerId){
        List<Review> reviewList = jpaQueryFactory.select(qReview).from(qReview)
                .where(qReview.isSeller.eq(true)).orderBy(qReview.createdAt.desc()).fetch();
        if(reviewList.isEmpty()) return Optional.empty();
        return Optional.ofNullable(reviewList);
    }
}

