package com.ssafy.api.service.list;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class CategoryListWord {

    public static final Map<String, String> CATEGORY_LIST_WORD = createCategoryListWord();

    private static Map<String, String> createCategoryListWord() {
        Map<String, String> result = new HashMap<>();
        result.put("popular", "인기");
        result.put("digital", "디지털기기");
        result.put("appliance", "생활가전");
        result.put("furniture", "가구");
        result.put("living", "생활/주방");
        result.put("babyProducts", "유아용품");
        result.put("babyBook", "유아도서");
        result.put("Women'sClothing", "여성의류");
        result.put("miscellaneousGoodsForWomen", "여성잡화");
        result.put("Men'sClothing", "남성의류");
        result.put("miscellaneousGoodsForMen", "남성잡화");
        result.put("Beauty", "뷰티/미용");
        result.put("Sports", "스포츠");
        result.put("hobby/game", "취미/게임");
        result.put("records", "음반");
        result.put("books", "도서");
        result.put("tickets", "티켓");
        result.put("pets", "반려동물");
        result.put("plants", "식물");
        result.put("etc", "기타");
        return Collections.unmodifiableMap(result);
    }
}
