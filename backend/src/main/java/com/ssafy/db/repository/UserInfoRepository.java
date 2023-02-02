package com.ssafy.db.repository;

import com.ssafy.db.entity.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    UserInfo findOneByUserSeq(Long )
}
