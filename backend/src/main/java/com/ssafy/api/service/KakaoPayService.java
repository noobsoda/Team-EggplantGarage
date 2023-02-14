package com.ssafy.api.service;

import com.ssafy.api.response.KakaoPayApprovalRes;
import com.ssafy.api.response.KakaoPayReadyRes;
import com.ssafy.common.error.ErrorCode;
import com.ssafy.common.exception.CustomException;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.BundledItemsRelationRepository;
import com.ssafy.db.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;


@Service
@Log
@Transactional
@RequiredArgsConstructor
public class KakaoPayService {
    private static final String HOST = "https://kapi.kakao.com";
    private static final String DOMAIN = "https://i8b105.p.ssafy.io/api/v1/kakaoPay";
    //    private static final String DOMAIN = "https://localhost:8000/api/v1/kakaoPay";
    private static final String ADMIN = "7ad3ade6c404bf95e1713af49e12b31f";
    private KakaoPayReadyRes kakaoPayReadyRes;
    private int quantity, soldPrice;
    private final BundledItemsRelationRepository bundledItemsRelationRepository;
    private final ProductRepository productRepository;


    // 결제 준비
    public KakaoPayReadyRes KakaoPayReady(Bundle bundle) {
//        log.info("Service: 결제 준비 시작");
        List<BundledItemsRelation> bundledItemsRelationList = bundledItemsRelationRepository.findAllByBundle_Id(bundle.getId());

        if (bundledItemsRelationList.isEmpty())
            throw new CustomException(ErrorCode.BUNDLE_NOT_FOUND);

        quantity = bundledItemsRelationList.size();

        String productName = bundledItemsRelationList.get(0).getProduct().getName();
        if (quantity > 1) productName += " 외 " + (quantity - 1) + "개";
        soldPrice = bundle.getPrice() / quantity;

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + ADMIN);
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", "TC0ONETIME"); // 가맹점 코드
        params.add("partner_order_id", String.valueOf(bundle.getId())); // 가맹점 주문번호
        params.add("partner_user_id", String.valueOf(bundle.getUser().getId())); // 가맹점 회원 id
        params.add("item_name", productName); // 상품명
        params.add("quantity", String.valueOf(quantity)); // 상품 수량
        params.add("total_amount", String.valueOf(bundle.getPrice())); // 상품 총액
        params.add("tax_free_amount", "0"); // 상품 비과세 금액
        params.add("approval_url", DOMAIN + "/success"); // 결제 성공 시 redirect url
        params.add("cancel_url", DOMAIN + "/cancel"); // 결제 취소 시 redirect url
        params.add("fail_url", DOMAIN + "/fail"); // 결제 실패 시 redirect url

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(params, headers);
        try {
            kakaoPayReadyRes = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, KakaoPayReadyRes.class);
            return kakaoPayReadyRes;
        } catch (RestClientException | URISyntaxException e) {
            e.printStackTrace();
        }

        return null;
    }

    // 결제 승인
    public ResponseEntity<KakaoPayApprovalRes> kakaoPaySuccess(KakaoPayApprovalRes kakaoPayApprovalRes, String pg_token, Long bundleId) {
//        log.info("Service: 결제 승인 단계 시작");
        List<BundledItemsRelation> bundledItemsRelationList = bundledItemsRelationRepository.findAllByBundle_Id(bundleId);

        if (bundledItemsRelationList.isEmpty())
            throw new CustomException(ErrorCode.BUNDLE_NOT_FOUND);

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + ADMIN);
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", "TC0ONETIME"); // 가맹점 코드
        params.add("tid", kakaoPayApprovalRes.getTid()); // 결제 고유번호, 결제 준비 API 응답에 포함
        params.add("partner_order_id", kakaoPayApprovalRes.getPartner_order_id()); // 가맹점 주문번호, 결제 준비 API 요청과 일치해야 함
        params.add("partner_user_id", kakaoPayApprovalRes.getPartner_user_id()); // 가맹점 회원 id, 결제 준비 API 요청과 일치해야 함
        params.add("pg_token", pg_token); // 결제승인 요청을 인증하는 토큰
        // 사용자 결제 수단 선택 완료 시, approval_url로 redirection해줄 때 pg_token을 query string으로 전달

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(params, headers);

        try {
            kakaoPayApprovalRes = restTemplate.postForObject(new URI(HOST + "/v1/payment/approve"), body, KakaoPayApprovalRes.class);

            Long buyer = bundledItemsRelationList.get(0).getBundle().getUser().getId();
            for (int i = 0; i < quantity; i++) {
                Long productId = bundledItemsRelationList.get(i).getProduct().getId();
                Optional<Product> oProduct = productRepository.findById(productId);
                Product product = oProduct.orElse(null);
                if(product == null)
                    continue;

                product.setSoldAt(LocalDateTime.now());
                product.setSoldPrice(soldPrice);
                product.setPaid(true);
                product.setBuyerId(buyer);

                productRepository.save(product);
            }

            return new ResponseEntity<>(kakaoPayApprovalRes, HttpStatus.OK);
        } catch (RestClientException | URISyntaxException e) {
            e.printStackTrace();
        }

        return null;
    }
}
