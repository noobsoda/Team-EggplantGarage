package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Bundle;
import com.ssafy.db.entity.QBundle;
import com.ssafy.db.entity.QBundledItemsRelation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BundleRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QBundle qBundle = QBundle.bundle;
    QBundledItemsRelation qBundledItemsRelation = QBundledItemsRelation.bundledItemsRelation;

    public Optional<List<Bundle>> findBundleListById(long id) {
        List<Bundle> bundleList = jpaQueryFactory
                .selectFrom(qBundle)
                .innerJoin(qBundledItemsRelation.bundle, qBundle)
                .where(qBundle.id.eq(id))
                .fetch();

        if(bundleList.size() == 0) return Optional.empty();
        return Optional.ofNullable(bundleList);
    }

//    public Optional<Bundle> findById(long id) {
//        Bundle bundle = jpaQueryFactory
//                .select(qBundle)
//                .from(qBundle)
//                .where(qBundle.id.eq(id))
//                .fetchOne();
//        if(bundle == null) return Optional.empty();
//        return Optional.ofNullable(bundle);
//    }

}
