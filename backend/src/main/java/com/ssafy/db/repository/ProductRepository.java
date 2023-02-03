package com.ssafy.db.repository;

import com.ssafy.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findById(long id);
    Optional<List<Product>> findByBuyerIdOrderByCreatedAtDesc(long buyerId);
    Optional<List<Product>> findByLive_IdOrderByCreatedAtDesc(long liveId);

}
