package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CategoryResponse")
public class CategoryRes {
    Long live_id;
    String category_id;
}
