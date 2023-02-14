package com.ssafy.api.service;

import com.ssafy.api.request.BundleReq;
import com.ssafy.api.response.BundledItemsProductRes;
import com.ssafy.db.entity.Bundle;
import com.ssafy.db.entity.BundledItemsRelation;
import com.ssafy.db.entity.Product;
import com.ssafy.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Log
@RequiredArgsConstructor
@Service("bundleService")
public class BundleServiceImpl implements BundleService {
    private final BundleRepository bundleRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final LiveRepository liveRepository;
    private final BundledItemsRelationRepository bundledItemsRelationRepository;

    @Override
    public Long addBundle(BundleReq bundleReq) {
//        log.info("ServiceImpl: 묶음 상품 Bundle DB에 저장(제안)");
        int quantity = bundleReq.getProductIdList().size();

        Bundle bundle = new Bundle();

        bundle.setUser(userRepository.findById(bundleReq.getBuyerId()).get());
        bundle.setLive(liveRepository.findById(bundleReq.getLiveId()).get());
        bundle.setPrice(bundleReq.getSoldPrice());
        bundle.setPaid(false);
        bundle.setApproval(false);
        bundle.setRefuse(false);
        bundle.setCancel(false);

        Long bundleId = bundleRepository.save(bundle).getId();

//        log.info("ServiceImpl: 각각의 묶음 상품들 BundledItemsRelation DB에 저장");
        for(int i = 0; i < quantity; i++) {
            BundledItemsRelation bundledItemsRelation = new BundledItemsRelation();

            bundledItemsRelation.setBundle(bundle);
            bundledItemsRelation.setProduct(productRepository.findById(bundleReq.getProductIdList().get(i)).get());
            bundledItemsRelationRepository.save(bundledItemsRelation);
        }

        return bundleId;
    }

    // 공통
    public List<List<BundledItemsProductRes>> getBundleItemsProduct(List<Bundle> bundleList, String who) {
        List<List<BundledItemsProductRes>> productAllList = new ArrayList<>();
        int size = bundleList.size();

        for(int i = 0; i < size; i++) {
            boolean flag = false;
            long id = bundleList.get(i).getId();
            int totalPrice = bundleList.get(i).getPrice();
            List<BundledItemsProductRes> productList = new ArrayList<>();

            List<BundledItemsRelation> bundledItemsRelationList = bundledItemsRelationRepository.findAllByBundle_Id(id).get();
            int itemsSize = bundledItemsRelationList.size();

            for(int j = 0; j < itemsSize; j++) {
                Product product = bundledItemsRelationList.get(j).getProduct();

                // 판매자는 이미 승인된 상품이 있는 목록은 추가 X
                if(who.equals("seller") && product.isApproval()) {
                    flag = true;
                    refuseBundle(id);
                    break;
                }

                BundledItemsProductRes res = new BundledItemsProductRes(
                        id, product.getName(),
                        product.getSoldPrice(),product.getInitialPrice(), product.isPaid(),
                        product.getLeftTopX(), product.getLeftTopY(),
                        product.getRightBottomX(), product.getRightBottomY(),
                        product.getImageUrl(), product.getBuyerId(),
                        bundleList.get(i).getUser().getNickname(), totalPrice, product.isApproval());

                productList.add(res);
            }

            if(!flag) productAllList.add(productList);
        }
        return productAllList;
    }

    @Override
    public List<List<BundledItemsProductRes>> getSellerSuggestList(Long liveId) {
        List<Bundle> bundleList = bundleRepository.findAllByLive_IdAndIsRefuseFalseAndIsApprovalFalseAndIsCancelFalse(liveId).get();
        return getBundleItemsProduct(bundleList, "seller");
    }

    @Override
    public List<List<BundledItemsProductRes>> getApprovalNoPaidSuggestList(long liveId, long buyerId) {
        List<Bundle> bundleList = bundleRepository.findAllByLive_IdAndUserIdAndIsApprovalTrueAndIsPaidFalse(liveId, buyerId).get();
        return getBundleItemsProduct(bundleList, "buyer");
    }

    @Override
    public List<List<BundledItemsProductRes>> getApprovalYesPaidSuggestList(long liveId, long buyerId) {
        List<Bundle> bundleList = bundleRepository.findAllByLive_IdAndUserIdAndIsApprovalTrueAndIsPaidTrue(liveId, buyerId).get();
        return getBundleItemsProduct(bundleList, "buyer");
    }

    @Override
    public List<List<BundledItemsProductRes>> getRefuseSuggestList(long liveId, long buyerId) {
        List<Bundle> bundleList = bundleRepository.findAllByLive_IdAndUserIdAndIsRefuseTrue(liveId, buyerId).get();
        return getBundleItemsProduct(bundleList, "buyer");
    }

    @Override
    public List<List<BundledItemsProductRes>> getBuyerSuggestList(long liveId, long buyerId) {
        List<Bundle> bundleList = bundleRepository.findAllByLive_IdAndUserIdAndIsRefuseFalseAndIsApprovalFalseAndIsCancelFalse(liveId, buyerId).get();
        return getBundleItemsProduct(bundleList, "buyer");
    }

    @Override
    public List<Product> getBundleItemsList(long bundleId) {
        List<BundledItemsRelation> bundledItemsRelationList = bundledItemsRelationRepository.findAllByBundle_Id(bundleId).get();
        List<Product> productList = new ArrayList<>();

        int size = bundledItemsRelationList.size();
        for(int i = 0; i < size; i++) {
            productList.add(bundledItemsRelationList.get(i).getProduct());
        }

        return productList;
    }

    @Override
    public void approvalBundle(long bundleId) {
        Bundle bundle = bundleRepository.findById(bundleId).get();

        if(bundle.getPrice() == 0) bundle.setPaid(true);
        bundle.setApproval(true);
        bundleRepository.save(bundle);

        // 묶음에 해당하는 상품들도 승인 처리해주기
        Optional<List<BundledItemsRelation>> bundledItemsRelationList = bundledItemsRelationRepository.findAllByBundle_Id(bundleId);
        int size = bundledItemsRelationList.get().size();

        for(int i = 0; i < size; i++) {
            Long productId = bundledItemsRelationList.get().get(i).getProduct().getId();
            Product product = productRepository.findById(productId).get();


            // 0원이면 카카오페이 결제 가지 않고 바로 결제 완료
            if(bundle.getPrice() == 0) {
                product.setPaid(true);
                product.setSoldAt(LocalDateTime.now());
                product.setSoldPrice(0);
                product.setBuyerId(bundle.getId());
            }

            product.setApproval(true);
            productRepository.save(product);
        }
    }

    @Override
    public void refuseBundle(long bundleId) {
        Optional<Bundle> bundle = bundleRepository.findById(bundleId);
        bundle.get().setRefuse(true);
        bundleRepository.save(bundle.get());
    }

    @Override
    public void cancelBundle(long bundleId) {
        Optional<Bundle> bundle = bundleRepository.findById(bundleId);
        bundle.get().setCancel(true);
        bundleRepository.save(bundle.get());
    }


}
