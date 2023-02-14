package com.ssafy.api.response;

import lombok.Data;

@Data
public class BundledItemsProductRes {
    private Long bundleId;
    private String name;
    private int soldPrice;
    private int initialPrice;
    private boolean isPaid;
    private int leftTopX;
    private int leftTopY;
    private int rightBottomX;
    private int rightBottomY;
    private String imageUrl;
    private Long buyerId;
    private String nickname;
    private int totalPrice;
    private boolean isApproval;

    public BundledItemsProductRes(Long bundleId, String name, int soldPrice, int initialPrice, boolean isPaid, int leftTopX, int leftTopY, int rightBottomX, int rightBottomY, String imageUrl, Long buyerId, String nickname, int totalPrice, boolean isApproval) {
        this.bundleId = bundleId;
        this.name = name;
        this.soldPrice = soldPrice;
        this.initialPrice = initialPrice;
        this.isPaid = isPaid;
        this.leftTopX = leftTopX;
        this.leftTopY = leftTopY;
        this.rightBottomX = rightBottomX;
        this.rightBottomY = rightBottomY;
        this.imageUrl = imageUrl;
        this.buyerId = buyerId;
        this.nickname = nickname;
        this.totalPrice = totalPrice;
        this.isApproval = isApproval;
    }
}
