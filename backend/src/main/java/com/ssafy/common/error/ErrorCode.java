package com.ssafy.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    //400 BAD_REQUEST 잘못된 요청
    INVALID_PARAMETER(400, "파라미터 값을 확인해주세요."),

    //404 NOT_FOUND 잘못된 리소스 접근
    USER_NOT_FOUND(404, "존재하지 않는 유저 ID 입니다."),
    USER_LIVE_NOT_FOUND(404, "존재하지 않는 참가유저 입니다."),
    LIVE_NOT_FOUND(404, "존재하지 않는 라이브 ID 입니다."),
    REVIEW_NOT_FOUND(404, "존재하지 않는 리뷰 ID 입니다."),
    BUNDLE_NOT_FOUND(404, "존재하지 않는 묶음 ID 입니다."),

    //409 CONFLICT 중복된 리소스
    ALREADY_SAVED_LIVE(409, "이미 저장한 라이브입니다."),
    ALREADY_SAVED_USER(409, "이미 저장한 유저입니다"),
    ALREADY_SAVED_REVIEW(409, "이미 저장한 리뷰입니다."),

    //500 INTERNAL SERVER ERROR
    INTERNAL_SERVER_ERROR(500, "서버 에러입니다. 서버 팀에 연락주세요!");

    private final int status;
    private final String message;
}
