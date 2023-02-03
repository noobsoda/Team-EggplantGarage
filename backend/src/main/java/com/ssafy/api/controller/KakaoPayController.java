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
        System.out.println("POST: kakaoPay 결제 준비");

        bundle = bundleRepository.findById(kakaoPayReq.getBundleId());

        KakaoPayReadyRes kakaoPayReadyRes = kakaoPayService.KakaoPayReady(bundle.get());

        kakaoPayApprovalRes = new KakaoPayApprovalRes(
                kakaoPayReadyRes.getTid(),
                String.valueOf(bundle.get().getId()),
                String.valueOf(bundle.get().getUser().getId()));

//        return  kakaoPayReadyRes;

//        return "redirect:" + kakaoPayReadyRes.getNext_redirect_mobile_url();
        return "redirect:" + kakaoPayReadyRes.getNext_redirect_pc_url();
    }

    @GetMapping("/success")
    public String kakaoPaySuccess(@RequestParam("pg_token") String pg_token) {
//        log.info("GET: kakaoPaySuccess 결제 승인");
        System.out.println("GET: kakaoPaySuccess 결제 승인");

        ResponseEntity<KakaoPayApprovalRes> kakaoPResponseEntity = kakaoPayService.kakaoPaySuccess(kakaoPayApprovalRes, pg_token);
        System.out.println("kakaoPaySuccess -> pg_token: " + pg_token);
        System.out.println("승인 받고나서: " + kakaoPResponseEntity.toString());

//        model.addAttribute("info", kakaoPayService.kakaoPaySuccess(pg_token));
        bundle.get().setPaid(true);
        bundleRepository.save(bundle.get());

        return "success";
    }
}
