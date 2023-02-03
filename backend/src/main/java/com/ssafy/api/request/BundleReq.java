package com.ssafy.api.request;

import lombok.Data;

import java.util.List;

@Data
public class BundleReq {
    private List<Long> productIdList;
    private Long buyerId;
    private int soldPrice;
}
