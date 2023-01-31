package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Product;
import com.ssafy.db.entity.QProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ProductRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QProduct qProduct = QProduct.product;

    public Optional<Product> findById(long id) {
        Product product = jpaQueryFactory.select(qProduct).from(qProduct)
                .where(qProduct.id.eq(id)).fetchOne();
        if(product == null) return Optional.empty();
        return Optional.ofNullable(product);
    }

    public Optional<List<Product>> findByProductUserId(long buyerId) {
        List<Product> productList =
                jpaQueryFactory.selectFrom(qProduct)
                .where(qProduct.user.id.eq(buyerId))
                .fetch();
        if(productList.isEmpty()) return Optional.empty();
        return Optional.ofNullable(productList);
    }

    public Optional<List<Product>> findByProductLiveId(long liveId) {
        List<Product> productList =
                jpaQueryFactory.selectFrom(qProduct)
                        .where(qProduct.live.id.eq(liveId))
                        .fetch();
        if(productList.isEmpty()) return Optional.empty();
        return Optional.ofNullable(productList);
    }
}

