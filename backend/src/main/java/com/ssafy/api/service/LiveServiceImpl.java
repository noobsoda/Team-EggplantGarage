package com.ssafy.api.service;

import com.ssafy.db.entity.Live;
import com.ssafy.db.repository.LiveRepository;
import com.ssafy.db.repository.LiveRepositorySupport;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("liveService")
public class LiveServiceImpl implements LiveService{
    private final Logger logger;

    public LiveServiceImpl(Logger logger) {
        this.logger = logger;
    }

    @Autowired
    LiveRepository liveRepository;

    @Autowired
    LiveRepositorySupport liveRepositorySupport;

    @Override
    public List<Live> getHistoryBySellerId(long sellerId) {
        List<Live> liveList = liveRepositorySupport.findByLiveUserId(sellerId).get();
        return liveList;
    }
}
