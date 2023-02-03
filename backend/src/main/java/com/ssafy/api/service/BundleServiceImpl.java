package com.ssafy.api.service;

import com.ssafy.api.request.BundleReq;
import com.ssafy.db.entity.Bundle;
import com.ssafy.db.entity.BundledItemsRelation;
import com.ssafy.db.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Log
@Service("bundleService")
public class BundleServiceImpl implements BundleService {
    @Autowired
    BundleRepository bundleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private LiveRepository liveRepository;
    @Autowired
    private BundledItemsRelationRepository bundledItemsRelationRepository;

    @Override
    public Long addBundle(BundleReq bundleReq) {
//        log.info("ServiceImpl: 묶음 상품 Bundle DB에 저장");
        int quantity = bundleReq.getProductIdList().size();

        Bundle bundle = new Bundle();

        bundle.setUser(userRepository.findById(bundleReq.getBuyerId()).get());
        bundle.setPrice(bundleReq.getSoldPrice());
        bundle.setPaid(false);
        bundle.setLive(liveRepository.findById(bundleReq.getLiveId()).get());

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

    @Override
    public List<Bundle> getSuggestList(Long liveId) {
//        List<Bundle> suggestAllList = bundleRepository.findAllByLive_Id(liveId).get();
        List<Bundle> suggestList = bundleRepository.findAllByLive_IdAndIsRefuseFalseAndIsApprovalFalse(liveId).get();
//        int size = suggestAllList.size();
//        System.out.println("size: " + size);

//        List<Bundle> uncheckedSuggestList = new ArrayList<>();
//        for(int i = 0; i < size; i++) {
//            System.out.println(suggestAllList.get(i).isApproval());
//            if(suggestAllList.get(i).isApproval() == false && suggestAllList.get(i).isRefuse() == false) {
//                System.out.println("여기: " + suggestAllList.get(i).getPrice());
//                uncheckedSuggestList.add(suggestAllList.get(i));
//            }
//        }
        return suggestList;
    }

}
