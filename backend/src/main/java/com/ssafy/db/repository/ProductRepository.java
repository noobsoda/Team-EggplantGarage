package com.ssafy.db.repository;

import com.ssafy.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findById(long id);
    Optional<List<Product>> findByIsPaidTrueAndBuyerIdOrderByCreatedAtDesc(long buyerId);
    // 결제가 완료된 상품 중 해당 구매자자 구매한 상품을 상품 등록 최신순으로 반환
    Optional<List<Product>> findByIsPaidTrueAndLive_IdOrderByCreatedAtDesc(long liveId);
    // 결제가 완료된 상품 중 해당 라이브에서 판매된 상품을 상품 등록 최신순으로 반환
    Optional<List<Product>> findByLive_Id(long liveId);
    // 해당 라이브에 등록된 상품 반환

}
