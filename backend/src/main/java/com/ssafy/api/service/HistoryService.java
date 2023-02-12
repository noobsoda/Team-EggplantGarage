package com.ssafy.api.service;

import com.ssafy.api.response.LiveHistoryRes;
import com.ssafy.api.response.ProductHistoryRes;
import java.util.List;

public interface HistoryService {
    List<LiveHistoryRes> getLiveHistoryBySellerId(long sellerId);

    List<ProductHistoryRes> getProductHistoryByBuyerId(long buyerId);

    List<ProductHistoryRes> getProductHistoryByLiveId(long liveId);
}
