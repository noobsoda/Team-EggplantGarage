package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Live;
import com.ssafy.db.entity.Product;
import com.ssafy.db.entity.QLive;
import com.ssafy.db.entity.QProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class LiveRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QLive qLive = QLive.live;

    public Optional<List<Live>> findByLiveUserId(long sellerId) {
        List<Live> liveList = jpaQueryFactory.selectFrom(qLive)
                .where(qLive.user.id.eq(sellerId))
                .fetch();
        if(liveList.isEmpty()) return Optional.empty();
        return Optional.ofNullable(liveList);
    }
}