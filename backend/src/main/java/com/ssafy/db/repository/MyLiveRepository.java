package com.ssafy.db.repository;

import com.ssafy.db.entity.Lives;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MyLiveRepository extends JpaRepository<Lives, Long> {
    @Query("select count(l) from Lives l where l.user.name = :name")
    Long findCountByUser(@Param("name") Long name);

    @Query("select max(l.userCount) from Lives l where l.user.userSeq = :userSeq")
    Long findLiveMaxUser(@Param("userSeq") Long userSeq);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("delete from Lives l where l.live.id = :liveId")
    void deleteLives(@Param("liveId") Long liveId);

}
