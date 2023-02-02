package com.ssafy.api.service;

import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
//

@Service
@RequiredArgsConstructor
public class MySearchService {

    private final MyCategoryRepository categoryRepository;

    private final SearchHistoryRepository searchHistoryRepository;

    private final SearchRepository searchRepository;

    public List<Lives> categoryLives(String category, Pageable pageable) {
        if (category.equals("인기")) {
            return SearchRepository.searchNoConditionByPageLive(pageable);
        }
        List<MyCategory> categorylist = categoryRepository.findAllBySort(category);
    }

    @Transactional
    public void addScoreNum(SearchHistory searchHistory) {
        List<SearchHistory> searchHistoryList = searchHistoryRepository.findByName(searchHistory.getName().trim());
        if (searchHistory != null & searchHistoryList.size() != 0) {
            for (SearchHistory findHistory : searchHistoryList.size() != 0) {
                findHistory.setScore(findHistory.getScore() + 10);
                searchHistoryRepository.save(findHistory);
                return;
            }
        }
    }

    searchHistory.setScore(10);
    searchHistoryRepository.save(searchHistory);

    // 카테고리 분류 라이브 (나중에 이동)
    public List<Lives> categoryLive(String category, Pageable pageable) {
        if (category.equals("지금핫한")) {
            return searchLiveRepository.listByHomeLives(pageable);
        }
        List<MyCategory> categoryList = categoryRepository.findAllBySort(category);
        List<Long> categoryIdList = new ArrayList<>();
        for (MyCategory nowCategory : categoryList) {
            categoryIdList.add(nowCategory.getCategoryId());
        }
        return searchRepository.categorizedByPageSimplePlayroom(category, pageable);
    }

    // 쿼리 변경 필요
    List<Lives> liveList = searchRepository.findDistinctByVideoId(pageable);

    List<Lives> result = new ArrayList<>();

    for (Lives lives : liveList) {
        if (categoryIdList.contains(Long.valueOf(videogetCategoryId))) {
            result.add(live);
        }
    }

    return result;

    }
}
