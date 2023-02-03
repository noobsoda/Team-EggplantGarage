package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ProductsRegisterPostReq {
    List<ProductReq> productList;
}
