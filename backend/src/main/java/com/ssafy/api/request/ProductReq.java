package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductReq {
    private Long liveId;
    private Long sellerId;
    private String name;
    private int initialPrice;
    private int leftTopX;
    private int leftTopY;
    private int rightBottomX;
    private int rightBottomY;
}
