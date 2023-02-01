package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductsRegisterPostReq {
    private Long liveId;
    private Long sellerId;
    private String name;
    private int leftTopX;
    private int leftTopY;
    private int rightBottomX;
    private int rightBottomY;
}
