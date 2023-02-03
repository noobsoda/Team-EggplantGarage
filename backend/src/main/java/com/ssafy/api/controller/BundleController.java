package com.ssafy.api.controller;

import com.ssafy.api.request.BundleReq;
import com.ssafy.api.service.BundleService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log
@RestController
@RequestMapping("/api/v1/bundle")
public class BundleController {

    @Autowired
    BundleService bundleService;

    @PostMapping()
    public ResponseEntity<?> addBundle(@RequestBody BundleReq bundleReq) {
//        log.info("POST: 승인 받은 묶음 상품 추가");
//        System.out.println("POST: 승인 받은 묶음 상품 추가");

        Long bundleId = bundleService.addBundle(bundleReq);
//        System.out.println("bundleId: " + bundleId);

        // 그 다음 카카오페이로 가서 결제하기
        
        return ResponseEntity.status(200).body("묶음 상품 등록 성공");
    }
}
