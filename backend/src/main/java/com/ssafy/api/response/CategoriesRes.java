package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("CategoriesResponse")
public class CategoriesRes {
    List<CategoryRes> categoriesRes;

    public static CategoriesRes of(List<CategoryRes> categoriesRes){
        CategoriesRes res = new CategoriesRes();
        res.setCategoriesRes(categoriesRes);

        return res;
    }

}
