package com.ssafy.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    // 400 BAD_REQUEST 잘못된 요청
    INVALID_PARAMETER(false, 400, "파라미터 값을 확인해주세요."),

    // 404 NOT_FOUND 잘못된 리소스 접근
    USER_NOT_FOUND(false, 404, "존재하지 않는 유저 ID 입니다."),
    USER_LIVE_NOT_FOUND(false, 404, "존재하지 않는 참가유저 입니다."),
    LIVE_NOT_FOUND(false, 404, "존재하지 않는 라이브 ID 입니다."),
    SEARCH_NOT_FOUND(false, 404, "검색한 결과가 없습니다."),
    REVIEW_NOT_FOUND(false, 404, "존재하지 않는 리뷰 ID 입니다."),
    BUNDLE_NOT_FOUND(false, 404, "존재하지 않는 묶음 ID 입니다."),
    FAVORITE_NOT_FOUND(false, 404, "존재하지 않는 찜 입니다."),
    CATEGORY_NOT_FOUND(false, 404, "존재하지 않는 캍고리 입니다."),

    COOKIE_NOT_FOUND(false, 404, "Cookies is null"),
    REFRESH_TOKEN_NOT_FOUND(false, 404, "Not Exist refreshToken"),

    INVALID_TOKEN(false, 401, "Invalid Token"),
    INVALID_PASSWORD(false, 401, "Invalid Token"),

    // 409 CONFLICT 중복된 리소스
    ALREADY_SAVED_LIVE(false, 409, "이미 저장한 라이브입니다."),
    ALREADY_LIVE_END(false, 409, "이미 끝난 라이브입니다."),
    ALREADY_SAVED_USER(false, 409, "이미 저장한 유저입니다"),
    ALREADY_SAVED_REVIEW(false, 409, "이미 저장한 리뷰입니다."),

    // 500 INTERNAL SERVER ERROR
    INTERNAL_SERVER_ERROR(false, 500, "서버 에러입니다. 서버 팀에 연락주세요!");

    private final boolean isSuccess;
    private final int status;
    private final String message;
}
