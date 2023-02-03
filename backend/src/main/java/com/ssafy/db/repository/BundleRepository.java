package com.ssafy.db.repository;

import com.ssafy.db.entity.Bundle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BundleRepository extends JpaRepository<Bundle, Long> {
    Optional<Bundle> findById(long id);
    Optional<List<Bundle>> findAllByLive_IdAndIsRefuseFalseAndIsApprovalFalse(long id);
    void deleteBundleById(long id);
}
