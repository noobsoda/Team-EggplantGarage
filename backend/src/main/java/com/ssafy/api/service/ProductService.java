package com.ssafy.api.service;

import com.ssafy.api.request.ProductsRegisterPostReq;

import java.util.Map;

public interface ProductService {

    boolean postProductById(ProductsRegisterPostReq productList, Map<String, Object> reqMap);
}
