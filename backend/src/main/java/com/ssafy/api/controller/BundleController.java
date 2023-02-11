package com.ssafy.api.controller;

import com.ssafy.api.request.BundleReq;
import com.ssafy.api.response.BundledItemsProductRes;
import com.ssafy.api.service.BundleService;
import com.ssafy.db.entity.Bundle;
import com.ssafy.db.entity.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;

import javax.transaction.Transactional;
import java.util.List;

@Log
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/bundle")
public class BundleController {

    private final BundleService bundleService;

    // 구매자가 가격 제안함
    @PostMapping()
    public ResponseEntity<?> addBundle(@RequestBody BundleReq bundleReq) {
        Long bundleId = bundleService.addBundle(bundleReq);
        
        // 프론트한테 bundleId 보내주기
        return ResponseEntity.status(200).body("묶음 상품 등록 성공: " + bundleId);
    }

    // 판매자 - 묶음 제안 목록
    @GetMapping("/{liveId}")
    public ResponseEntity<?> getSellerSuggestList(@PathVariable("liveId") Long liveId) {
        List<List<BundledItemsProductRes>> suggestList = bundleService.getSellerSuggestList(liveId);
        return ResponseEntity.status(200).body(suggestList);
    }

    // 구매자 - 묶음 제안 목록
    @GetMapping("/{liveId}/{buyerId}")
    public ResponseEntity<?> getBuyerSuggestList(@PathVariable("liveId") Long liveId, @PathVariable("buyerId") Long buyerId) {
        List<List<BundledItemsProductRes>> getProductList = bundleService.getBuyerSuggestList(liveId, buyerId);
        return ResponseEntity.status(200).body(getProductList);
    }

    // bundleId의 묶음 상품들 보기
    @GetMapping("/items/{bundleId}")
    public ResponseEntity<?> getBundledItemsRelation(@PathVariable("bundleId") Long bundleId) {
        List<Product> getProductList = bundleService.getBundleItemsList(bundleId);
        return ResponseEntity.status(200).body(getProductList);
    }

    // 승인
    @PutMapping("/approval/{bundleId}")
    public ResponseEntity<?> approvalBundle(@PathVariable("bundleId") Long bundleId) {
        bundleService.approvalBundle(bundleId);
        return ResponseEntity.status(200).body("승인");
    }

    // 거부 및 취소
    @PutMapping("/refuse/{bundleId}")
    public ResponseEntity<?> refuseBundle(@PathVariable("bundleId") Long bundleId) {
        bundleService.refuseBundle(bundleId);
        return ResponseEntity.status(200).body("거부 및 취소");
    }
}
