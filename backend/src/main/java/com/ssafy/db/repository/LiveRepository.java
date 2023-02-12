package com.ssafy.db.repository;

import com.ssafy.db.entity.Live;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LiveRepository extends JpaRepository<Live, Long> {

    List<Live> findAllByTitleContains(String title);
    Optional<Live> findById(Long id);
    Optional<Live> findBySessionId(String sessionId);
    List<Live> findAllByUser_Id(Long sellerId);
    List<Live> findByIsLiveFalseAndUser_IdOrderByCreatedAtDesc(long sellerId);
    // 종료된 라이브 중 해당 판매자가 방송했던 라이브 목록을 라이브 등록 최신순으로 반환
    List<Live> findAllById(Long liveId);
}
