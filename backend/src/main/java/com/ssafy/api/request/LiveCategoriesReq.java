package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LiveCategoriesReq {
    private String sessionId;
    private List<LiveCategoryReq> liveCategoryReqList;
}
