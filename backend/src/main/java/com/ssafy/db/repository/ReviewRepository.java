package com.ssafy.db.repository;

import com.ssafy.db.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<List<Review>> findByProduct_Live_User_IdAndIsSellerTrueOrderByCreatedAtDesc(long sellerId);
    Optional<List<Review>> findByProduct_User_IdAndIsSellerFalseOrderByCreatedAtDesc(long buyerId);
    Optional<Review> findOneByProduct_IdAndIsSellerTrue(long productId);
    Optional<Review> findOneByProduct_IdAndIsSellerFalse(long productId);
    Optional<Review> findOById(long id);
}
