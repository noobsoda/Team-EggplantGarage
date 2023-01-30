package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Bundle;
import com.ssafy.db.entity.QBundle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public class BundleRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QBundle qBundle = QBundle.bundle;

//    public Optional<List<Bundle>> findAll(long bundle_id) {
////        List<Bundle> bundleList = jpaQueryFactory.select(qBundle).from(qBundle).fetch();
//        List<Bundle> bundleList = jpaQueryFactory
//                .selectFrom(qBundle)
//                .join(qBundle.id, bundle_id)
//                .where(qBundle.id.eq(bundle_id))
//                .fetch();
//
//        if(bundleList.size() == 0) return Optional.empty();
//        return Optional.ofNullable(bundleList);
//    }
    public Optional<Bundle> findById(long id) {
        Bundle bundle = jpaQueryFactory
                .select(qBundle)
                .from(qBundle)
                .where(qBundle.id.eq(id))
                .fetchOne();
        if(bundle == null) return Optional.empty();
        return Optional.ofNullable(bundle);
    }

}
