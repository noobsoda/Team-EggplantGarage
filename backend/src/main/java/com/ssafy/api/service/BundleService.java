package com.ssafy.api.service;

import com.ssafy.api.request.BundleReq;
import com.ssafy.db.entity.Bundle;

import java.util.List;

public interface BundleService {
    Long addBundle(BundleReq bundleReq);
    List<Bundle> getSuggestList(Long liveId);
}
