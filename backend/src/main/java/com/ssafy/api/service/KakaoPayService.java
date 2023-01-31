package com.ssafy.api.service;

import com.ssafy.api.response.KakaoPayApprovalRes;
import com.ssafy.api.response.KakaoPayReadyRes;
import com.ssafy.db.entity.Bundle;
import lombok.extern.java.Log;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

@Service
@Log
public class KakaoPayService {
    private static final String HOST = "https://kapi.kakao.com";
    private static final String ADMIN = "7ad3ade6c404bf95e1713af49e12b31f";
    private KakaoPayReadyRes kakaoPayReadyRes;
    private KakaoPayApprovalRes kakaoPayApprovalRes;

    // 결제 준비
    public KakaoPayReadyRes KakaoPayReady(Bundle bundle, int quantity) {
        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + ADMIN);
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");


        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", "TC0ONETIME"); // 가맹점 코드
        params.add("partner_order_id", String.valueOf(bundle.getId())); // 가맹점 주문번호
        params.add("partner_user_id", String.valueOf(bundle.getUser().getId())); // 가맹점 회원 id
        params.add("item_name", "상품명 이름"); // 상품명
        params.add("quantity", String.valueOf(quantity)); // 상품 수량
        params.add("total_amount", String.valueOf(bundle.getPrice())); // 상품 총액
        params.add("tax_free_amount", "100"); // 상품 비과세 금액
        params.add("approval_url", "http://localhost:8080/api/v1/kakaoPay/success"); // 결제 성공 시 redirect url
        params.add("cancel_url", "http://localhost:8080/cancel"); // 결제 취소 시 redirect url
        params.add("fail_url", "http://localhost:8080/fail"); // 결제 실패 시 redirect url

        // header와 body 붙이기
        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(params, headers);

        try {
            kakaoPayReadyRes = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, KakaoPayReadyRes.class);
            log.info("결제 준비: " + kakaoPayReadyRes);
            return kakaoPayReadyRes;
        } catch (RestClientException | URISyntaxException e){
            e.printStackTrace();
        }

        return null;
    }

    // 결제 승인
    public ResponseEntity<KakaoPayApprovalRes> kakaoPaySuccess(KakaoPayApprovalRes kakaoPayApprovalRes, String pg_token) {
        System.out.println("결제 승인 단계 시작");
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + ADMIN);
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", "TC0ONETIME"); // 가맹점 코드
        params.add("tid", kakaoPayReadyRes.getTid()); // 결제 고유번호, 결제 준비 API 응답에 포함
        params.add("partner_order_id", "가맹점 주문번호"); // 가맹점 주문번호, 결제 준비 API 요청과 일치해야 함
//        params.add("partner_order_id", kakaoPayApprovalVO.getPartner_order_id());
        params.add("partner_user_id", "가맹점 회원 id"); // 가맹점 회원 id, 결제 준비 API 요청과 일치해야 함
        params.add("pg_token", pg_token); // 결제승인 요청을 인증하는 토큰
        // 사용자 결제 수단 선택 완료 시, approval_url로 redirection해줄 때 pg_token을 query string으로 전달
        params.add("total_amount", "7700"); // 상품 총액, 결제 준비 API 요청과 일치해야 함

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(params, headers);

        try {
            kakaoPayApprovalRes = restTemplate.postForObject(new URI(HOST + "/v1/payment/approve"), body, KakaoPayApprovalRes.class);
            log.info("결제 승인: " + kakaoPayApprovalRes);
            // 아직 미완성
//            return kakaoPayApprovalRes;
        } catch (RestClientException | URISyntaxException e){
            e.printStackTrace();
        }

        return null;
    }
}
