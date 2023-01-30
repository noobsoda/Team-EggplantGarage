package com.ssafy.api.service;

import com.ssafy.db.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getHistoryByBuyerId(long buyerId);
}
