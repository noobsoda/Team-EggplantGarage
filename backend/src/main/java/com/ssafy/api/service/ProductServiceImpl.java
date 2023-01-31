package com.ssafy.api.service;

import com.ssafy.db.entity.Product;
import com.ssafy.db.repository.ProductRepository;
import com.ssafy.db.repository.ProductRepositorySupport;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("productService")
public class ProductServiceImpl implements ProductService{
    private final Logger logger;

    public ProductServiceImpl(Logger logger) {
        this.logger = logger;
    }

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductRepositorySupport productRepositorySupport;

    @Override
    public List<Product> getHistoryByBuyerId(long buyerId) {
        List<Product> productList = productRepositorySupport.findProductByBuyerId(buyerId).get();
        return productList;
    }

    @Override
    public List<Product> getHistoryByLiveId(long liveId) {
        List<Product> productList = productRepositorySupport.findProductByLiveId(liveId).get();
        return productList;
    }
}
