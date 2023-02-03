package com.ssafy.db.repository;

import com.ssafy.db.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Location, Integer> {
    Optional<List<Location>> findByLat(long lat);
    Optional<List<Location>> findByLng(long lng);
}
