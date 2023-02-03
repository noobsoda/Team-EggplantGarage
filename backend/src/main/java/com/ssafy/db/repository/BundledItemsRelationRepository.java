package com.ssafy.db.repository;

import com.ssafy.db.entity.BundledItemsRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BundledItemsRelationRepository extends JpaRepository<BundledItemsRelation, Long> {
    Optional<List<BundledItemsRelation>> findAllByBundle_Id(Long id);
    void deleteAllByBundle_Id(Long id);
}
