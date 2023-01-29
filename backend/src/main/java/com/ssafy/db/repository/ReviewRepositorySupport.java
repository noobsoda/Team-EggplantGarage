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

    public Optional<List<Review>> findByProductLiveUserIdAndIsSellerTrue(long sellerId){
        List<Review> reviewList = jpaQueryFactory.select(qReview).from(qReview, qProduct)
                .where((qProduct.live.user.id.eq(sellerId)).and(qReview.product.id.eq(qProduct.id)).and((qReview.isSeller.eq(true)))).orderBy(qReview.createdAt.desc()).fetch();
        if(reviewList.isEmpty()) return Optional.empty();
        return Optional.ofNullable(reviewList);
    }
    public Optional<List<Review>> findByProductUserIdAndIsSellerFalse(long buyerId){
        List<Review> reviewList = jpaQueryFactory.select(qReview).from(qReview, qProduct)
                .where((qProduct.user.id.eq(buyerId)).and(qReview.product.id.eq(qProduct.id)).and((qReview.isSeller.eq(false)))).orderBy(qReview.createdAt.desc()).fetch();
        if(reviewList.isEmpty()) return Optional.empty();
        return Optional.ofNullable(reviewList);
    }

}

