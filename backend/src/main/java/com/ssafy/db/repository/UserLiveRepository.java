package com.ssafy.db.repository;

import com.ssafy.db.entity.UserLive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserLiveRepository extends JpaRepository<UserLive, Long> {
    List<UserLive> findAllByUser_idAndLive_id(Long userId, Long liveId);
    List<UserLive> findAllByLive_id(Long liveId);

}
