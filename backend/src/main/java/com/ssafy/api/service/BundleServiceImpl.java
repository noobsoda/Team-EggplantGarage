package com.ssafy.api.service;

import com.ssafy.api.request.BundleReq;
import com.ssafy.db.entity.Bundle;
import com.ssafy.db.entity.BundledItemsRelation;
import com.ssafy.db.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        bundle.setLive(liveRepository.findById(bundleReq.getLiveId()).get());
        bundle.setPrice(bundleReq.getSoldPrice());
        bundle.setPaid(false);
        bundle.setApproval(false);
        bundle.setRefuse(false);

        Long bundleId = bundleRepository.save(bundle).getId();

//        log.info("ServiceImpl: 각각의 묶음 상품들 BundledItemsRelation DB에 저장");
        for(int i = 0; i < quantity; i++) {
            BundledItemsRelation bundledItemsRelation = new BundledItemsRelation();

            bundledItemsRelation.setBundle(bundle);
            bundledItemsRelation.setProduct(productRepository.findById(bundleReq.getProductIdList().get(i)).get());
            bundledItemsRelationRepository.save(bundledItemsRelation);
        }

        // bundleId 프론트한테 보내줘야함
        return bundleId;
    }

    @Override
    public List<Bundle> getSuggestList(Long liveId) {
        return bundleRepository.findAllByLive_IdAndIsRefuseFalseAndIsApprovalFalse(liveId).get();
    }

    @Override
    public void deleteBundle(long bundleId) {
        bundledItemsRelationRepository.deleteAllByBundle_Id(bundleId);
        bundleRepository.deleteBundleById(bundleId);
    }

}
