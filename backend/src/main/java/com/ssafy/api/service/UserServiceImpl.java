package com.ssafy.api.service;

import com.ssafy.api.request.UserDeleteReq;
import com.ssafy.api.request.UserInfoPatchReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
//import com.ssafy.db.repository.UserRepositorySupport;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    private final Logger logger;

    public UserServiceImpl(Logger logger) {
        this.logger = logger;
    }

    @Autowired
    UserRepository userRepository;

/*	@Autowired
	UserRepositorySupport userRepositorySupport;*/

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        User user = new User();
        user.setEmail(userRegisterInfo.getEmail());
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
        user.setName(userRegisterInfo.getName());
        user.setNickname(userRegisterInfo.getNickname());
        user.setPhoneNumber(userRegisterInfo.getPhoneNumber());
        user.setBankName(userRegisterInfo.getBankName());
        user.setBankAddress(userRegisterInfo.getBankAddress());

        return userRepository.save(user);
    }

    @Override
    public User getUserByEmail(String email) {
        // 디비에 유저 정보 조회 (userId 를 통한 조회).
        //User user = userRepository.findByUserEmail(userEmail).get();
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return user.get();
        } else {
            return null;
        }

    }

    @Override
    public User getUserByNickname(String nickname) {
        Optional<User> user = userRepository.findByNickname(nickname);
        if (user.isPresent()) {
            return user.get();
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteUserByEmail(String email, UserDeleteReq userDeleteReq) {

        //해당 유저의 비밀번호와 아이디가 일치하면 delete하고 true 아니라면 false

        Optional<User> Ouser = userRepository.findByEmail(email);
        if(!Ouser.isPresent())
            return false;

        User user = Ouser.get();
        if (passwordEncoder.matches(userDeleteReq.getPassword(), user.getPassword())) {
            //딜리트 하기전 해당 유저가 생성한 방 모두 삭제
            //해당 유저가 찜한 목록을 삭제한다.
            //해당 유저의 묶음 구매 목록을 삭제한다.
            user.setDelete(true);
            //해당 유저 정보를 삭제한다.
            userRepository.save(user);
            return true;
        } else {
            return false;
        }

    }

    @Transactional
    @Override
    public boolean patchUserByEmail(String userEmail, UserInfoPatchReq userInfoPatchReq) {
        Optional<User> oUser = userRepository.findByEmail(userEmail);
        if (oUser.isPresent()) {
            User user = oUser.get();
            if (StringUtils.isNotBlank(userInfoPatchReq.getPassword())) {
                user.setPassword(passwordEncoder.encode(userInfoPatchReq.getPassword()));
            }
            if (StringUtils.isNotBlank(userInfoPatchReq.getNickname())) {
                user.setNickname(userInfoPatchReq.getNickname());
            }
            if (StringUtils.isNotBlank(userInfoPatchReq.getPhoneNumber())) {
                user.setPhoneNumber(userInfoPatchReq.getPhoneNumber());
            }
            if (StringUtils.isNotBlank(userInfoPatchReq.getBankName())) {
                user.setBankName(userInfoPatchReq.getBankName());
            }
            if (StringUtils.isNotBlank(userInfoPatchReq.getBankAddress())) {
                user.setBankAddress(userInfoPatchReq.getBankAddress());
            }

            userRepository.save(user);

            return true;
        } else {
            return false;
        }
    }

    //refreshToken 저장
    @Override
    public void patchUserTokenByrefreshToken(String userEmail, String refreshToken) {
        Optional<User> oUser = userRepository.findByEmail(userEmail);
        User user = oUser.orElse(null);
        if(user == null)
            return;
        user.setRefreshToken(refreshToken);

        userRepository.save(user);


    }

    //refreshToken 제거
    @Override
    public String patchUserDeleteTokenByrefreshToken(String refreshToken) {
        Optional<User> oUser = userRepository.findByRefreshToken(refreshToken);
        User user = oUser.orElse(null);
        if(user == null)
            return null;
        user.setRefreshToken(null);
        userRepository.save(user);

        return user.getEmail();
    }

    @Override
    public String getUserTokenByRefreshToken(String refreshToken) {
        Optional<User> oUser = userRepository.findByRefreshToken(refreshToken);
        User user = oUser.orElse(null);
        if(user == null)
            return null;

        return user.getRefreshToken();
    }


}
