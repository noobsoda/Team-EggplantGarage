package com.ssafy.db.repository;

import com.ssafy.db.entity.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
    List<SearchHistory> findTop10ByOrderByScoreDescIdDesc();

    List<SearchHistory> findByName(String name);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("update SearchHistory s set s.score = s.score - s.score / s.noSearch - 1 where s.score > 0" +
            "and s.noSearch >= 2")
    void updateScore();

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("update SearchHistory s set s.noSearch = s.noSearch + 1")
    void updateNoSearch();

    @Query("select count(s) from SearchHistory s")
    Integer getCountAll();

    @Query("select count(s) from SearchHistory s where s.score < 0")
    Integer getCountLiZero();

    void deleteByScoreLessThan(Integer score);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("updated SearchHistory s set.score = s.score + 10")
    void updateDailyName();
}
