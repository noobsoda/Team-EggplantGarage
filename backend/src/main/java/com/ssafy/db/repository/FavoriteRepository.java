package com.ssafy.db.repository;

import com.ssafy.db.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Optional<List<Favorite>> findByUser_id(Long userId);
    Optional<List<Favorite>> findByLive_id(Long liveId);
    Optional<List<Favorite>> findByUser_idAndLive_id(Long userId, Long liveId);

}
