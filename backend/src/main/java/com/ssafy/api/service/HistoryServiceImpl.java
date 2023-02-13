package com.ssafy.api.service;

import com.ssafy.api.response.LiveHistoryRes;
import com.ssafy.api.response.ProductHistoryRes;
import com.ssafy.common.exception.CustomException;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.ssafy.common.error.ErrorCode.*;

@Service("historyService")
public class HistoryServiceImpl implements HistoryService{
    private final Logger logger;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final LiveRepository liveRepository;
    private final ReviewRepository reviewRepository;
    private final ChatRoomRepository chatRoomRepository;

    @Autowired
    public HistoryServiceImpl(Logger logger, UserRepository userRepository, ProductRepository productRepository, LiveRepository liveRepository, ReviewRepository reviewRepository, ChatRoomRepository chatRoomRepository) {
        this.logger = logger;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.liveRepository = liveRepository;
        this.reviewRepository = reviewRepository;
        this.chatRoomRepository = chatRoomRepository;
    }

    @Override
    public List<LiveHistoryRes> getLiveHistoryBySellerId(long sellerId) {
        List<Live> liveList = liveRepository.findByIsLiveFalseAndUser_IdOrderByCreatedAtDesc(sellerId);
        if(liveList == null || liveList.isEmpty())
            throw new CustomException(LIVE_NOT_FOUND);

        List<LiveHistoryRes> resList = new ArrayList<>();
        for (Live live : liveList) {
            LiveHistoryRes res = LiveHistoryRes.of(live);
            resList.add(res);
        }
        return resList;
    }

    @Override
    public List<ProductHistoryRes> getProductHistoryByBuyerId(long buyerId) {
        List<Product> productList = productRepository.findByIsPaidTrueAndBuyerIdOrderByCreatedAtDesc(buyerId).get();
        List<ProductHistoryRes> resList = new ArrayList<>();
        for (Product product : productList) {
            Review myReview  = reviewRepository.findOneByProduct_IdAndIsSellerFalse(product.getId()).orElse(null);;
            long myReviewId = (myReview == null ) ? 0 : myReview.getId();
            Review otherReview  = reviewRepository.findOneByProduct_IdAndIsSellerTrue(product.getId()).orElse(null);;
            long otherReviewId = (otherReview == null) ? 0 : otherReview.getId();

            User seller = product.getLive().getUser();
            ChatRoom chatRoom = chatRoomRepository.findOneByUsersId(seller.getId(), buyerId).orElse(null);
            long chatRoomId = (chatRoom == null) ? 0 : chatRoom.getId();
            ProductHistoryRes res = ProductHistoryRes.of(product, seller, myReviewId, otherReviewId, chatRoomId);
            resList.add(res);
        }
        return resList;
    }

    @Override
    public List<ProductHistoryRes> getProductHistoryByLiveId(long liveId) {
        List<Product> productList = productRepository.findByIsPaidTrueAndLive_IdOrderByCreatedAtDesc(liveId).get();
        List<ProductHistoryRes> resList = new ArrayList<>();
        for (Product product : productList) {
            Review myReview = reviewRepository.findOneByProduct_IdAndIsSellerTrue(product.getId()).orElse(null);
            long myReviewId = (myReview == null) ? 0 : myReview.getId();
            Review otherReview  = reviewRepository.findOneByProduct_IdAndIsSellerFalse(product.getId()).orElse(null);;
            long otherReviewId = (otherReview == null) ? 0 : otherReview.getId();

            User buyer = userRepository.findById(product.getBuyerId()).orElse(null);
            long sellerId = product.getLive().getUser().getId();
            ChatRoom chatRoom = chatRoomRepository.findOneByUsersId(buyer.getId(), sellerId).orElse(null);
            long chatRoomId = (chatRoom == null) ? 0 : chatRoom.getId();
            ProductHistoryRes res = ProductHistoryRes.of(product, buyer, myReviewId, otherReviewId, chatRoomId);
            resList.add(res);
        }
        return resList;
    }
}
