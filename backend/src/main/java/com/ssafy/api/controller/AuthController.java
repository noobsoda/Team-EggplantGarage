package com.ssafy.api.controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.common.error.ErrorCode;
import com.ssafy.common.exception.CustomException;
import com.ssafy.common.model.response.CommonResponse;
import com.ssafy.common.model.response.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.ssafy.common.error.ErrorCode.*;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = { "Auth." })
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final ResponseService responseService;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserLoginPostRes> login(
            @RequestBody @ApiParam(value = "로그인 정보", required = true) UserLoginPostReq loginInfo,
            HttpServletResponse response) {
        String userEmail = loginInfo.getEmail();
        String password = loginInfo.getPassword();

        User user = userService.getUserByEmail(userEmail);
        if (user == null)
            throw new CustomException(ErrorCode.USER_NOT_FOUND);

        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (passwordEncoder.matches(password, user.getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            String refreshToken = JwtTokenUtil.getRefreshToken(userEmail);
            userService.patchUserTokenByrefreshToken(userEmail, refreshToken);

            Cookie cookie = new Cookie("refreshToken", refreshToken); // refresh 담긴 쿠키 생성
            cookie.setMaxAge(JwtTokenUtil.refreshExpirationTime); // 쿠키의 유효시간을 refresh 유효시간만큼 설정
            cookie.setSecure(true); // 클라이언트가 HTTPS가 아닌 통신에서는 해당 쿠키를 전송하지 않도록 하는 설정
            cookie.setHttpOnly(true); // 브라우저에서 쿠키에 접근할 수 없도록 하는 설정
            cookie.setPath("/");

            response.addCookie(cookie);

            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", true, JwtTokenUtil.getAccessToken(userEmail)));
        } else {
            // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
            throw new CustomException(INVALID_PASSWORD);
        }

    }

    @PostMapping("/logout")
    @ApiOperation(value = "로그아웃", notes = "로그아웃한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "토큰 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "요청 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends CommonResponse> logout(HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = null;

        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            throw new CustomException(COOKIE_NOT_FOUND);
        }

        for (Cookie cookie : cookies) {
            if ("refreshToken".equals(cookie.getName())) {
                refreshToken = cookie.getValue();
            }
        }

        // 쿠키 목록에 refreshToken 이 없으면 요청 실패 에러
        if (refreshToken == null) {
            throw new CustomException(REFRESH_TOKEN_NOT_FOUND);
        }

        // DB에 refreshToken 이 있으면 refreshToken 삭제 후 로그아웃

        String email = userService.patchUserDeleteTokenByrefreshToken(refreshToken);
        if (email != null) {

            Cookie cookie = new Cookie("refreshToken", null);
            cookie.setMaxAge(0);
            cookie.setPath("/");

            response.addCookie(cookie);
            return ResponseEntity.status(200).body(responseService.getSuccessResponse(200, "refresh토큰 쿠키에서 제거 성공"));
        }

        // DB에 refreshToken 이 없으면 토큰 없음 에러
        else {
            throw new CustomException(INVALID_TOKEN);
        }
    }

    @PostMapping("/reissue")
    @ApiOperation(value = "access 토큰 재발급", notes = "access 토큰을 재발급한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "토큰 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "요청 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserLoginPostRes> reIssue(HttpServletRequest request) {
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            throw new CustomException(COOKIE_NOT_FOUND);
        }
        for (Cookie cookie : cookies) {
            if ("refreshToken".equals(cookie.getName())) {
                refreshToken = cookie.getValue();
            }
        }

        // 쿠키 목록에 refreshToken 이 없으면 요청 실패 에러
        if (refreshToken == null) {
            throw new CustomException(REFRESH_TOKEN_NOT_FOUND);
        }

        // DB에 refreshToken 이 있으면 토큰재발급
        String token = userService.getUserTokenByRefreshToken(refreshToken);

        if (token != null) {
            DecodedJWT decodedJWT = JwtTokenUtil.getVerifier()
                    .verify(refreshToken.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
            String email = decodedJWT.getSubject();
            return ResponseEntity.status(200)
                    .body(UserLoginPostRes.of(200, "Success", true, JwtTokenUtil.getAccessToken(email)));
        }
        // DB에 refreshToken 이 없으면 토큰 없음 에러
        else {
            throw new CustomException(INVALID_TOKEN);
        }
    }
}
