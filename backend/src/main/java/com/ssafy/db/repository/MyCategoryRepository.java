package com.ssafy.db.repository;

import com.ssafy.db.entity.MyCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MyCategoryRepository extends JpaRepository<MyCategory, Long> {

    List<MyCategory> findAllBySort(String sort);
}
