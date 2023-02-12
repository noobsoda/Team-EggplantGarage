package com.ssafy.api.service;

import com.ssafy.api.request.BundleReq;
import com.ssafy.api.response.BundledItemsProductRes;
import com.ssafy.db.entity.Product;

import java.util.List;

public interface BundleService {
    Long addBundle(BundleReq bundleReq);
    List<Product> getBundleItemsList(long bundleId);
    List<List<BundledItemsProductRes>> getSellerSuggestList(Long liveId);
    List<List<BundledItemsProductRes>> getApprovalNoPaidSuggestList(long liveId, long buyerId);
    List<List<BundledItemsProductRes>> getApprovalYesPaidSuggestList(long liveId, long buyerId);
    List<List<BundledItemsProductRes>> getRefuseSuggestList(long liveId, long buyerId);
    List<List<BundledItemsProductRes>> getBuyerSuggestList(long liveId, long buyerId);

    void approvalBundle(long bundleId);
    void refuseBundle(long bundleId);
    void cancelBundle(long bundleId);
}
