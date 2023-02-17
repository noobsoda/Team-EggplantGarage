package com.ssafy.db.repository;

import com.ssafy.db.entity.Bundle;
import com.ssafy.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BundleRepository extends JpaRepository<Bundle, Long> {
    Optional<Bundle> findById(long id);

    List<Bundle> findAllByLive_IdAndIsRefuseFalseAndIsApprovalFalseAndIsCancelFalse(long id);

    List<Bundle> findAllByLive_IdAndUserIdAndIsApprovalTrueAndIsPaidFalse(long id, long userId);

    List<Bundle> findAllByLive_IdAndUserIdAndIsApprovalTrueAndIsPaidTrue(long id, long userId);

    List<Bundle> findAllByLive_IdAndUserIdAndIsRefuseFalseAndIsApprovalFalseAndIsCancelFalse(long liveId, long userId);

    List<Bundle> findAllByLive_IdAndUserIdAndIsRefuseTrue(long id, long userId);
}
