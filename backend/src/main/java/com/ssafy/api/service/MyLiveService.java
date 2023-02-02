package com.ssafy.api.service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.dto.LiveDto;
import com.ssafy.api.dto.request.RequestLiveDto;
import com.ssafy.db.repository.MyUserRepository;
import com.ssafy.db.repository.*;
import com.ssafy.db.entity.*;
import org.springframework.data.domain.Pageable;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

//@Slf4j
@Service
//@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyLiveService {
    private final MyUserRepository userRepository;
    private final UserService userService;
    private final UserInfoRepository userInfoRepository;
    private final MyLiveRepository liveRepository;
    private final LiveRepositoryCustom liveRepositoryCustom;
    // simple querydsl
    private final JPAQueryFactory jpaQueryFactory;

    // Home 화면 Liveshow 검색
    public List<Lives> getLiveList(Pageable pageable){

        return liveRepositoryCustom.listByHomeLive(pageable);
    }

    public Lives getLive(Long liveId){

        Lives lives = liveRepository.findById(liveId).orElse(null);
        return lives;
    }


    @Transactional
    public LiveDto addLive(RequestLiveDto liveDto, Long userSeq) {

    }

    @Transactional
    public LiveDto updateLive(Long liveId, RequestLiveDto liveDto, Long userSeq) {
        User maker = userRepository.findByUserSeq(userSeq);
        liveRepository.deleteLives(liveId)
    }


}
