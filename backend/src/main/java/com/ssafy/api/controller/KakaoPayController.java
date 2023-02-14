package com.ssafy.api.controller;

import com.ssafy.api.request.KakaoPayReq;
import com.ssafy.api.response.KakaoPayApprovalRes;
import com.ssafy.api.response.KakaoPayReadyRes;
import com.ssafy.api.service.KakaoPayService;
import com.ssafy.common.error.ErrorCode;
import com.ssafy.common.exception.CustomException;
import com.ssafy.common.model.response.CommonResponse;
import com.ssafy.common.model.response.ResponseService;
import com.ssafy.db.entity.Bundle;
import com.ssafy.db.entity.BundledItemsRelation;
import com.ssafy.db.repository.BundleRepository;
import com.ssafy.db.repository.BundledItemsRelationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@RestController
@Log
@RequiredArgsConstructor
@RequestMapping("/api/v1/kakaoPay")
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;
    KakaoPayApprovalRes kakaoPayApprovalRes;

    private final BundleRepository bundleRepository;

    private final ResponseService responseService;

    @PostMapping()
    public String kakaoPay(@RequestBody KakaoPayReq kakaoPayReq) {
//        log.info("POST: kakaoPay 결제 준비");

        Optional<Bundle> oBundle = bundleRepository.findById(kakaoPayReq.getBundleId());
        Bundle bundle = oBundle.orElseThrow(()->new CustomException(ErrorCode.BUNDLE_NOT_FOUND));

        System.out.println(bundle);
        KakaoPayReadyRes kakaoPayReadyRes = kakaoPayService.KakaoPayReady(bundle);

        kakaoPayApprovalRes = new KakaoPayApprovalRes(
                kakaoPayReadyRes.getTid(),
                String.valueOf(bundle.getId()),
                String.valueOf(bundle.getUser().getId()),
                String.valueOf(bundle.getId()));

        if(kakaoPayReq.getPcOrMobile().equals("pc")) return "redirect:" + kakaoPayReadyRes.getNext_redirect_pc_url();
        else return "redirect:" + kakaoPayReadyRes.getNext_redirect_mobile_url();
    }

    @GetMapping("/success")
    public ResponseEntity<? extends CommonResponse> kakaoPaySuccess(@RequestParam("pg_token") String pg_token) {
//        log.info("GET: kakaoPaySuccess 결제 승인");

        ResponseEntity<KakaoPayApprovalRes> kakaoPResponseEntity = kakaoPayService.kakaoPaySuccess(kakaoPayApprovalRes, pg_token);

        Optional<Bundle> oBundle = bundleRepository.findById(Long.parseLong(kakaoPayApprovalRes.getItem_code()));
        Bundle bundle = oBundle.orElseThrow(()->new CustomException(ErrorCode.BUNDLE_NOT_FOUND));

        bundle.setPaid(true);
        bundleRepository.save(bundle);

        return ResponseEntity.status(200).body(responseService.getSuccessResponse(200, "결제 성공"));
    }
}
