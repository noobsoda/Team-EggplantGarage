package com.ssafy.api.response;

import lombok.Data;

import java.util.Date;

@Data
public class KakaoPayReadyRes {
    // 결제 고유 번호
    private String tid;

    // 요청한 클라이언트가 모바일 웹/PC일 경우 카카오톡 결제 페이지 Redirect URL
    private String next_redirect_mobile_url, next_redirect_pc_url;

    // 결제 준비 요청 시간
    private Date created_at;
}
