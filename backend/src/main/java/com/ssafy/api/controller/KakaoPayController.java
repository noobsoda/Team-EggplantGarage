package com.ssafy.api.controller;

import com.ssafy.api.request.KakaoPayReq;
import com.ssafy.api.response.KakaoPayApprovalRes;
import com.ssafy.api.response.KakaoPayReadyRes;
import com.ssafy.api.service.KakaoPayService;
import com.ssafy.db.entity.Bundle;
import com.ssafy.db.entity.BundledItemsRelation;
import com.ssafy.db.repository.BundleRepository;
import com.ssafy.db.repository.BundledItemsRelationRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Log
@RequestMapping("/api/v1/kakaoPay")
public class KakaoPayController {
    @Autowired
    KakaoPayService kakaoPayService;
    KakaoPayApprovalRes kakaoPayApprovalRes;
    @Autowired
    Optional<Bundle> bundle;
    @Autowired
    BundleRepository bundleRepository;

    @PostMapping()
    public String kakaoPay(@RequestBody KakaoPayReq kakaoPayReq) {
//        log.info("POST: kakaoPay 결제 준비");

        bundle = bundleRepository.findById(kakaoPayReq.getBundleId());

        KakaoPayReadyRes kakaoPayReadyRes = kakaoPayService.KakaoPayReady(bundle.get());

        kakaoPayApprovalRes = new KakaoPayApprovalRes(
                kakaoPayReadyRes.getTid(),
                String.valueOf(bundle.get().getId()),
                String.valueOf(bundle.get().getUser().getId()));

        if(kakaoPayReq.getPcOrMobile().equals("pc")) return "redirect:" + kakaoPayReadyRes.getNext_redirect_pc_url();
        else return "redirect:" + kakaoPayReadyRes.getNext_redirect_mobile_url();
    }

    @GetMapping("/success")
    public ResponseEntity<?> kakaoPaySuccess(@RequestParam("pg_token") String pg_token) {
//        log.info("GET: kakaoPaySuccess 결제 승인");

        ResponseEntity<KakaoPayApprovalRes> kakaoPResponseEntity = kakaoPayService.kakaoPaySuccess(kakaoPayApprovalRes, pg_token);

        bundle.get().setPaid(true);
        bundleRepository.save(bundle.get());

        return ResponseEntity.status(200).body("결제 완료");
    }
}
