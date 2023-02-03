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
import com.ssafy.db.repository.UserRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("historyService")
public class HistoryServiceImpl implements HistoryService{
    private final Logger logger;
    private final UserRepository userRepository;

    @Autowired
    public HistoryServiceImpl(Logger logger, UserRepository userRepository) {
        this.logger = logger;
        this.userRepository = userRepository;
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
        List<Product> productList = productRepository.findByBuyerIdOrderByCreatedAtDesc(buyerId).get();
        List<ProductHistoryRes> resList = new ArrayList<>();
        for (Product product : productList) {
            Optional<Review> myReview  = reviewRepository.findOneByProduct_IdAndIsSellerFalse(product.getId());
            long myReviewId = (myReview.isPresent()) ? myReview.get().getId() : 0;
            Optional<Review> otherReview  = reviewRepository.findOneByProduct_IdAndIsSellerTrue(product.getId());
            long otherReviewId = (otherReview.isPresent()) ? otherReview.get().getId() : 0;

            User seller = product.getLive().getUser();
            ProductHistoryRes res = ProductHistoryRes.of(product, seller, myReviewId, otherReviewId);
            resList.add(res);
        }
        return resList;
    }

    @Override
    public List<ProductHistoryRes> getProductHistoryByLiveId(long liveId) {
        List<Product> productList = productRepository.findByLive_IdOrderByCreatedAtDesc(liveId).get();
        List<ProductHistoryRes> resList = new ArrayList<>();
        for (Product product : productList) {
            Optional<Review> myReview = reviewRepository.findOneByProduct_IdAndIsSellerTrue(product.getId());
            long myReviewId = (myReview.isPresent()) ? myReview.get().getId() : 0;
            Optional<Review> otherReview  = reviewRepository.findOneByProduct_IdAndIsSellerFalse(product.getId());
            long otherReviewId = (otherReview.isPresent()) ? otherReview.get().getId() : 0;

            Optional<User> oUser = userRepository.findById(product.getBuyerId());
            User buyer = oUser.orElse(null);
            if(buyer == null)    continue;

            ProductHistoryRes res = ProductHistoryRes.of(product, buyer, myReviewId, otherReviewId);
            resList.add(res);
        }
        return resList;
    }
}
