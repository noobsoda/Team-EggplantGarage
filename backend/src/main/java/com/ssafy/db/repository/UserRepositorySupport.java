/*
package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QUser;
import com.ssafy.db.entity.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

*/
/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 *//*

@Repository
public class UserRepositorySupport {
    private JPAQueryFactory jpaQueryFactory;
    @Autowired
    public UserRepositorySupport(JPAQueryFactory jpaQueryFactory){
        this.jpaQueryFactory = jpaQueryFactory;
    }
    QUser qUser = QUser.user;

    public Optional<User> findUserById(String email) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.email.eq(email)).fetchOne();
        if (user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }
}
*/
