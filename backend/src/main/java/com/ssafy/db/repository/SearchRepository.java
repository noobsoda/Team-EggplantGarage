package com.ssafy.db.repository;

import com.ssafy.db.repository.*;
import com.ssafy.db.entity.Lives;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SearchRepository extends JpaRepository<Lives, Long> {
    // 라이브 조회
    Optional<Lives> findById(long id);
}
