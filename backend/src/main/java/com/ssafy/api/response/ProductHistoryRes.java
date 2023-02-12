package com.ssafy.api.response;

import com.ssafy.db.entity.Product;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@ApiModel("ProductHistoryResponse")
public class ProductHistoryRes {
    @ApiModelProperty(name = "Product id")
    private long id;
    @ApiModelProperty(name = "Product name")
    private String productName;
    @ApiModelProperty(name = "Product soldPrice")
    private int soldPrice;
    @ApiModelProperty(name = "Product isPaid")
    private boolean isPaid;
    @ApiModelProperty(name = "Product leftTopX")
    private int leftTopX;
    @ApiModelProperty(name = "Product leftTopY")
    private int leftTopY;
    @ApiModelProperty(name = "Product rightBottomX")
    private int rightBottomX;
    @ApiModelProperty(name = "Product rightBottomY")
    private int rightBottomY;
    @ApiModelProperty(name = "Product imageUrl")
    private String imageUrl;
    @ApiModelProperty(name = "Other id")
    private long otherId;
    @ApiModelProperty(name = "Other name")
    private String otherName;
    @ApiModelProperty(name = "My review id")
    private long myReviewId;
    @ApiModelProperty(name = "Other review id")
    private long otherReviewId;
    @ApiModelProperty(name = "ChatRoom id")
    private long chatRoomId;

    public static ProductHistoryRes of(Product product, User user, long myReviewId, long otherReviewId, long chatRoomId)  {
        ProductHistoryRes res = ProductHistoryRes.builder()
                .id(product.getId())
                .productName(product.getName())
                .soldPrice(product.getSoldPrice())
                .isPaid(product.isPaid())
                .leftTopX(product.getLeftTopX())
                .leftTopY(product.getLeftTopY())
                .rightBottomX(product.getRightBottomX())
                .rightBottomY(product.getRightBottomY())
                .imageUrl(product.getImageUrl())
                .otherId(user.getId())
                .otherName(user.getName())
                .myReviewId(myReviewId)
                .otherReviewId(otherReviewId)
                .chatRoomId(chatRoomId)
                .build();
        return res;
    }
}
