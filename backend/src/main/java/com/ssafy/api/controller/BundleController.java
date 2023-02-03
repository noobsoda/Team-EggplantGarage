package com.ssafy.api.controller;

import com.ssafy.api.request.BundleReq;
import com.ssafy.api.service.BundleService;
import com.ssafy.db.entity.Bundle;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@Log
@RestController
@RequestMapping("/api/v1/bundle")
public class BundleController {

    @Autowired
    BundleService bundleService;

    // 구매자가 가격 제안함
    @PostMapping()
    public ResponseEntity<?> addBundle(@RequestBody BundleReq bundleReq) {
        Long bundleId = bundleService.addBundle(bundleReq);
        System.out.println("bundleId: " + bundleId);
        
        // bundleId 프론트한테 보내줘야함
        return ResponseEntity.status(200).body("묶음 상품 등록 성공: " + bundleId);
    }

    @GetMapping("/{liveId}")
    public ResponseEntity<?> getSuggestList(@PathVariable("liveId") Long liveId) {
        List<Bundle> suggestList = bundleService.getSuggestList(liveId);
        return ResponseEntity.status(200).body(suggestList);
    }

    // 거부
    @Transactional
    @DeleteMapping("/{bundleId}")
    public ResponseEntity<?> refuseBundle(@PathVariable("bundleId") Long bundleId) {
        bundleService.deleteBundle(bundleId);
        return ResponseEntity.status(200).body("삭제 완료");
    }
}
