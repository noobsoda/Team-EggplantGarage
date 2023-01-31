package com.ssafy.api.service;

import com.ssafy.db.entity.Live;

import java.util.List;

public interface LiveService {
    List<Live> getHistoryBySellerId(long sellerId);
}
