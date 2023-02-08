package com.ssafy.api.service;

import com.ssafy.api.request.UserDeleteReq;
import com.ssafy.api.request.UserInfoPatchReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
    User createUser(UserRegisterPostReq userRegisterInfo);

    User getUserById(long id);

    User getUserByEmail(String email);

    User getUserByNickname(String nickname);

    boolean deleteUserByEmail(String email, UserDeleteReq userDeleteReq);

    boolean patchUserByEmail(String userEmail, UserInfoPatchReq userPatchReq);

    void patchUserTokenByrefreshToken(String userEmail, String refreshToken);

    String patchUserDeleteTokenByrefreshToken(String refreshToken);

    String getUserTokenByRefreshToken(String refreshToken);

    User getUserById(Long sellerId);
}
