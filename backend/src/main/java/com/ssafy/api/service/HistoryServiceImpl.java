package com.ssafy.api.service;

import com.ssafy.api.response.LiveHistoryRes;
import com.ssafy.api.response.ProductHistoryRes;
import com.ssafy.db.entity.Live;
import com.ssafy.db.entity.Product;
import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.LiveRepository;
import com.ssafy.db.repository.ProductRepository;
import com.ssafy.db.repository.ReviewRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("historyService")
public class HistoryServiceImpl implements HistoryService{
    private final Logger logger;

    public HistoryServiceImpl(Logger logger) {
        this.logger = logger;
    }

    @Autowired
    ProductRepository productRepository;

    @Autowired
    LiveRepository liveRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Override
    public List<LiveHistoryRes> getLiveHistoryBySellerId(long sellerId) {
        List<Live> liveList = liveRepository.findByUser_IdAndIsLiveFalseOrderByCreatedAtDesc(sellerId).get();
        List<LiveHistoryRes> resList = new ArrayList<>();
        for (Live live : liveList) {
            LiveHistoryRes res = LiveHistoryRes.of(live);
            resList.add(res);
        }
        return resList;
    }

    @Override
    public List<ProductHistoryRes> getProductHistoryByBuyerId(long buyerId) {
        List<Product> productList = productRepository.findByUser_IdOrderByCreatedAtDesc(buyerId).get();
        List<ProductHistoryRes> resList = new ArrayList<>();
        for (Product product : productList) {
            Optional<Review> review  = reviewRepository.findOneByProduct_IdAndIsSellerFalse(product.getId());
            long reviewId = (review.isPresent()) ? review.get().getId() : 0;
            User seller = product.getLive().getUser();
            ProductHistoryRes res = ProductHistoryRes.of(product, seller, reviewId);
            resList.add(res);
        }
        return resList;
    }

    @Override
    public List<ProductHistoryRes> getProductHistoryByLiveId(long liveId) {
        List<Product> productList = productRepository.findByLive_IdOrderByCreatedAtDesc(liveId).get();
        List<ProductHistoryRes> resList = new ArrayList<>();
        for (Product product : productList) {
            Optional<Review> review = reviewRepository.findOneByProduct_IdAndIsSellerTrue(product.getId());
            long reviewId = (review.isPresent()) ? review.get().getId() : 0;
            User buyer = product.getUser();
            ProductHistoryRes res = ProductHistoryRes.of(product, buyer, reviewId);
            resList.add(res);
        }
        return resList;
    }
}
