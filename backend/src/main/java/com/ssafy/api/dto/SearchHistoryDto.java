package com.ssafy.api.dto;

import com.ssafy.db.entity.SearchHistory;
import lombok.Data;

@Data
public class SearchHistoryDto {

    private Long id;

    private String name; // (검색어)

    private Integer score; // 처음 0 (검색 한 번 될 때마다 +1)

    public SearchHistoryDto(SearchHistory searchHistory) {
        this.id = searchHistory.getId();
        this.name = searchHistory.getName();
        this.score = searchHistory.getScore();

    }

}
