package com.ssafy.api.controller;

import com.querydsl.core.Tuple;
import com.ssafy.api.request.KakaoPayReq;
import com.ssafy.api.response.KakaoPayApprovalRes;
import com.ssafy.api.response.KakaoPayReadyRes;
import com.ssafy.api.service.KakaoPayService;
import com.ssafy.db.entity.Bundle;
import com.ssafy.db.repository.BundleRepository;
import com.ssafy.db.repository.BundleRepositorySupport;
import lombok.Setter;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Log
@RequestMapping("/api/v1/kakaoPay")
public class KakaoPayController {
//    @Setter(onMethod_ = @Autowired)
    @Autowired
    KakaoPayService kakaoPayService;
    KakaoPayApprovalRes kakaoPayApprovalRes;
    @Autowired
    Optional<Bundle> bundle;
    @Autowired
    BundleRepository bundleRepository;
    @Autowired
    BundleRepositorySupport bundleRepositorySupport;

    @GetMapping("/test")
    public String test() {
        System.out.println("test 들어옴");
        return "hello";
    }

    @PostMapping()
    public KakaoPayReadyRes kakaoPay(@RequestBody KakaoPayReq kakaoPayReq) {
        log.info("POST: kakaoPay 결제 준비");
        System.out.println("kakaoPay -> POST");
        System.out.println("id: " + kakaoPayReq.getBundleId());

        bundle = bundleRepository.findById(kakaoPayReq.getBundleId());
//        bundle = bundleRepositorySupport.findBundle(kakaoPayReq.getBundleId());
        System.out.println("bundle: " + bundle.get());
        System.out.println("bundle: " + bundle.get().getId());
        System.out.println("bundle: " + bundle.get().getUser().getId());
        System.out.println("bundle: " + bundle.get().getPrice());

        List<Tuple> bundleList = bundleRepositorySupport.findBundleListById(kakaoPayReq.getBundleId()).get();
        int quantity = bundleList.size();
        System.out.println("수량: " + quantity);

        KakaoPayReadyRes kakaoPayReadyRes = kakaoPayService.KakaoPayReady(bundle.get(), quantity);

        kakaoPayApprovalRes = new KakaoPayApprovalRes(
                kakaoPayReadyRes.getTid(),
                String.valueOf(bundle.get().getId()),
                String.valueOf(bundle.get().getUser().getId()));
        return  kakaoPayReadyRes;

//        return "redirect:" + kakaoPayService.KakaoPayReady().getNext_redirect_pc_url();
    }

    @GetMapping("/success")
    public KakaoPayApprovalRes kakaoPaySuccess(@RequestParam("pg_token") String pg_token) {
        log.info("GET: kakaoPaySuccess");
        System.out.println("결제 승인");
        System.out.println("order id: " + kakaoPayApprovalRes.getPartner_order_id() + ", user id: " + kakaoPayApprovalRes.getPartner_user_id());

        ResponseEntity<KakaoPayApprovalRes> kakaoPResponseEntity = kakaoPayService.kakaoPaySuccess(kakaoPayApprovalRes, pg_token);
        System.out.println("kakaoPaySuccess -> pg_token: " + pg_token);
        System.out.println("승인 받고나서: " + kakaoPResponseEntity.toString());

        // 화면 쪽에 정보를 전송
//        model.addAttribute("info", kakaoPayService.kakaoPaySuccess(pg_token));
        bundle.get().setPaid(true);
//        bundleRepository.save(bundle);

        return kakaoPayApprovalRes;
    }
}
