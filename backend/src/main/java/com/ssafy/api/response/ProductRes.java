package com.ssafy.api.response;

import com.ssafy.db.entity.Product;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("ProductResponse")
public class ProductRes {
    @ApiModelProperty(name = "Product name")
    private String name;
    @ApiModelProperty(name = "Product soldAt")
    private LocalDateTime soldAt;
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

    public static ProductRes of(Product product)  {
        ProductRes res = new ProductRes();
        res.setName(product.getName());
        res.setSoldAt(product.getSoldAt());
        res.setSoldPrice(product.getSoldPrice());
        res.setPaid(product.isPaid());
        res.setLeftTopX(product.getLeftTopX());
        res.setLeftTopY(product.getLeftTopY());
        res.setRightBottomX(product.getRightBottomX());
        res.setRightBottomY(product.getRightBottomY());
        res.setImageUrl(product.getImageUrl());
        return res;
    }

    public static List<ProductRes> of(List<Product> reviewList)  {
        List<ProductRes> resList = new ArrayList<>();
        for (Product product: reviewList) {
            ProductRes res = new ProductRes();
            res.setName(product.getName());
            res.setSoldAt(product.getSoldAt());
            res.setSoldPrice(product.getSoldPrice());
            res.setPaid(product.isPaid());
            res.setLeftTopX(product.getLeftTopX());
            res.setLeftTopY(product.getLeftTopY());
            res.setRightBottomX(product.getRightBottomX());
            res.setRightBottomY(product.getRightBottomY());
            res.setImageUrl(product.getImageUrl());
            resList.add(res);
        }
        return resList;
    }
}
