package com.ssafy.api.service;

import com.ssafy.api.request.LiveRegisterPostReq;
import com.ssafy.db.entity.Live;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.LiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("liveService")
public class LiveServiceImpl implements LiveService {

    private final LiveRepository liveRepository;

    @Autowired
    public LiveServiceImpl(LiveRepository liveRepository){
        this.liveRepository = liveRepository;
    }
    @Override
    public Live CreateLive(LiveRegisterPostReq liveRegisterInfo, User user, String thumbnailUrl) {
        Live live = new Live();
        live.setSession_id(liveRegisterInfo.getSession_id());
        live.setTitle(liveRegisterInfo.getTitle());
        live.setDescription(liveRegisterInfo.getDescription());
        live.setUrl(liveRegisterInfo.getUrl());
        live.setLive(liveRegisterInfo.isLive());
        live.setLocation(liveRegisterInfo.getLocation());
        live.setThumbnailUrl(thumbnailUrl);
        live.setUser(user);


        return liveRepository.save(live);
    }

    @Override
    public boolean getLiveByUrl(String url) {
        // 디비에 방송 url 정보 조회
        Optional<Live> live = liveRepository.findByUrl(url);
        if(live.isPresent()){
            return true;
        }
        return false;
    }
}
