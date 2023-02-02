package com.ssafy.api.service.list;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class CategoryList {

    public static final Map<Integer, String> CATEGORY_LIST = createCategoryList();

    private static Map<Integer, String> createCategoryList() {
        Map<Integer, String> result = new HashMap<>();
        result.put(0, "인기");
        result.put(1, "디지털기기");
        result.put(2, "생활가전");
        result.put(3, "가구");
        result.put(4, "생활/주방");
        result.put(5, "유아용품");
        result.put(6, "유아도서");
        result.put(7, "여성의류");
        result.put(8, "여성잡화");
        result.put(9, "남성의류");
        result.put(10, "남성잡화");
        result.put(11, "뷰티/미용");
        result.put(12, "스포츠");
        result.put(13, "취미/게임");
        result.put(14, "음반");
        result.put(15, "도서");
        result.put(16, "티켓");
        result.put(17, "반려동물");
        result.put(18, "식물");
        result.put(19, "기타");
        return Collections.unmodifiableMap(result);


    }
}
