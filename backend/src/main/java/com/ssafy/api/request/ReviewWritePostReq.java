package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ReviewCreatePostReq")
public class ReviewWritePostReq {
    @ApiModelProperty(name = "상품 ID", required = true, example = "1")
    long product_id;
    @ApiModelProperty(name = "내용", required = true, example = "리뷰 내용입니다.")
    String content;
    @ApiModelProperty(name = "별점", required = true, example = "4.5")
    double score;
    @ApiModelProperty(name = "판매자 유무", example = "false")
    boolean is_seller;
    @ApiModelProperty(name = "판매자에게만 공개 유무", example = "false")
    boolean is_visible;
}
