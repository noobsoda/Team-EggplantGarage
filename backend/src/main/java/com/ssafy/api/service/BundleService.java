package com.ssafy.api.service;

import com.ssafy.api.request.BundleReq;
import com.ssafy.db.entity.Bundle;
import com.ssafy.db.entity.Product;

import java.util.List;

public interface BundleService {
    Long addBundle(BundleReq bundleReq);
    List<Product> getBundleItemsList(long bundleId);
    List<List<Product>> getSellerSuggestList(Long liveId);
    List<List<Product>> getBuyerSuggestList(long liveId, long buyerId);
    void approvalBundle(long bundleId);
    void refuseBundle(long bundleId);
}
