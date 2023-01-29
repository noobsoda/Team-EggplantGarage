package com.ssafy.db.repository;

import com.ssafy.db.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<List<Review>> findByProductLiveUserIdAndIsSellerTrue(long sellerId);

    Optional<List<Review>> findByProductUserIdAndIsSellerFalse(long buyerId);
}
