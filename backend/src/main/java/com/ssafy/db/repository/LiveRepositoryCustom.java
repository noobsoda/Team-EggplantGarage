package com.ssafy.db.repository;

import com.ssafy.api.dto.params.LiveSearchCondition;
import com.ssafy.db.entity.Lives;
import com.ssafy.db.entity.Lives;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LiveRepositoryCustom {
    List<Lives> searchByPageLive(LiveSearchCondition liveSearchCondition, String order, Pageable pageable);

    List<Lives> listByHomeLive(Pageable pageable);

    List<Lives> categorizedByPageLive(String category, Pageable pageable);
}
