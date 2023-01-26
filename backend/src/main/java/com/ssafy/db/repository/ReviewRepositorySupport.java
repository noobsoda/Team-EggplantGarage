package com.ssafy.db.repository;

import com.ssafy.db.entity.QReview;
import com.ssafy.db.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Optional;
@Repository
public class ReviewRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QReview qReview = QReview.review;

    public Optional<Review> findReviewByProductId(long id) {
        Review review = jpaQueryFactory.select(qReview).from(qReview)
                .where(qReview.id.eq(id)).fetchOne();
        if(review == null) return Optional.empty();
        return Optional.ofNullable(review);
    }
}

