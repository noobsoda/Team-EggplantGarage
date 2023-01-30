package com.ssafy.api.controller;

import com.ssafy.api.service.KakaoPayService;
import lombok.Setter;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@Log
@RequestMapping("/api/v1/kakaoPay")
public class KakaoPayController {
    @Setter(onMethod_ = @Autowired)
    private KakaoPayService kakaoPayService;

    @GetMapping("/test")
    public String test() {
        System.out.println("test 들어옴");
        return "hello";
    }

    @PostMapping()
    public String kakaoPay() {
//        KakaoPayReadyVO kakaoPayReadyVO = kakaoPayService.KakaoPayReady();
        log.info("POST: kakaoPay 결제 준비");

//        kakaoPayApprovalVO = new KakaoPayApprovalVO("TC0ONETIME", kakaoPayReadyVO.getTid(),
//                    "가맹점 주문번호", "가맹점 회원 id");
        System.out.println("kakaoPay -> POST");
        return "redirect:" + kakaoPayService.KakaoPayReady().getNext_redirect_pc_url();
    }

    @GetMapping("/success")
    public String kakaoPaySuccess(@RequestParam("pg_token") String pg_token, Model model) {
        log.info("GET: kakaoPaySuccess");
        System.out.println("kakaoPaySuccess -> pg_token: " + pg_token);

        // 화면 쪽에 정보를 전송
        model.addAttribute("info", kakaoPayService.kakaoPayInfo(pg_token));
//        return "redirect:" + "http://localhost:8080/api/v1/kakaoPay/success.html";
        return null;
    }
}
