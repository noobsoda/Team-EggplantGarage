package com.ssafy.api.service;

import com.ssafy.api.request.UserDeleteReq;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;

import java.util.Optional;
//import com.ssafy.db.repository.UserRepositorySupport;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	private final Logger logger;
	public UserServiceImpl(Logger logger){
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
		user.setUserEmail(userRegisterInfo.getUserEmail());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setUserPassword(passwordEncoder.encode(userRegisterInfo.getUserPassword()));
		user.setUserName(userRegisterInfo.getUserName());
		user.setUserNickname(userRegisterInfo.getUserNickname());
		user.setUserPhone(userRegisterInfo.getUserPhone());
		user.setUserBank(userRegisterInfo.getUserBank());
		user.setUserAccount(userRegisterInfo.getUserAccount());

		return userRepository.save(user);
	}

	@Override
	public User getUserByUserEmail(String userEmail) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		//User user = userRepository.findByUserEmail(userEmail).get();
		Optional<User> user = userRepository.findByUserEmail(userEmail);
		if(user.isPresent()){
			return user.get();
		}else{
			return null;
		}

	}

	@Override
	public User getUserByUserNickname(String userNickname) {
		Optional<User> user = userRepository.findByUserNickname(userNickname);
		if(user.isPresent()){
			return user.get();
		}else{
			return null;
		}
	}

	@Override
	public boolean deleteUser(String userEmail, UserDeleteReq userDeleteReq) {

		//해당 유저의 비밀번호와 아이디가 일치하면 delete하고 true 아니라면 false

		User user = userRepository.findByUserEmail(userEmail).get();
		if(passwordEncoder.matches(userDeleteReq.getUserPassword(), user.getUserPassword())){
			//딜리트 하기전 해당 유저가 생성한 방 모두 삭제
			//해당 유저가 지닌 회의 이력을 모두 삭제
			//해당 유저가 찜한 목록을 삭제한다.
			//해당 유저의 묶음 구매 목록을 삭제한다.

			//해당 유저 정보를 삭제한다.
			userRepository.delete(user);
			return true;
		}
		else{
			return false;
		}

	}

}
