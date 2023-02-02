package com.ssafy.api.response;

import com.ssafy.db.entity.Product;
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
    @ApiModelProperty(name = "Product name")
    private String name;
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
    @ApiModelProperty(name = "Product imageUrl")
    private long reviewId;

    public static ProductHistoryRes of(Product product, long reviewId)  {
        ProductHistoryRes res = ProductHistoryRes.builder()
                .name(product.getName())
                .soldPrice(product.getSoldPrice())
                .isPaid(product.isPaid())
                .leftTopX(product.getLeftTopX())
                .leftTopY(product.getLeftTopY())
                .rightBottomX(product.getRightBottomX())
                .rightBottomY(product.getRightBottomY())
                .imageUrl(product.getImageUrl())
                .reviewId(reviewId)
                .build();
        return res;
    }
}
